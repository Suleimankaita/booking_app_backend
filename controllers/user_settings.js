const asynchandler=require("express-async-handler");
const User_setting=require("../model/user_settings")
const User=require("../model/user_reg")
const settings=asynchandler(async(req,res)=>{
    
    const {_id,body,amount,}=req.body

    if(!amount) return res.status(400).json({"message":"all are required"});

    

    // const found =await User_setting.findByIdAndUpdate(_id,{
    //     '$push':{
    //         transaction:[{amount}]
    //     }
    // })

    const User=await User_setting.create(
        {
            body,
            transaction:[{amount}]
           
        }
    ) 
    console.log(User)

    res.status(201).json("added")


})
module.exports=settings