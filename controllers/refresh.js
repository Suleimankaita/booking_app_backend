const User=require("../model/user_reg");
const jwt=require("jsonwebtoken");
const asynchandler=require("express-async-handler");


    const refresh=asynchandler(async(req,res)=>{
        const cookies=req.cookies;
        console.log(cookies.jwt)
        if(!cookies?.jwt) return res.status(401).json({"message":"unothorizeds"});
        const refreshtoken=cookies.jwt;
        jwt.verify(
            refreshtoken,
            process.env.REFRESH_TOKEN_SECRET,
            asynchandler(async(err,decode)=>{
                if(err) {
                    console.log(err)

                    return res.status(401).json({"message":"unothorized"})
                }
                const username=decode.username
                    const found=await User.findOne({username}).exec()

                if(!found.active) return res.status(401).json({"message":"your account is suspended"});
                
                if(!found) return res.status(403).json({"message":"unothorized"});
                
                const accesstoken=jwt.sign(
                    {
                        "UserInfo":{
                            "id":decode.id,
                            "username":decode.username,
                            "roles":decode.roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:"10m"}
                )
                res.status(200).json({accesstoken})
            
            })

        )
    })

    module.exports=refresh