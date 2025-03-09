// require("dotenv").config()
// const expreess=require("express")
// const app =expreess()
// const mongosse=require("mongoose")
// const Port=process.env.PORT||3500;
// const cors =require("cors")
// const path=require("path");
// const cookieParser = require("cookie-parser");
// const options=require("./config/config")
// const conectDb=require("./config/connectDB")
// const {pop}=require("./controllers/registration")
// const multer=require('multer')
// const img=require('./model/user_settings')
// const {Server}=require("socket.io")
// const user=require("./model/user_reg")

//     conectDb()

//     const storage = multer.diskStorage({
//         destination: (req, file, cb)=> {
//           cb(null, path.join(__dirname,'public/images')); 
//         },
//         filename:  (req, file, cb)=> {
//           cb(null, Date.now() + path.extname(file.originalname)); 
//         },
//       });
  
//     const upload=multer({storage:storage})
   

// app.use(cors(options))

// app.use(expreess.json())

// app.use(expreess.urlencoded({extended:false}))

// app.use(cookieParser())

// app.use(expreess.static(path.join(__dirname, "public")))

// app.use("/",require('./routes/root'))

// app.use("/regs",require('./routes/regs'))

// app.use("/auth",require('./routes/auth'))

// app.use("/get",require('./routes/get'))

// app.use("/user_set",require('./routes/user_set'))

// app.use("/patch",upload.single("file"),require('./routes/patch'))

// app.use("/refresh",require('./routes/refresh'))


// app.use("/img",require('./routes/img'))

// app.use("/settings",require('./routes/user_settings'))

// app.use("/search",require('./routes/search'))

// app.use("/img" ,require('./routes/img'))

// app.use("/add_room",upload.array('file') ,require('./routes/add_rooms'))

// app.use("/add_room" ,require('./routes/add_rooms'))

    
// // app.patch('/add/:id', upload.single('file'), (req, res) => {
// //   const { id } = req.params;
// //   const { firstname, lastname, username } = req.body;
// //   const file = req.file;
// //   console.log(id,file)

// //   // Example: Simulate updating user data in a database
// //   // const updatedData = {
// //   //     id,
// //   //     firstname,
// //   //     lastname,
// //   //     username,
// //   //     image: file ? file.filename : undefined, // Use the uploaded file if available
// //   // };

// //   // // Simulate saving updated data
// //   // console.log('Updated Data:', updatedData);

// //   // // Respond with success
// //   // res.status(200).json({
// //   //     message: 'User updated successfully',
// //   //     data: updatedData,
// //   // });
// // });
    





// // app.all("*",(req,res)=>{
// //     res.status(400)
// //     if(req.accepts(".html")){
// //     res.sendFile(path.join(__dirname,"views" ,"404.html"))

// //     }else if(req.accepts(".json")){
// //     res.sendFile(path.join(__dirname,"views" ,"404.html"))

// //     }
// // })

// const serve=app.listen(Port,()=>console.log("running on " +Port ))



// const io=new Server(serve,{
//   cors:{origin:"http://localhost:3000"}
// })


// mongosse.connection.once("open",()=>{
  
// io.on("connection",async(socket)=>{
//     const data=await user.find().lean()
// app.use("/update",require('./routes/update'))

//     setInterval(()=>{
      
//       socket.emit("data",data)
//     },1000)
  
//     socket.on('ups',async({id,active})=>{
//       const re=await user.findByIdAndUpdate({_id:id},{
//         active:active
//       })
//       socket.emit("data",data)

//       console.log(re)
//     })
// })
//   console.log("connected to mongoDB")
// })

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Port = process.env.PORT || 3500;
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const options = require("./config/config");
const connectDb = require("./config/connectDB");
const multer = require("multer");
const { Server } = require("socket.io");
const user = require("./model/user_reg");

connectDb();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require('./routes/root'));
app.use("/regs", require('./routes/regs'));
app.use("/auth", require('./routes/auth'));
app.use("/get", require('./routes/get'));
app.use("/user_set", require('./routes/user_set'));
app.use("/patch", upload.single("file"), require('./routes/patch'));
app.use("/refresh", require('./routes/refresh'));
app.use("/img", require('./routes/img'));
app.use("/settings", require('./routes/user_settings'));
app.use("/search", require('./routes/search'));
app.use("/add_room", upload.array('file'), require('./routes/add_rooms'));
app.use("/update", require('./routes/update'));

const server = app.listen(Port, () => console.log("Running on " + Port));

const io = new Server(server, {
    cors: { origin: "http://localhost:3000" }
});

mongoose.connection.once("open", () => {
    io.on("connection", async (socket) => {
        const data = await user.find().lean();
        
        setInterval(() => {
            socket.emit("data", data);
        }, 1000);

        socket.on('ups', async ({ id, active }) => {
            await user.findByIdAndUpdate(id, { active });
            socket.emit("data", data);
        });
    });
    console.log("Connected to MongoDB");
});

