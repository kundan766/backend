
const express=require("express")
const app=express();
const db=require("./db");


const bodyParser=require('body-parser');
app.use(bodyParser.json());

const passport=require("./auth");
// const LocalStragety=require( "passport-local").Strategy;

const Person=require("./models/person");
const menu=require("./models/menu")

// use of passport
// app.use(passport.initialize());

// // use of authencation

// passport.use(new LocalStragety(async(USERNAME,password,done)=>{
//     // authencation logic
//     try{
//          console.log("recieved credential: ",USERNAME,password);
//           const user= await Person.findOne({username:USERNAME});
//          if(!user)
//           return  done(null,false,{message: 'No User Found'});
//          const isPasswordMatch=user.Password===password ? true:false;
//          if(isPasswordMatch){
//             return done(null,user);
//          }
//        else{
//         return done(null,false,{message:"Incorrect password"});
//        }

//     }catch(err){
//           return done(err)
//     }
// }))







// middleware function
app.logedrequest=(req,res,next)=>{
    console.log("logged");
    next();
}

app.use(app.logedrequest);
app.use(passport.initialize());

// routes for the application
const localAuthMiddleware=passport.authenticate ('local',{session:false})

app.get("/", localAuthMiddleware ,function(req,res) {
    res.send("welcome to resturent")


})

app.get("/admin",(req,res)=>{
    var customer_id={
        name:"kundan",
        size:"34",
        color:"fair",
        coder:"yes",

    }
    res.send(customer_id);
    res.send("yes i am admin")
})

// app.post('/person', async(req,res)=>{
//     try{
//     const data=req.body;

//     const newPerson=new Person(data);
//     const response=await newPerson.save();
//     // newPerson.name=data.name;
//     console.log("data saved");
//     res.status(200).json(response)
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server error'})
//     }

// })

// to get the person information

// app.get('/person', async(req,res)=>{
//      try{
//           const data= await Person.find();
//           console.log("data fetch successfully");
//           res.status(200).json(data)
//      }catch(err){
//        console.log(err);
//        res.status(500).json({error:"Internal server error"})
//      }
// });


// app.get("/menu", async (req, res) => {
//     try {
//         const data = await Menu.find(); // Corrected 'menu' to 'Menu'
//         console.log("data saved successfully");
//         res.status(200).json(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// app.post("/menu", async (req, res) => {
//     try {
//         const data = req.body;
//         const newMenu = new Menu(data); // Corrected 'menu' to 'Menu'
//         const response = await newMenu.save();

//         console.log("data saved successfully");
//         res.status(200).json(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// paramatrized  url :id is a parameter which will be taken  route

// app.get("/person/:workType",async (req,res)=>{
     
//      try{
//         const workType=req.params.workType;
//         if(workType=="chef" || workType=="waiter" || workType=="manager" ){
           
//           const response=await Person.find({work:workType});
//           console.log("response fetched");
//           res.status(200).json(response);
//         }else{
//             res.tatus(404).josn( {"error":"Invalid Work Type"} );
//         }



//      }catch(err){
//         console.log(err);
//         res.status(500).json({error:"Internal server error"})
//      }

// })

const PersonRouter=require("./router/PersonRouter");
const menuRouter=require('./router/menuRouter');

app.use("/person", PersonRouter);
app.use('/menu', menuRouter);




app.listen(4000,()=>{
    console.log("server is running on port" + 4000)
});
