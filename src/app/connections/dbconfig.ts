import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = await mongoose.connection;
        connection.on
    } catch (err) {
        console.error(err);
    }
}