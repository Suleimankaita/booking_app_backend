const User=require("../model/user_reg")
const jwt= require("jsonwebtoken")
const asynchandler=require("express-async-handler");


const login=asynchandler(async(req,res)=>{
    const {username,password,active}=req.body;
    
    if(!username||!password) return res.status(400).json({message:"all fields are required"})

        const found=await User.findOne({username}).lean().exec()

        if(!found) return res.status(401).json({"message":`${username} not found`}) 

            if(!found.active) return res.status(400).json({"message":`your account has suspendend ${username}`})
         const match=password===found.password;
         
         if(match){

            console.log(found._id)
            const accesstoken=jwt.sign(
                {
                    "UserInfo":{
                        "id":found._id,
                        "username":found.username,
                        "roles":found.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"10m"}
            );
            const refreshtoken=jwt.sign(
                
                    {
                        "id":found._id,
                        "username":found.username,
                        "roles":found.roles
                    },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:"7d"}
            );

            res.cookie("jwt",refreshtoken,{
                httpOnly:true,
                sameSite:"none",
                secure:true,
                maxAge:7*24*60*60*1000
             })
             console.log(found)
             res.status(201).json({accesstoken})
            }
            else{
            return res.status(400).json({"message":`password does not match`})

            }    

});


module.exports=login