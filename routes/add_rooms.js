const express=require("express");
const router=express.Router();
const {add_room,get_rooms,edit_room,deletes} =require("../controllers/add_room")

router.route('/')
.get(get_rooms)
.post(add_room)
router.route('/:id')
.put(edit_room)
.delete(deletes)

module.exports=router