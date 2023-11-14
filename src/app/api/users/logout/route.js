import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json({
            success: true,
            message: 'Logout successfully'
        })

        response.cookies.delete("token");
        return response;
    } catch (err) {
        console.log(err.message);
        NextResponse.json({ error: err.message, status: 500 });
    }
}