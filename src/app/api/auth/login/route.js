import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // get user with requested email from database
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // if user not exists with the email return
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Email not found" },
                { status: 400 }
            );
        }

        // check valid password or not
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { success: false, message: "Wrong password" },
                { status: 400 }
            );
        }

        // create JWT token
        const tokenData = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        // set token expiry 1 day
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // create a response object
        const response = NextResponse.json({
            success: true,
            message: "Login successfully",
            user,
        });

        // add token to response object
        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
