const express=require('express');
const router=express.Router();
const reader=require('../models/reader')

router.post('/',async(req,res)=>{  //endpoint to store record for a perticular reader
    try{
        const data=req.body;
        const readerData=new reader(data);

        const responseData=await readerData.save();
        
        res.status(200).json(responseData);
    }catch(err){
        res.status(500).json({error:"Data cannot be saved in the database"});
    }
})

router.put('/:id',async(req,res)=>{  //endpoint to update record for a particular reader
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

router.delete('/:id',async(req,res)=>{  //endpoint to delete record for a particular reader
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

router.get('/:id',async(req,res)=>{  //endpoint to get record for partucular reader
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