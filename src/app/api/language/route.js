import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const GET = async () => {
    try {
        const languages = await prisma.language.findMany();

        return NextResponse.json(languages, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const { languages } = await req.json();

        await prisma.language.createMany({
            data: languages,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
