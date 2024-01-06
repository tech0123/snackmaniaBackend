import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/User.js";

export const connectPassport = () => {

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: "http://localhost:4000/api/v1/login",
    }, async function (accessToken, refreshToken, profile, done) {

        const user = await User.findOne({
            googleId: profile.id,
        })

        if (!user) {

            const newUser = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                photo: profile.photos[0].value,
            })
            return done(null, newUser);

        }
        else {
            return done(null, user);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    })


}