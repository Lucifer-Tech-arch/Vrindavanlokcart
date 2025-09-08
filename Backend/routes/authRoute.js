import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

const router = express.Router();

//Step-1 Redirects to Google Login

router.get('/google',passport.authenticate("google",{scope:["profile", "email"]}))

router.get("/google/callbak",
    passport.authenticate("google",{session:false}),
    (req,res) => {
        try {
           const token = jwt.sign({id:req.user._id, email: req.user.email}, process.env.JWT_SECRET, {expiresIn: '7d'})
           
           res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
        } catch (error) {
            console.error("Google Login error: ",error);
            res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
        }
    }
)