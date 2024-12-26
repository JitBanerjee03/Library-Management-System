//This is file to integrate mongo db with node js using the mongoose library

const mongoose=require('mongoose');

LOCAL_URL="mongodb://127.0.0.1:27017/Library"
mongoose.connect(LOCAL_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,  
})

const db=mongoose.connection;

db.on('connected',()=>{console.log("Database is connected")})
db.on('disconnected',()=>{console.log("Database Disconnected")})
db.on('error',()=>{console.log('Some error occured while connecting the database')})

module.exports=db;