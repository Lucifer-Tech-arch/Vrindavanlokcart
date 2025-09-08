import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Step-1: Redirects user to Google login
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step-2: Google callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req, res) => {
        try {
            if (!req.user) {
                return res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
            }

            // Create JWT
            const token = jwt.sign(
                { id: req.user._id, email: req.user.email, picture: req.user.avatar },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            // Redirect frontend with token
            res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
        } catch (error) {
            console.error("Google Login error:", error);
            res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
        }
    }
);

export default router;
