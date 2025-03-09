const express=require("express");
const router= express.Router()
const {post}=require("../controllers/registration")

router.route('/')
.put(post)



module.exports=router