const mongoose=require("mongoose")

const Room_status=new mongoose.Schema({
    
   rooms:[{
    room_price:{
      type:Number,
      required:true
    },
    single:String,
    available_room:{
      type:Number,
      required:true
   },
   room_name:{
      type:String,
      required:true
   },
    room_image:{
      type:[String],
      required:true
   },
   }]

})

module.exports=mongoose.model("Room_status",Room_status) 