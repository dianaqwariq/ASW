const express=require('express')
const usercontroller=require("../controllers/UserController")
const  router= require('express').Router();
const {check}=require ("express-validator");


router.get("/", (req, res, next) => {
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


router.post('/tasks', async (req, res) => {
    try {
        const { task_description, assigned_to, due_date } = req.body;

        // Check if the assigned user exists
        const userExistsQuery = await db.query(
            "SELECT * FROM users WHERE id = ?",
            [assigned_to]
        );

router.get("/userByName/:name", usercontroller.getUserByName);
router.get("/skill/:skills",usercontroller.getskill);
router.get("/allSkills", usercontroller.getAllSkills);





        // Insert task into the database
        const result = await db.query(
            "INSERT INTO tasks (task_description, assigned_to, due_date, status) VALUES (?, ?, ?, ?)",
            [task_description, assigned_to, due_date, 'Pending']
        );

        // Send success response
        res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
    } catch (error) {
        // Handle errors
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;


router.post("/updateuser/:id", usercontroller.updateUser);

 module.exports=router

