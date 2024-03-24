//chatController.js in controllers
const db = require('../config/db');

exports.sendMessage = (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ error: "Email and message are required" });
    }

    // Fetch sender's ID using their email
    db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error("Error retrieving user ID:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const sender_id = results[0].id;

        // Insert message into the messages table
        db.query('INSERT INTO messages (sender_id, message, sender_email) VALUES (?, ?, ?)', [sender_id, message, email], (err, result) => {
            if (err) {
                console.error("Error saving message:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.status(200).json({ message: "Message sent successfully" });
        });
    });
};
