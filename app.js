//app.js in routes
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mydb = require('./config/db');
const {authUpdat,authMessages}= require ('./authMiddleware');
const rout = require('./routes/router');
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const router = require('express').Router();
const usercontroller = require("./controllers/UserController");
const { check } = require("express-validator");
const { fetchTemperature } = require('./weatherService');

// Import your chat controller
const chatController = require('./controllers/chatController');

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.post("/updateuser", usercontroller.updateuser);
// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.post('/send-message', chatController.sendMessage); // Add this line

app.get('/chat', (req, res) => {
    res.sendFile("chat.html", { root: './public/' });
});
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
// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rout);

app.get('/messages', authMessages(["admin","user"]),(req, res) => {
    // Fetch all messages from the database
    mydb.query('SELECT * FROM messages', (err, results) => {
        if (err) {
            console.error("Error fetching messages:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
});


app.get('/temperature', async (req, res) => {
    try {
        const city = 'jericho'; 
        const temperature = await fetchTemperature(city);
        res.json({ city, temperature });
    } catch (error) {
        console.error('Error fetching temperature:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Handle global errors
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).send('Internal server error');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
