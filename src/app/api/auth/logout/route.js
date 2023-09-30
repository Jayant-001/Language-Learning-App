import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json(
            { success: true, message: "Logout successful" },
            { status: 200 }
        );

        response.cookies.set("token", "", {
            expires: new Date(0),
            httpOnly: true,
        });

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
