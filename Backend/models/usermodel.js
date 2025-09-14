import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
    avatar: {
        type: String,
    },
    cartdata: {
        type: Object,
        default: {},
    },
    resetotp: {
        type: String
    },
    isotpverfy: {
        type: Boolean,
        default: false
    },
    otpexpires: {
        type: Date
    }
}, {minimize: false})

const User = mongoose.model("User",userSchema);

export default User