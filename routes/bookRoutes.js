const book=require('../models/book');
const express=require('express');
const router=express.Router();

router.post('/',async(req,res)=>{  //endpoint to store record for a perticular book
    try{
        const data=req.body;
        const bookData=new book(data);

        const responseData=await bookData.save();
        
        res.status(200).json(responseData);
    }catch(err){
        res.status(500).json({error:"Data cannot be saved in the database"});
    }
})

router.get('/',async(req,res)=>{  //endpoint to get record for all the books
    try{
        const data=await book.find();

        if(!data){
            res.status(200).json("book schema is empty");
        }else{
            res.status(200).json(data);
        }
    }catch(err){
        res.status(500).json({error:"Internal error occured in the database"});
    }
})

router.put('/:id',async(req,res)=>{  //endpoint to update record for a particular book
    try{
        const id=req.params.id;
        
        const data=req.body;
        const responseData=await book.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });

        if(!responseData){
            res.status(200).json({message:"book does not exits !"});
        }else{
            res.status(200).json(responseData);
        }
    }catch(err){
        res.status(500).json({message:"Internal error !"});
    }
})

router.delete('/:id',async(req,res)=>{  //endpoint to delete record for a particular book
    try{
        const id=req.params.id;
        
        const data=req.body;
        const responseData=await book.findByIdAndDelete(id);

        if(!responseData){
            res.status(200).json({message:"book does not exits !"});
        }else{
            res.status(200).json({message:"book successfully deleted from the database "});
        }
    }catch(err){
        res.status(500).json({message:"Internal error !"});
    }
})

router.get('/:id',async(req,res)=>{  //endpoint to get record for partucular book
    try{
        const id=req.params.id;

        const responseData=await book.findOne({_id:id});

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