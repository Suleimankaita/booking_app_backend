const asynchandler=require("express-async-handler");
const User=require("../model/user_reg")

const getsearch=asynchandler(async(req,res)=>{
    const {search,page} = req.query
    // if (search) {
      const find = await User.find().lean()
      const filtered=find.filter(
        (entity) =>
          entity.username.toLowerCase().includes(search));
        res.json(filtered);
    // }
    console.log(search)
})
module.exports=getsearch