import express from "express";
import passport from "passport";
import { getAdminStats, getAdminUsers, logout, myProfile } from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/googlelogin", passport.authenticate("google", { scope: ["profile"] }))


    process.env.NODE_ENV === "development" ?
    router.get("/login", passport.authenticate("google"), (req,res,next)=>{
        res.send("Logged In");
    })
    :
    router.get("/login", passport.authenticate("google", {
        successRedirect: process.env.FRONTEND_URL,
    }));


router.get("/me", isAuthenticated, myProfile)
router.get("/logout", logout)

router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers)
router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats)


export default router;