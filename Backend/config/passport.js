import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import passport from 'passport';
import User from '../models/usermodel.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, cb) => {
    try {
       let user = await User.findOneAndUpdate({ googleId: profile.id },);
       if(!user) {
        user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email:profile.email[0].value,
            avatar: profile.photos[0].value
        })
       }
       return done(null, user);
    } catch (error) {
        return done(error,null);
    }
    
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;