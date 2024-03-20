// app.js in views folder
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const mydb = require('./config/db');
const { isAuthenticated } = require('./authMiddleware'); // Import the authentication middleware

const app = express();

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Route to fetch all messages
app.get('/messages', isAuthenticated, (req, res) => {
    // Fetch all messages from the database
    mydb.query('SELECT * FROM messages', (err, results) => {
        if (err) {
            console.error("Error fetching messages:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
});

// Route to serve chat.html
app.get('/chat', isAuthenticated, (req, res) => {
    res.sendFile("chat.html", { root: './public/' });
});

app.post('/send-message', async (req, res) => {
    const { message } = req.body;
    const senderId = req.user.id; // Assuming you have a user object in req.user after authentication

    try {
        // Fetch sender's email from the users table
        const [sender] = await mydb.query('SELECT email FROM users WHERE id = ?', [senderId]);
        const senderEmail = sender[0].email;

        // Save the message to the database with sender's email
        mydb.query('INSERT INTO messages (sender_email, message) VALUES (?, ?)', [senderEmail, message], (err, result) => {
            if (err) {
                console.error("Error saving message:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(200).json({ message: "Message sent successfully" });
        });
    } catch (error) {
        console.error("Error fetching sender's email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// Start the server
app.listen(3001, () => {
    console.log('Server is running now');
});
