const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const staff=require('./models/staff');
const reader=require('./models/reader');

//middleware for user authentication
passport.use(new localStrategy(async(username,password,done)=>{
    try{
        const readerData=await reader.findOne({email:username,password:password});

        if(!readerData){
            const staffData=await staff.findOne({email:username,password:password});

            if(!staffData){
                done(null,false,{message:"Invalid username or password !"});
            }else{
                done(null,staffData)
            }
        }else{
            console.log("You are a valid user !");
            done(null,readerData);
        }
    }catch(err){
        done(err);
    }
}));

module.exports=passport;



