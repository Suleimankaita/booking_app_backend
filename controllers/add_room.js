const room=require('../model/room_status');
const asynchandler=require("express-async-handler")

const get_rooms=asynchandler(async(req,res)=>{
    const data=await room.find().lean()
    if(!data.length) return res.status(404).json({'message':"empty"})
        res.status(200).json(data)
})

const add_room=asynchandler(async(req,res)=>{
    const {room_price,room_name,available_room}=req.body;
    const {filename}=req.files
    console.log(room_price,available_room,room_name)

    if(!room_price||!available_room||!room_name||!req.files) return res.status(400).json({"message":"All input are required"});
    const image=req.files.map(img=>{
        return img.filename
    })
    console.log(image[0])
    const result=await room.create({
        rooms:[{
        available_room,
        room_price,
        room_image:image,
        room_name,
        single:image[0]
    }
        ]
    })
    console.log(result);
    res.status(201).json({"message":"congratulation new room is Added"})
})

// const edit_room=asynchandler(async(req,res)=>{
//     const {room_price,room_name,available_room}=req.body;
//     const {filename}=req.files
//     console.log(room_price,available_room,room_name)

//     if(!room_price||!available_room||!room_name||!req.files) return res.status(400).json({"message":"All input are required"});
//     const image=req.files.map(img=>{
//         return img.filename
//     })
//     console.log(req.params.id)
//     console.log(image)

//     const exist=await room.findOne({_id:req.params.id}).exec()

//     if(!exist) return res.json({'message':"room not found"})
//      await Promise.all(
//         await exist.rooms.map(async(ref)=>{ 
                
//             if(room_price){
//                 ref.room_price=room_price
//             }
//             else if(room_name){
//                 ref.room_name=room_name
//             }
//             else if(available_room){
//                 ref.available_room=available_room
//             }
//             else if(image){
//                 ref.room_image=image
//                 ref.single=image[0]
//             }
//             console.log(ref)
//              return await ref.save()
//         }))
//     res.status(201).json({'message':`${room_name} is edited`})
        

// })

const edit_room = asynchandler(async (req, res) => {
    const { room_price, room_name, available_room,img } = req.body;
    const files = req.files;
    let all
    const imgss=  img
    ? img.split(',').map((img) => {
        console.log(img)
        return img.trim()})
    : [];
    console.log(files)
    console.log("images " +imgss)
    if(files){
    all=files
    }
    else if(!files && imgss.length){
        all=imgss
    }

    console.log("Inputs:", room_price, available_room, room_name);

    if (!room_price || !available_room || !room_name ) {
        return res.status(400).json({ message: "All inputs are required" });
    }
    const image = files.map((img) => {
        return  img.filename

    });
    console.log("Room ID:", req.params.id);
    console.log("Uploaded Images:", image);

    const exist = await room.findOne({ _id: req.params.id }).exec();
    if (!exist) {
        return res.status(404).json({ message: "Room not found" });
    }

    exist.rooms.forEach((ref) => {
        if (room_price) ref.room_price = room_price;
        if (room_name) ref.room_name = room_name;
        if (available_room) ref.available_room = available_room;
        if (imgss||image) {
            if(!imgss&&image.length){
            ref.single = image[0]; 
            ref.room_image = image;

            }else if(imgss&&!image.length){
                ref.single = imgss[0]; 
                ref.room_image = imgss;
    
            }else if(imgss&&image){
                ref.single = image[0]; 
                ref.room_image = image;
            }
        }
    });

    await exist.save();

    res.status(201).json({ message: `${room_name} is edited` });
});

const deletes=asynchandler(async(req,res)=>{
    const {id}=req.params
    console.log(id)
    if(!id)return res.status(404).json({'message':`Room Id is not define`})
        const deleteId=await room.findByIdAndDelete({_id:id}).exec()

    console.log(deleteId)
    res.status(201).json({"message":"the product is deleted"})
})



module.exports={add_room,get_rooms,edit_room,deletes}