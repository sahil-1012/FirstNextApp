import { connect } from "@/connections/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ success: false, error: 'Check whether all the required parameters are sent' }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, error: 'User does not exist' }, { status: 404 });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
        }

        const token = jwt.sign({ userId: user._id, userName: user.userName, email: user.email }, TOKEN_SECRET!, { expiresIn: '2h' });

        delete user.password;

        const resp = NextResponse.json({ success: true, message: 'Login successful', token, user });
        const twoHoursInMilliseconds = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

        // Assuming `resp` is your response object
        resp.cookies.set("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + twoHoursInMilliseconds),
        });

        return resp;

    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
