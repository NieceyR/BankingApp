require('dotenv').config();
var express = require("express");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const dal = require("./dal");


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env["GOOGLE_CLIENT_ID"],
            clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
            callbackURL: "/oauth2/redirect/google",
            scope: ["profile, email"],
            state: true,
        },
        function (accessToken, refreshToken, profile, cb) {
            const {email, name} = profile.json;

            dal
            .findOne(email)
            .then((user) => {
                if(user) return cb(null, user);

                dal
                .create(name, email)
                .then((user) => {
                    cb("error creating user");
                })
                .catch((err) => {
                    cb(err);
                }) ;
            })
            .catch((err) => {
                cb(err);
            });
        }
    )
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {id: user.id, username: user.username, name: user.name})
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

const router = express.Router();

router.get("login/google", passport.authenticate("google"));

router.get(
    "/oauth2/redirect/google",
    passport.authenticate("google", {
        failureRedirect: "/login",
    }),
    (req, res) => {
        console.log("requ=>>", req.user);
        res.redirect(`/?name=${req.user.name}&email=${req.user.email}`);
    }
);

router.post("/logout", function (req, res, next) {
    req.logout();
    res.redirect("/");
});

module.exports = router;