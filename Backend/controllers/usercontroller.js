import User from "../models/usermodel.js";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendotpmail } from "../utils/mail.js";
import { use } from "react";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

//Login route
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User dosn't exists" });
        }
        const isMatch = bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Register route
const registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        //checking if user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        //Validating email formet and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minSymbols: 1 })) {
            return res.status(400).json({ success: false, message: "Password must be strong (8+ chars, number, symbol)" });
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedpassword
        })
        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

//logout route

export const logoutUser = async (req, res) => {
    try {
        // For JWT, just tell frontend to delete token
        req.logout?.(); // clears passport session if used
        res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//adminLogin route
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Email not found!" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetotp = otp;
        user.otpexpires = Date.now() + 5 * 60 * 1000; // 5 minutes
        user.isotpverfy = false;

        await user.save();
        await sendotpmail(email, otp);

        return res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Verify OTP
const verifyotp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.resetotp !== otp || user.otpexpires < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        user.isotpverfy = true;
        user.otpexpires = undefined;
        user.resetotp = undefined;

        await user.save();
        return res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `OTP verification error: ${error.message}` });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { email, newpassword } = req.body;

        const user = await User.findOne({ email });
        if (!user || !user.isotpverfy) {
            return res.status(400).json({ success: false, message: "OTP verification required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(newpassword, salt);

        user.password = hashedpassword;
        user.isotpverfy = false;

        await user.save();
        return res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
export { loginUser, registerUser, adminLogin, sendotp, verifyotp, resetPassword }