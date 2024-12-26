const express=require('express');
const db=require('./db');
const app=express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("Well come to library management system");
})

//requiring the staffRoute
const staffRoute=require('./routes/staffRoutes');
app.use('/staff',staffRoute);

//requiring the readerRoute
const readerRoute=require('./routes/readerRoutes');
app.use('/reader',readerRoute);

//requiring the bookRoute
const bookRoute=require('./routes/bookRoutes');
app.use('/book',bookRoute);

//requiring the reportRoute
const reportRoute=require('./routes/reportRoute');
app.use('/report',reportRoute);

app.listen(3000,()=>{
    console.log("Server is live !");
})
