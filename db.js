//This is file to integrate mongo db with node js using the mongoose library

const mongoose=require('mongoose');
require('dotenv').config();

MONGO_LOCAL_URL=process.env.MONGO_LOCAL_URL;
mongoose.connect(MONGO_LOCAL_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,  
})

const db=mongoose.connection;

db.on('connected',()=>{console.log("Database is connected")})
db.on('disconnected',()=>{console.log("Database Disconnected")})
db.on('error',()=>{console.log('Some error occured while connecting the database')})

module.exports=db;