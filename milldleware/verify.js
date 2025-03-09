const asynchandler=require("express-async-handler");
const jwt=require("jsonwebtoken")

const verify=asynchandler(async(req,res,next)=>{
    
    const auth=req.headers.authorization||req.headers.Authorization

    if(!auth?.startsWith("Bearer "))return res.sendStatus(403)

    const token=auth.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        asynchandler(async(err,decode)=>{
            if(err) return res.sendStatus(403);
            req.username=decode.UserInfo.username
            req.roles=decode.UserInfo.roles
            req.id=decode.UserInfo.id
            next()
        })   
    )

})

module.exports=verify