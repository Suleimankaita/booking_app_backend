const express=require("express");
const router= express.Router()
const {get,createUser,updateUser,updimg}=require("../controllers/registration")


router.route('/:id')
.patch(updimg)


module.exports=router