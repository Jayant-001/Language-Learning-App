import { extractToken } from "@/utils/extractToken";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const GET = async (req) => {
    try {
        const user = await extractToken(req);

        // if can't get user, Send unauthorized
        if (!user) {
            return NextResponse.json({ success: false }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const language = searchParams.get("language");
        const topic = searchParams.get("topic");

        // console.log("data", language, topic, user);
        const usersProgress = await prisma.progress.findUnique({
            where: {
                userEmail: user.email,
            },
        });

        // find all soved questions by the user
        const solvedQuestions = await prisma.solvedQuestion.findMany({
            where: {
                userEmail: user.email,
            },
        });

        const solvedQuestionIDs = solvedQuestions.map((q) => q.questionID);

        const questions = await prisma.question.findMany({
            where: {
                languageSlug: language,
                topicSlug: topic,
                id: {
                    notIn: solvedQuestionIDs, // avoid already solved questions
                },
            },
            take: 3,
            orderBy: {
                difficulty: "asc",
            },
        });

        const question = questions.length > 0 ? questions[0] : {};

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
            return NextResponse.json({ success: false }, { status: 401 });
        }

        const { markedQuestions } = await req.json();

        let questionPoint = 0,
            usersPoint = 0;
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
            totalQuestions: markedQuestions.length,
            solvedQuestions: solvedQuestions.length,
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
