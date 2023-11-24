import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

// `${process.env.NEXT_PUBLIC_SERVER_URL}/api/topics?language=${language}`
export const GET = async (req) => {
    try {
        // extract language from URL query parameters
        const { searchParams } = new URL(req.url);
        const language = searchParams.get("language");

        // console.log(language)
        const topics = await prisma.topic.findMany({
            where: {
                languageSlug: language,
            },
        });

        // const topics = []

        return NextResponse.json(topics, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const { name, language, slug } = await req.json();

        await prisma.topic.create({
            data: {
                name,
                languageSlug: language,
                slug,
            },
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
