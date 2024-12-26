const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const staffSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },

    middleName:{
        type:String,
        required:false
    },

    lastName:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    phoneNo:{
        type:Number,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    }
})

staffSchema.pre('save',async function(next){
    const staff=this;
    try{
        if(!staff.isModified('password')){
            next();
        }else{
            const salt=await bcrypt.genSalt(10);

            const hashedPassword=await bcrypt.hash(staff.password,salt);
            staff.password=hashedPassword;

            next();
        }
    }catch(err){
        next(err);
    }
})

staffSchema.methods.isMatch=async (userPassword)=>{
    try{
        const isMatch= await bcrypt.compare(userPassword,this.password);

        return isMatch;
    }catch(err){
        throw err;
    }
}

const staffModel=mongoose.model('staff',staffSchema);

module.exports=staffModel;