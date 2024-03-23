// authMiddleware.js 

const mydb = require('./config/db');


const authMessages=(premissions)=>{
return (req,res,next)=>{
    const userRole=req.body.role
    if(premissions.includes(userRole)){
        next()
    }
    else{
        return res.status(401).json("you do not have premissions")
    }
    }
};

const authUpdate=(req,res,next)=>{

}

module.exports={authUpdate,authMessages}