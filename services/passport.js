const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(           // Passport sets up Google OAuth Strategy for easy sign-up and login
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
        async (accessToken, refreshToken, profile, done) => {

            const existingUser = await User.findOne({ googleId: profile.id }) // Mongo DB looks for returning user
            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({ googleId: profile.id }).save() // Mongo DB creates a new user 
            done(null, user)
        }
    )
);