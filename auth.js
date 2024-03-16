

const passport=require("passport");
const LocalStragety=require( "passport-local").Strategy;
const Person=require("./models/person");

// use of authencation

passport.use(new LocalStragety(async(USERNAME,password,done)=>{
    // authencation logic
    try{
         console.log("recieved credential: ",USERNAME,password);
          const user= await Person.findOne({username:USERNAME});
         if(!user)
          return  done(null,false,{message: 'No User Found'});
         const isPasswordMatch= await user.comparePassword(password);
         if(isPasswordMatch){
            return done(null,user);
         }
       else{
        return done(null,false,{message:"Incorrect password"});
       }

    }catch(err){
          return done(err)
    }
}))
module.exports=passport;