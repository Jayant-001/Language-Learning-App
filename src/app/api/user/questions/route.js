import { extractToken } from "@/utils/extractToken";
import prisma from "../../../../../prisma";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const user = await extractToken(req);

        const questions = await prisma.question.findMany({
            userEmail: user.email,
        });

        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
