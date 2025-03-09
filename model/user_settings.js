const mongoose=require("mongoose");

const user_setting=new mongoose.Schema({
    //  users:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"registration",
    //  },
    body:String,
    image:String,
    originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number, required: true },
  mp3:String,
  uploadDate: { type: Date, default: Date.now },
}
)
module.exports=mongoose.model("setting",user_setting)