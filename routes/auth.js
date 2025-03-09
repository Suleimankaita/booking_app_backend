const express=require("express");
const router=express();
const login=require("../controllers/login")
const logout=require("../controllers/logout")
const loglimiter=require("../config/loglimiter")
router.route("/")
.post(loglimiter,login)

router.route("/logout")
.post(logout)


module.exports=router