const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const readerSchema=mongoose.Schema({
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

readerSchema.pre('save',async function(next){
    const reader=this;
    try{
        if(!reader.isModified('password')){
            next();
        }else{
            const salt=await bcrypt.genSalt(10);

            const hashedPassword=await bcrypt.hash(reader.password,salt);
            reader.password=hashedPassword;

            next();
        }
    }catch(err){
        next(err);
    }
})

readerSchema.methods.isMatch=async (userPassword)=>{
    try{
        const isMatch= await bcrypt.compare(userPassword,this.password);

        return isMatch;
    }catch(err){
        throw err;
    }
}

const readerModel=mongoose.model('reader',readerSchema);

module.exports=readerModel;