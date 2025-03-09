const express=require("express");
const router= express.Router()
const {get,createUser,updateUser}=require("../controllers/registration")

const verify=require("../milldleware/verify")

router.use(verify)

router.route('/')
.get(get)

module.exports=router