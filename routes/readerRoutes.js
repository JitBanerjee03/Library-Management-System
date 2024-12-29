const express=require('express');
const router=express.Router();
const reader=require('../models/reader')
const {jwtTokenGeneration,jwtTokenValidation}=require('../jwtAuth');

router.post('/signup',async(req,res)=>{  //endpoint to store record for a perticular reader
    try{
        const data=req.body;
        const readerData=new reader(data);

        const responseData=await readerData.save();

        const payload={
            userName:responseData.email,
            firstName:responseData.firstName
        }

        const token=await jwtTokenGeneration(payload);
        console.log(token);
        res.status(200).json({token});
    }catch(err){
        res.status(500).json({error:"Data cannot be saved in the database"});
    }
})

router.get('/login',async(req,res)=>{  //endpoint to login record for a perticular reader and generating jwt token for that particular user
    try{
        const data=req.body;

        const responseData=reader.findOne(data.username);
        
        if(!responseData){
            console.log("user does not exist !");
            res.status(401).json({message:"User does not exist with this email/username"});
        }else{
            const isValidUser=responseData.isMatch(data.password);

            if(isValidUser){
                const payload={
                    userName:responseData.email,
                    firstName:responseData.firstName
                }
                const token=await jwtTokenGeneration(payload);
                console.log(token); 
                res.status(200).json({token});
            }
        }
    }catch(err){
        res.status(500).json({error:"Data cannot be saved in the database"});
    }
})

router.put('/:id',jwtTokenValidation,async(req,res)=>{  //endpoint to update record for a particular reader
    try{
        const id=req.params.id;
        
        const data=req.body;
        const responseData=await reader.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });

        if(!responseData){
            res.status(200).json({message:"User does not exits !"});
        }else{
            res.status(200).json(responseData);
        }
    }catch(err){
        res.status(500).json({message:"Internal error !"});
    }
})

router.delete('/:id',jwtTokenValidation,async(req,res)=>{  //endpoint to delete record for a particular reader
    try{
        const id=req.params.id;
        
        const data=req.body;
        const responseData=await reader.findByIdAndDelete(id);

        if(!responseData){
            res.status(200).json({message:"User does not exits !"});
        }else{
            res.status(200).json({message:"staff successfully deleted from the database "});
        }
    }catch(err){
        res.status(500).json({message:"Internal error !"});
    }
})

router.get('/:id',jwtTokenValidation,async(req,res)=>{  //endpoint to get record for partucular reader
    try{
        const id=req.params.id;

        const responseData=await reader.findOne({_id:id});

        if(!responseData){
            res.status(200).json({message:"Staff does not exits !"});
        }else{
            res.status(200).json(responseData);
        }
    }catch(err){
        res.status(500).json({error:"Internal error occured in the database"});
    }
})

module.exports=router;