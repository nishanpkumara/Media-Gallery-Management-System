import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/User.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in our DB
      let user = await User.findOne({ email: profile.emails[0].value });
      
      if (!user) {
        // Create new user if they don't exist
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: 'google-auth-placeholder', // Not used for OAuth
          isActive: true, // Google verified users can be active immediately
          role: 'user'
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));