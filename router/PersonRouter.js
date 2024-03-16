const express=require("express")
const router=express.Router();
const Person=require("../models/person")


// to get the person information

router.get('/', async(req,res)=>{
    try{
         const data= await Person.find();
         console.log("data fetch successfully");
         res.status(200).json(data)
    }catch(err){
      console.log(err);
      res.status(500).json({error:"Internal server error"})
    }
});

router.post('/signup', async(req,res)=>{
    try{
    const data=req.body;

    const newPerson=new Person(data);
    const response=await newPerson.save();
    // newPerson.name=data.name;
    console.log("data saved");
    res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }

})



router.get("/:workType",async (req,res)=>{
     
    try{
       const workType=req.params.workType;
       if(workType=="chef" || workType=="waiter" || workType=="manager" ){
          
         const response=await Person.find({work:workType});
         console.log("response fetched");
         res.status(200).json(response);
       }else{
           res.tatus(404).josn( {"error":"Invalid Work Type"} );
       }



    }catch(err){
       console.log(err);
       res.status(500).json({error:"Internal server error"})
    }

})

// update 

router.put("/:id",async(req,res)=>{
    try{
         const personId=req.params.id;
         const updatedPersonData=req.body;
         const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidate:true,
        
        });
        console.log("data updated");
        res.status(200).json(response)
       

    }catch(err){
        console.log(error);
        res.status(500).json({error:"Interval server error"})
    }
})



module.exports=router;