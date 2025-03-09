const { options } = require("../routes/root");

const list=['http://localhost:3500','http://localhost:3000','https://booking-app-frotent.onrender.com'];

const option={
    origin:(origin,callback)=>{
        if(list.includes(origin)||!origin){
            callback(null,true)
        }else{
            callback(new Error("bloked by cors"))

        }
    },
    credentials: true, 

};

module.exports=option