const mongoose = require("mongoose");


const connectDB =async ()=>{
mongoose.connect(

    "mongodb+srv://NamasteNode:deCqE9X6Um0RZlek@namastenode.zysp5tx.mongodb.net/devTinder"
);
 
};

// connectDB().then (()=>{

//     console.log("database conection is succesfully stablished")
// }).catch(err=>{
//       console.log("database is not connected")
// }
// )


module.exports= connectDB;


