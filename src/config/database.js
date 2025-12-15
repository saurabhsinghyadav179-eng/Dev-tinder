const mongoose = require("mongoose");


const connectDB =async ()=>{
    console.log(process.env.DB_CONNECTION_SECRET);
mongoose.connect(
      
    process.env.DB_CONNECTION_SECRET
);
 
 
};

// connectDB().then (()=>{

//     console.log("database conection is succesfully stablished")
// }).catch(err=>{
//       console.log("database is not connected")
// }
// )


module.exports= connectDB;


