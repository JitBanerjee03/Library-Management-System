const mongoose=require('mongoose');

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

const staffModel=mongoose.model('staff',staffSchema);

module.exports=staffModel;