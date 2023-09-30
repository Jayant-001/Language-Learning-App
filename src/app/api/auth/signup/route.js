import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "../../../../../prisma";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        // check if user exists
        const existUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existUser) {
            return NextResponse.json(
                { success: false, message: "Email already exists" },
                { status: 400 }
            );
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        return NextResponse.json(
            {
                success: true,
                user
            },
            { status: 201 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
