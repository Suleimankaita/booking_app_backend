const mongoose=require("mongoose")


const conectDb =()=>{
    mongoose.connect(process.env.DATA_URI)
}

module.exports=conectDb