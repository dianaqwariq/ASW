// app.js file
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
const mydb = require('./config/db');

const rout = require('./routes/router');
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");




app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());




// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.get('/chat', (req, res) => {
    res.sendFile("chat.html", { root: './public/' });
});




app.get('/messages', (req, res) => {
    // Fetch all messages from the database
    mydb.query('SELECT * FROM messages', (err, results) => {
        if (err) {
            console.error("Error fetching messages:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
});



// Configure body-parser middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(rout);

app.listen(3001, () => {
    console.log('Server is running now');
});