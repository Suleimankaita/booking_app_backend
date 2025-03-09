const express=require("express");
const router= express.Router()
const {get,createUser,updateUser}=require("../controllers/registration")
// const use=require("../milldleware/regmilddlware")

router.route('/')
.patch(updateUser)
.post(createUser)

// router.route('/:id')
// .patch(updateUser)


module.exports=router