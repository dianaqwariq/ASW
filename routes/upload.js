const express=require('express')

const  router= require('express').Router();
const multer=require("multer");
const path=require("path")


const storage =multer.diskStorage({
    
    destination:function(req,file,cb){
cb(null,path.join(__dirname,"../images"));

        
    },
    filename:function(req,file,cb){
cb(null,file.originalname);

    }
});

const upload=multer({storage})

router.post("/",upload.single("image"),(req,res)=>{

    res.status(200).json({Message: "image uploaded"});
})
module.exports=router;