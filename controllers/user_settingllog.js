const user_reg = require("../model/user_reg");
const User_set=require("../model/user_settings");
const asynchandler=require("express-async-handler");


const users_set=asynchandler(async(req,res)=>{
    const {body,id}=req.body

    const found=await User_set.findById({_id:id}).exec()

    // if(!found) return res.status(400).json({"message":'not found'});

    const result=await User_set.create({
        body:body
    })
    console.log(result)

    res.status(201).json("complete")

})

module.exports=users_set