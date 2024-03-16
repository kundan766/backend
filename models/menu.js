const mongoose=require("mongoose");


const menuSchema=new mongoose.Schema({
    name:{
       type:String, 
       required:true,

    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:Number,
        enum:["1","2","3"],
    },
    



})

const menu=mongoose.model("menu",menuSchema);
module.exports=menu;