const express = require('express')
const usercontroller = require("../controllers/UserController")
const router = require('express').Router();
const { check } = require("express-validator");


router.get("/", (req, res, next) => {
    res.send("diana")
})
router.get("/allusers", usercontroller.getalluser)
router.post("/adduser", usercontroller.addnewuser)
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
module.exports = router