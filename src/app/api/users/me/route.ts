import { connect } from "@/connections/dbconfig"
import { auth } from "@/helper/auth"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
connect()

export async function GET(request: NextRequest) {
    try {

        const userId = await auth(request);
        console.log(userId);
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({ success: true, user })

    } catch (err: any) {
        console.log(err.message);
    }
}