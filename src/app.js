
 const express = require("express");

 const connectDB=require("./config/database");
 const cookieParser=require("cookie-parser")
 const jwt =require("jsonwebtoken");
const cors =require("cors")
require("dotenv").config();

const app=express();

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// connectDB();

const authRouter=require("./routes/auth");
const profileRouter= require("./routes/profile");
const requestRouter= require("./routes/request");
const userRouter=require("./routes/users");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



connectDB().then (()=>{

    console.log("database conection is succesfully stablished")

    app.listen(7000, ()=>{
     console.log("Server is running at port 7000...")
});
}).catch(err=>{
      console.log("database is not connected")
}
);


