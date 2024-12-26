const express=require('express');
const router=express.Router();
const report=require('../models/report');
const book=require('../models/book');

router.get('/issuebook/:id/:bookId',async(req,res)=>{  //end point for book issue by a particular user
    try{
        const id=req.params.id;
        const bookId=req.params.bookId;

        const data=await book.findOne({_id:bookId});

        if(!data){
            res.status(200).json({message:"Book does not exists"})
        }else{
            if(data.isAvailable===false){
                res.status(2000).json({message:"Book is currently unavailable !"});
            }else{
                data.isAvailable=false;
                const responseData=await book.findByIdAndUpdate(bookId,data,{
                    new:true,
                    runValidators:true
                })
                
                const reportData=new report();
                reportData.bookId=bookId;
                reportData.userId=id;
                reportData.issueDate=new Date();

                await reportData.save();
                res.status(200).json({message:"Book Successfully issued"});
            }
        }
    }catch(err){
        res.status(500).json({message:"Internal error occured"});
    }
})

router.delete('/returnbook/:id/:bookId',async(req,res)=>{  //end point for book return for a particular users
    try{
        const id=req.params.id;
        const bookId=req.params.bookId;

        const data=await report.findOne({bookId:bookId,userId:id});
        const bookData=await book.findOne({_id:bookId});

        if(!data){
            res.status(200).json({message:"Book does not exists"})
        }else{
            await report.findByIdAndDelete(data._id);
            bookData.isAvailable=true;

            await book.findByIdAndUpdate(bookData._id,bookData,{
                new:true,
                runValidators:true
            });

            res.status(200).json({message:"Book returned successfully !"});
        }
    }catch(err){
        res.status(500).json({message:"Internal error occured"});
    }
})

module.exports=router;