const mongoose=require("mongoose");

const user_reg=new mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },

    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone_no:{
      type:String,
      require:true
    },
    roles:{
        type:[String],
        default:["User"]
    },
    active:{
        type:Boolean,
        default:true
      },
    date:{
      type:Date,
      require:true
    },
    gender:{
      type:String,
      require:true
    },
    image:{
      type:String,
    
    },
    User:{
      type:String
    },
    employee:String,
    userId: {
      type: Number,
      required: true,
      default: 0, 
    },
    transaction:[{
      amount:Number,
      date:String,
      time:String
    }],
    
   
},

{
    timestamps:true
}
)

  module.exports=mongoose.model("registration",user_reg)