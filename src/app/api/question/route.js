import { extractToken } from "@/utils/extractToken";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const language = searchParams.get("language");
        const topic = searchParams.get("topic");

        const query = {
            ...(language && { languageSlug: language }),
            ...(topic && { topicSlug: topic }),
        };

        const questions = await prisma.question.findMany({
            where: query,
        });

        // console.log(questions)

        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const user = await extractToken(req);

        let { name, options, correctOption, difficulty, language, topic, explanation } =
            await req.json();
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
                explanation: explanation.trim()
            },
        });

        // console.log(name, options, correctOption, difficulty, language, topic);

        return NextResponse.json(question, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
