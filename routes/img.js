const multer=require('multer')
const path =require('path')
const express=require("express");
const {get,createUser,updateUser,updimg}=require("../controllers/registration")
const router= express.Router()

// const storage =multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(new Error(),path.join(__dirname, '..' ,'public/images'))
//     },
//     filename:(req,file,cb)=>{
//         cb(new Error(),file.fieldname+new Date().now()+path.extname(file.originalname) )
        
//     }
// })
// const upload=multer({storage:storage})

router.route('/')
.patch(updimg)

module.exports=router