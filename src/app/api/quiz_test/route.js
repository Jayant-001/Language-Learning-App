import { extractToken } from "@/utils/extractToken";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const GET = async (req) => {
    try {
        // get user info from request token
        const user = await extractToken(req);

        // if can't get user, Send unauthorized
        if (!user) {
            return NextResponse.json({ success: false }, { status: 401 });
        }

        // extract query parameters language and topic from URL
        const { searchParams } = new URL(req.url);
        const language = searchParams.get("language");
        const topic = searchParams.get("topic");

        // find all soved questions by the user
        const solvedQuestions = await prisma.solvedQuestion.findMany({
            where: {
                userEmail: user.email,
            },
        });

        // extract solved question IDs
        const solvedQuestionIDs = solvedQuestions.map((q) => q.questionID);

        // find questions from database
        const questions = await prisma.question.findMany({
            where: {
                languageSlug: language,
                topicSlug: topic,
                id: {
                    notIn: solvedQuestionIDs, // avoid already solved questions
                },
            },
            take: 3, // send only 3 questions at a time
            orderBy: {
                difficulty: "asc", // sort questions in accending order by difficulty level
            },
        });

        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const user = await extractToken(req);

        // if can't get user, Send unauthorized
        if (!user) {
            return NextResponse.json(
                { message: "Invalid user" },
                { status: 401 }
            );
        }

        const { markedQuestions } = await req.json();

        let questionPoint = 0,
            usersPoint = 0;

        // calculate total questions points and user's points of solved questions
        markedQuestions.map((q) => {
            if (q.solved) usersPoint += parseInt(q.difficulty);
            questionPoint += parseInt(q.difficulty);
        });

        // Update users previous progress
        const usersProgress = await prisma.progress.upsert({
            where: {
                userEmail: user.email,
            },
            update: {
                solvedPoints: {
                    increment: usersPoint,
                },
                attemptedPoints: {
                    increment: questionPoint,
                },
            },
            create: {
                userEmail: user.email,
                solvedPoints: usersPoint,
                attemptedPoints: questionPoint,
            },
        });

        // filter successfully solved question
        const solvedQuestions = markedQuestions
            .filter((q) => q.solved === true)
            .map((q) => {
                const question = {
                    name: q.name,
                    topic: q.topicSlug,
                    language: q.languageSlug,
                    difficulty: q.difficulty,
                    userEmail: user.email,
                    questionID: q.id,
                };
                return question;
            });

        if (solvedQuestions.length > 0) {
            await prisma.solvedQuestion.createMany({
                data: solvedQuestions,
            });
        }

        // create a report object
        const testReport = {
            totalQuestions: markedQuestions.length, // total number of questions
            solvedQuestions: solvedQuestions.length, // total solved questions
            totalPoints: questionPoint,
            earnedPoints: usersPoint,
            accurracy: (usersPoint / questionPoint) * 100,
        };

        return NextResponse.json(testReport, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
