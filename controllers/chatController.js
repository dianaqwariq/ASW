const db = require('../config/db');

exports.sendMessage = (req, res) => {
    const { email, message } = req.body;
    const userEmail = req.user.email; 

    if (!userEmail || !email || !message) {
        return res.status(400).json({ error: "User email, recipient email, and message are required" });
    }

    // Check if the provided email matches the email from the token
    if (email !== userEmail) {
        return res.status(403).json({ error: "You are not authorized to send a message on behalf of another user" });
    }

    // Fetch sender's ID using their email
    db.query('SELECT id FROM users WHERE email = ?', [userEmail], (err, results) => {
        if (err) {
            console.error("Error retrieving user ID:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const sender_id = results[0].id;

        db.query('INSERT INTO messages (sender_id, message, sender_email, receiver_id) VALUES (?, ?, ?, ?)', [sender_id, message, userEmail, email], (err, result) => {
            if (err) {
                console.error("Error saving message:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.status(200).json({ message: "Message sent successfully" });
        });
    });
};