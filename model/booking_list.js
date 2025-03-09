const mongoose=require("mongoose");

const booking_list=new mongoose.Schema({
    
    transactionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"registration",
        required:true,
        
    },
    transaction:[{
        amount:{
            type:Number,
            require:true
        },
        status:{
            type:String,
            require:true

        },
    }],
    

        },
        {timestamps:true}
    );
    
    module.exports=mongoose.model("Booking_list",booking_list)