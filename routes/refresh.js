const express=require("express");
const router=express();
const refresh=require("../controllers/refresh")


router.route("/")
.get(refresh)


module.exports=router