import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const GET = async (req) => {
    try {
        // extract language from URL query parameters
        const { searchParams } = new URL(req.url);
        const language = searchParams.get("language");

        const topics = await prisma.topic.findMany({
            where: {
                languageSlug: language,
            },
        });

        return NextResponse.json(topics, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const { topic } = await req.json();

        await prisma.topic.create({
            data: {
                name: topic,
            },
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
