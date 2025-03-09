const User=require("../model/user_reg");
const jwt=require("jsonwebtoken");
const asynchandler=require("express-async-handler");

const logout=asynchandler(async(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
     return res.status(400).json({"message":"logout is not successful"});
    }
    console.log(cookies)

    res.clearCookie("jwt",{
        httpOnly:true,
        sameSite:"none",
        secure:true,
    })
     res.status(204).json({"message":"logout successful"});

})

module.exports=logout