const staff=require('../models/staff');
const express=require('express');
const router=express.Router();

router.post('/',async(req,res)=>{  //endpoint to store record for a perticular staff
    try{
        const data=req.body;
        const staffData=new staff(data);

        const responseData=await staffData.save();
        
        res.status(200).json(responseData);
    }catch(err){
        res.status(500).json({error:"Data cannot be saved in the database"});
    }
})

router.get('/',async(req,res)=>{  //endpoint to get record for all staff
    try{
        const data=await staff.find();

        if(!data){
            res.status(200).json("Staff schema is empty");
        }else{
            res.status(200).json(data);
        }
    }catch(err){
        res.status(500).json({error:"Internal error occured in the database"});
    }
})

router.put('/:id',async(req,res)=>{  //endpoint to update record for a particular staff
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

router.delete('/:id',async(req,res)=>{  //endpoint to delete record for a particular staff
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

router.get('/:id',async(req,res)=>{  //endpoint to get record for partucular staff
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