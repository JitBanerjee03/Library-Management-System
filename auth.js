const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const staff=require('./models/staff');
const reader=require('./models/reader');

//middleware for user authentication
passport.use(new localStrategy(async(username,password,done)=>{
    try{
        const readerData=await reader.findOne({email:username});

        if(!readerData){
            const staffData=await staff.findOne({email:username});

            if(!staffData){
                done(null,false,{message:"Invalid username or password !"});
            }else{
                const isValidStaff=staffData.isMatch(password);

                if(isValidStaff){
                    done(null,staffData)
                }else{
                    done(null,false,{message:"Invalid username or password !"});  
                }
            }
        }else{
            const isValidreader=readerData.isMatch(password);

            if(isValidreader){
                done(null,readerData)
            }else{
                done(null,false,{message:"Invalid username or password !"});  
            }
        }
    }catch(err){
        done(err);
    }
}));

module.exports=passport;



