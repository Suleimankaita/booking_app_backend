const req = require("express/lib/request");
const User_reg=require("../model/user_reg");
const User_log=require("../model/user_settings");
const asynchandler=require("express-async-handler");
const Booking_list =require("../model/booking_list")
//getting all users from DB



const get=asynchandler(async(req,res)=>{
    const data=await User_reg.find().lean()
    // .select("-password")
    if(!data.length) return res.status(400).json({message:"empty users"});

    res.status(200).json(data)
    
});
const getimg=asynchandler(async(req,res)=>{
    const data=await User_log.find().lean()
    // .select("-password")
    if(!data.length) return res.status(400).json({message:"empty users"});

    res.status(200).json(data)
    
});
// const gettransaction=asynchandler(async(req,res)=>{
   
//     const Booking=await Booking_list.find()

    
//       console.log(mergedData);
    
//     // console.log(Booking)

//     // .select("-password")
//     if(!Booking.length) return res.status(400).json({message:"empty transation"});

//     res.status(200).json(data)
// const Booking=await Booking_list.find()

// const mergedData = Booking.map((blog) => {
//     // Find the author corresponding to this blog
//     const transactions = data.find((author) => author._id.equals(blog.transactionId));

//     // Merge the author data into the blog object
//     return {
//       ...blog.toObject(), // Convert Mongoose document to plain object
//       transactions, // Attach the author object
//     };
//   });

//   console.log(mergedData);
// });

//createUser all users from DB

const createUser=asynchandler(async(req,res)=>{
    const {firstname,amount,status,lastname,username,password,active,date,phone_no,roles,gender,transaction}=req.body;

    if(!firstname||!amount||!lastname||!password|| typeof active !=="boolean" ||!date ||!phone_no,Array.isArray(roles)){
        return res.status(400).json({message:"All field are required"});
    }
    const found=await User_reg.findOne({username}).collation({locale:"en",strength:2}).lean()
        if(found) return res.status(409).json({"message":`this ${username} username is already exist `})
            
            const lastUser = await User_reg.findOneAndUpdate(
                {}, // Match any document
                { $max: { userId: 1 } }, // Increment only if userId exists, otherwise start at 1
                { sort: { userId: -1 }, new: true } // Sort by userId in descending order
              );
          
              const nextUserId = lastUser ? lastUser.userId + 1 : 1;

         const allfiled={
        firstname,
        userId:nextUserId,
        lastname,
        password,
        active:true,
        date,
        phone_no,
        roles,
        username,
        gender,
        User:"user",
        transaction:{amount,status,date:new Date().toISOString().split("T")[0],time:new Date().toLocaleTimeString()}

    }

    console.log(transaction)
    
    const result=await User_reg.create(allfiled);
    // const booking=await Booking_list.create({transaction:{amount,status,time:new Date().toLocaleTimeString()},transactionId:result.id});

  



    console.log(result)
    // console.log(booking)

    res.status(201).json({'message':`$ all fields are completed`});

})

//updateUser all users from DB

const updateUser=asynchandler(async(req,res)=>{
    const {firstname,transaction,lastname,User,body,id,username,password,active,date,phone_no,roles,gender}=req.body;
    
    if(!firstname||!lastname || !username ||!password|| typeof active !=="boolean" ||!date ||!phone_no,Array.isArray(roles)){
        return res.status(400).json({message:"All field are required"});
    }
    console.log(id)
    const change=await User_reg.findById({_id:id}).exec()

    // if(found.username  ) return res.status(409).json({"message":`${username} is already exist`});
    // const image=req.file.filename
    console.log(active)
    // change.image=req.file.filename 
    // change.active=active
    // if(active){
    // }
    // change.lastname=lastname

    if(firstname){
        change.firstname=firstname
    }
    else if(lastname){
        change.lastname=lastname
    }
    else if(body){
        change.body=body
    }
    // else if(image){
    //     change.image=req.file.filename
    // }
    else if(password){
        change.password=password
    }
    else if(username){
        change.username=username
    }
    else if(phone_no){
        change.phone_no=phone_no
    }
    else if(date){
        change.date=date
    }
    else if(roles){
        change.roles=roles
        change.User=roles
    }
    else if(gender){
        change.gender=gender
    }
    else if(transaction){
        change.transaction=transaction
    }
    if(active||!active){
        change.active=active
    }
    const result =await change.save()
    console.log(result)
    res.status(201).json({"message":"updated"});

})

const updimg=asynchandler(async(req,res)=>{
    const {firstname,lastname,body,id,username,password,date,phone_no,roles,gender}=req.body;
    
    //  const {image}=req.file
    // console.log()
    if(!firstname||!lastname || !username ||!password|| typeof active !=="boolean" ||!date ||!phone_no,Array.isArray(roles)){
        return res.status(400).json({message:"All field are required"});
    }
    console.log(req.file)
    const change=await User_reg.findById({_id:req.params.id}).exec()
    // if(found.username  ) return res.status(409).json({"message":`${username} is already exist`});
    let image
    if(req.file){
        image=req.file.filename
    }
    // console.log(active)
    console.log(phone_no)
    // change.image=req.file.filename 
    // change.active=active
    // if(active){
    // }
    // change.lastname=lastname

    // if(firstname){
        change.firstname=firstname
    // }
    // else if(lastname){
        change.lastname=lastname
    // }
    // else if(body){
        change.body=body
    // }
     if(image){
        change.image=req.file.filename
    }
    // else if(password){
        change.password=password
    // }
    // else if(username){
        change.username=username
    // }
    // else if(phone_no){
        change.phone_no=phone_no
    // }
     if(date){
        change.date=date
    }
    else if(roles){
        change.roles=roles
    }
  
    // else if(gender){
        change.gender=gender
    // }
    const result =await change.save()
    console.log(result)
    res.status(201).json({"message":"updated"});
})

// delete user

    const deleteUser=asynchandler(async(req,res)=>{
        const {id}=req.body;
        
        const found=await User_reg.findByid({id}).exec()

        if(!found) return res.status(400).json({"message":`user not found`});

        const result= found.deleteOne()
        console.log(result);

        res.status(201).json({"message":`${result} deleted`})

    })

    const post =asynchandler(async(req,res)=>{
        const {amount,id}=req.body;
        
        // const found=await User_reg.findById({_id:id}).exec()

        //  if(!found)return res.status(400).json({message:"not found"})
        


        const result=await User_reg.findByIdAndUpdate(id,{"$push":{transaction:{amount,date:new Date().toISOString().split("T")[0],time:new Date().toLocaleTimeString()}}})

        await result.save()
            console.log(amount)
            console.log(result)

            res.status(201).json({message:"transaction added"})

    })

    const pop=async()=>{
        const posts = await User_log.find().populate('Users')
        console.log(posts)
    }

module.exports={get,createUser,updateUser,post,pop,getimg,updimg}