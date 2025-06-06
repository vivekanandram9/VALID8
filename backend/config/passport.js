import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcryptjs";

import UserModel from "../model/user.js";

import dotenv from "dotenv";
dotenv.config();


const configurePassport = (passport) => {
    //Local strategy (Login)
    passport.use(
        new LocalStrategy({usernameField: "email"}, async (email , password , done) => {
            try {
                const user = await UserModel.findOne({ email });

                if(!user) return done(null, false, { message: "user not found"});

                const isMatch = await bcrypt.compare(password, user.password);

                if(!isMatch) return done(null, false, { message : " Incorrect password"});

                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        })
    );

    // JWT strategy (Authentication)

    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,


    };

    passport.use(
        new JwtStrategy(opts, async (jwtPayload, done) => {
            try {
                const user = await UserModel.findById(jwtPayload.id);
                if(!user) return done(null, false);

                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        })
    );

};

export default configurePassport;