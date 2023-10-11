import { extractToken } from "@/utils/extractToken";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const DELETE = async (req) => {
    try {
        // get user info from request token
        const user = await extractToken(req);

        // if user is null => send invalid request
        if (!user || user == null) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // delete all entry from progress table
        await prisma.progress.deleteMany({
            where: {
                userEmail: user.email,
            },
        });

        // delete user's solved questions
        await prisma.solvedQuestion.deleteMany({
            where: {
                userEmail: user.email,
            },
        });

        // send success response
        return NextResponse.json(
            { message: "Progress reset" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
