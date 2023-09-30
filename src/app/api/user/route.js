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

        const usersProgress = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
            select: {
                name: true,
                email: true,
                isAdmin: true,
                progress: true,
                solvedQuestions: true,
            },
        });

        return NextResponse.json(usersProgress, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
