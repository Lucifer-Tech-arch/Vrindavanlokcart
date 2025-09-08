import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport';
import User from '../models/usermodel.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
},
  async (accessToken, refreshToken, profile, cb) => {
    console.log(profile)
    try {
      let user = await User.findOne({ googleId: profile.id },);
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value
        })
      }
      if (user.avatar !== profile.photos[0].value) {
        user.avatar = profile.photos[0].value;
        await user.save();
      }
      return cb(null, user);
    } catch (error) {
      return cb(error, null);
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