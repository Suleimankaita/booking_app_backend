const express=require("express")
const router=express.Router()
const setting=require("../controllers/user_settings")

router.route('/')
.post(setting)

module.exports=router