const mongoose=require("mongoose");
//defining the database

const mongoURL="mongodb://localhost:27017/resturent";
mongoose.connect(mongoURL,{
    // useNewUrlParse:true,
    // userUnifiedTopology:true
})

const db=mongoose.connection;
db.on('connected',()=>{
    console.log("database is connected")
})

db.on('error',(err)=>{
    console.log("Mongodb connection error",err)
})

db.on("disconnected",()=>{
    console.log("Mongodb disconnected")
})

module.export=db;