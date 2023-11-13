import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: [true, 'Provide a Unique User Name'] },
    email: { type: String, required: true, unique: [true, 'Provide a Unique Email ID'] },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})


// ~ HERE THE DATA CONNECTION IS CONNECTED EACH TIME WE REQUIRE..
const User = mongoose.model.users || mongoose.model('users', userSchema);

export default User;