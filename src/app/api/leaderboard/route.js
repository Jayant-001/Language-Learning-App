import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const GET = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                progress: {
                    select: {
                        solvedPoints: true,
                    },
                },
            },
            orderBy: {
                progress: {
                    solvedPoints: "desc",
                },
            },
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
