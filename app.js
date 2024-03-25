
// app.js file
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const mydb = require('./config/db');
const rout = require('./routes/router');
const path=require("path")
const projectRoutes = require('./routes/routerProject');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//app.js
const express = require('express');
const app = express();
const mydb = require('./config/db');
const projectsRouter = require('./routes/projects');
const userProfileRoutes = require('./routes/user_profile')
const { authenticateTokenHandler } = require("./models/auth");


app.use(express.urlencoded({ extended: false }));
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const{authUpdate}=require("./authMiddleware")
// Import your chat controller
const chatController = require('./controllers/chatController');
const usercontroller = require('./controllers/UserController');
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const taskController = require('./controllers/taskController');


app.use("/profile", userProfileRoutes)
app.use('/projects', authenticateTokenHandler, projectsRouter);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
//app.post("/updateuser", authenticateTokenHandler ,authUpdate(["admin"]),usercontroller.updateuser);

//app.get("/allusers", usercontroller.getalluser)
app.get("/alltasks", authenticateTokenHandler, taskController.getAlltasks)
app.post("/addTask", authenticateTokenHandler,taskController.addtask)
app.post("/update_satus", authenticateTokenHandler,taskController.updateTaskStatus)
app.post('/send-message', authenticateTokenHandler ,chatController.sendMessage); // Add this line




app.get('/messages', authenticateTokenHandler,(req, res) => {
    // Fetch all messages from the database
    mydb.query('SELECT * FROM messages', (err, results) => {
        if (err) {
            console.error("Error fetching messages:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
});



app.use("/allproject/skills/projectID/picture/ofCompletaion" ,express.static(path.join(__dirname,"images"))); //localhost:3001allproject/skills/projectID/picture/ofCompletaion/tat.jpg
app.use("/allproject/skills/projectID/picture/ofMaterial" ,express.static(path.join(__dirname,"images"))); //localhost:3001allproject/skills/projectID/picture/ofCompletaion/tat.jpg
app.use("/allproject/skills/addpicture" ,require("./routes/upload")); // to upload in postman

app.use(projectRoutes);                                //allproject/skills to chooice or show all proj

app.listen(3001, () => {

    console.log('Server is  running now');

    console.log('Server is running now');

});