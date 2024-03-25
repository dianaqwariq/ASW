const express=require('express')
const usercontroller=require("../controllers/UserController")
const  router= require('express').Router();
const {check}=require ("express-validator");


router.get("/",(req,res,next)=>{
    res.send("diana")
     })
router.get("/allcraftskills",usercontroller.getallcraftskills)
router.post("/adduser",usercontroller.addUser)
router.post("/deleteuser", [
    check("id").custom((value, { req }) => {
        if (!value) {
            throw new Error("id is required");
        }
        if (isNaN(value)) {
            throw new Error("id should be only number");
        }
        return true; // Indicates the success of the validation
    })
], usercontroller.deleteuser);

router.post("/updateuser", usercontroller.updateuser);
 module.exports=router

router.get("/user/:id", [
    check("id").custom((value, { req }) => {
        if (!value) {
            throw new Error("id is required");
        }
        if (isNaN(value)) {
            throw new Error("id should be only number");
        }
        return true; // Indicates the success of the validation
    })
], usercontroller.getUserById);

router.get("/userByName/:name", usercontroller.getUserByName);
router.get("/skill/:skills",usercontroller.getskill);
router.get("/allSkills", usercontroller.getAllSkills);




router.post("/updateuser/:id", usercontroller.updateUser);

 module.exports=router