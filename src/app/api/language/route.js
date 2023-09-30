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
