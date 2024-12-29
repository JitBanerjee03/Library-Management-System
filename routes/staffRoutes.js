const staff=require('../models/staff');
const express=require('express');
const router=express.Router();
const {jwtTokenGeneration,jwtTokenValidation}=require('../auth');

router.post('/signup',async(req,res)=>{  //endpoint to store record for a perticular staff
    try{
        const data=req.body;
        const staffData=new staff(data);

        const responseData=await staffData.save();

        const payload={
            userName:responseData.email,
            firstName:responseData.firstName
        }

        const token=jwtTokenGeneration(payload);

        res.status(200).json({"User:":responseData,"token:":token});

    }catch(err){
        res.status(500).json({error:"Data cannot be saved in the database"});
    }
})

router.get('/login',async(req,res)=>{  //endpoint to get record for all staff
    try{
        const data=req.body;

        const responseData=staff.findOne(data.email);

        if(!responseData){
            res.status(200).json("Invalid username !");
        }else{
            const isMatch=await responseData.isMatch(data.password);

            if(isMatch){
                const payLoad={
                    userName:responseData.email,
                    firstName:responseData.firstName
                }

                const token=jwtTokenGeneration(payLoad);
                res.status(200).json({"User Data : ":responseData,"Paylaod : ":token});
            }else{
                res.status(401).json({message:"Invalid Password Unauthorised access!"});
            }
        }
    }catch(err){
        res.status(500).json({error:"Internal error occured in the database"});
    }
})

router.put('/:id',jwtTokenValidation,async(req,res)=>{  //endpoint to update record for a particular staff
    try{
        const id=req.params.id;
        
        const data=req.body;
        const responseData=await staff.findByIdAndUpdate(id,data,{
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

router.delete('/:id',jwtTokenValidation,async(req,res)=>{  //endpoint to delete record for a particular staff
    try{
        const id=req.params.id;
        
        const data=req.body;
        const responseData=await staff.findByIdAndDelete(id);

        if(!responseData){
            res.status(200).json({message:"User does not exits !"});
        }else{
            res.status(200).json({message:"staff successfully deleted from the database "});
        }
    }catch(err){
        res.status(500).json({message:"Internal error !"});
    }
})

router.get('/:id',jwtTokenValidation,async(req,res)=>{  //endpoint to get record for partucular staff
    try{
        const id=req.params.id;

        const responseData=await staff.findOne({_id:id});

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