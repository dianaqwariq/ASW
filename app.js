


//app.js
const express = require('express');
const app = express();
const mydb = require('./config/db');
 const userProfileRoutes = require('./routes/user_profile')
const libraryRouter = require('./routes/library');
const path=require("path")
const router = require('./routes/router');

const bodyParser = require('body-parser'); 

const  projectRoutes = require('./routes/routerProject');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));



const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { fetchTemperature } = require('./weatherService');

const { authenticateTokenHandler } = require("./models/auth");

app.get('/temperature', async (req, res) => {
    try {
        const city = req.query.city || 'nablus'; 
        const temperature = await fetchTemperature(city);
        res.json({ city, temperature });
    } catch (error) {
        console.error('Error fetching temperature:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.use(express.urlencoded({ extended: false }));

// Import your chat controller
const chatController = require('./controllers/chatController');
const usercontroller = require('./controllers/UserController');
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const taskController = require('./controllers/taskController');
app.use('/', router);

app.use('/library', authenticateTokenHandler, libraryRouter);


app.use("/profile", userProfileRoutes)



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get("/alltasks", authenticateTokenHandler, taskController.getAlltasks)
app.post("/addTask", authenticateTokenHandler,taskController.addtask)
app.post("/update_satus", authenticateTokenHandler,taskController.updateTaskStatus)
app.post('/send-message', authenticateTokenHandler ,chatController.sendMessage); // Add this line


app.get("/allcraftskills",usercontroller.getallcraftskills)
app.post("/adduser",usercontroller.addUser)


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


app.use ("/allproject/skills/projectID/picture/ofCompletaion" ,express.static(path.join(__dirname,"images")));  //localhost:3001allproject/skills/projectID/picture/ofCompletaion/tat.jpg

app.use("/allproject/skills/projectID/picture/ofMaterial" ,express.static(path.join(__dirname,"images"))); //localhost:3001allproject/skills/projectID/picture/ofCompletaion/tat.jpg

app.use("/allproject/skills/addpicture" ,require("./routes/upload")); // to upload in postman


  app.use(projectRoutes);                                //allproject/skills to chooice or show all proj


app.listen(3001, () => {
    console.log('Server is running now');
});