import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


export const auth = async(req: NextRequest) => {
    try {
        const token = req.cookies.get('token')?.value || '';
        const decodedToken: any = await jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.userId

    } catch (err: any) {
        throw new Error(err.message);
    }
}