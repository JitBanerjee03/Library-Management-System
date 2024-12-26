const mongoose=require('mongoose');

const reportSchema=mongoose.Schema({
    bookId:{
        type:String,
        required:true
    },

    userId:{
        type:String,
        required:true
    },

    issueDate:{
        type:Date,
        required:true
    }
});

const reportModel=mongoose.model('report',reportSchema);

module.exports=reportModel;

