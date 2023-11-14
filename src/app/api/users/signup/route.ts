import { connect } from "@/connections/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userName, email, password } = body;
        if (!userName || !email || !password) {
            return NextResponse.json({ success: false, error: 'Check whether all the required parameters are send' }, { status: 400 });
        }

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ success: false, error: 'User Already Exist' }, { status: 409 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            userName, email, password: hashedPassword,
        })
        const savedUser = await newUser.save();
        delete savedUser.password;
        return NextResponse.json({ success: true, message: 'Created User successfully', user: savedUser });

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
