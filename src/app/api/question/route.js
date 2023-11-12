import { extractToken } from "@/utils/extractToken";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const language = searchParams.get("language");
        const topic = searchParams.get("topic");
        const page = Number(searchParams.get("page"));
        const limit = Number(searchParams.get("limit"));

        const skip = (page - 1) * limit;
        const take = limit;
        const offset = skip + take;

        // include language, topic if language, topic are present in the URL
        const query = {
            ...(language && { languageSlug: language }),
            ...(topic && { topicSlug: topic }),
        };

        // find all questions with language and topic
        const questions = await prisma.question.findMany({
            where: query,
            take,
            skip,
        });

        // const allQuestions = await prisma.question.findMany({
        //     where: query,
        // });

        const totalQuestions = await prisma.question.count({
            where: query,
        });

        const hasNext = totalQuestions > offset;

        // console.log("next = ", hasNext);

        return NextResponse.json({questions, hasNext}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        // get user data
        const user = await extractToken(req);

        // if can't get user, Send unauthorized
        if (!user) {
            return NextResponse.json(
                { message: "Invalid user" },
                { status: 401 }
            );
        }

        let {
            name,
            options,
            correctOption,
            difficulty,
            language,
            topic,
            explanation,
        } = await req.json();
        const now = Date.now();
        name = name.trim();

        const slug = name.trim().toLowerCase().replaceAll(" ", "-") + "-" + now;
        const question = await prisma.question.create({
            data: {
                name,
                slug,
                options,
                correctOption: parseInt(correctOption),
                difficulty: parseInt(difficulty),
                languageSlug: language,
                topicSlug: topic,
                userEmail: user.email,
                explanation: explanation.trim(),
            },
        });

        return NextResponse.json(question, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
