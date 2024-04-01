//router.js in routes 
const express = require('express');
const usercontroller = require("../controllers/UserController");
const router = require('express').Router();
const { check } = require("express-validator");
const { authenticateTokenHandler } = require("../models/auth");


router.get("/allcraftskills", authenticateTokenHandler,usercontroller.getallcraftskills)
router.post("/adduser",usercontroller.addUser)

router.post("/deleteuser",authenticateTokenHandler, [
    check("id").custom((value, { req }) => {
        if (!value) {
            throw new Error("id is required");
        }
        if (isNaN(value)) {
            throw new Error("id should be only number");
        }
        return true; // Indicates the success of the validation
    })
],  usercontroller.deleteuser);
router.post("/updateuser", usercontroller.updateuser);
 

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
], authenticateTokenHandler, usercontroller.getUserById);

router.get("/userByName/:name", authenticateTokenHandler, usercontroller.getUserByName);
router.get("/skill/:skills", authenticateTokenHandler,usercontroller.getskill);
router.get("/allSkills", authenticateTokenHandler, usercontroller.getAllSkills);




router.post("/updateuser/:id", authenticateTokenHandler, usercontroller.updateuser);

 module.exports=router;