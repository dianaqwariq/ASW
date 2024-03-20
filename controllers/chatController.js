// routes/chat.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/', chatController.chatPage);
router.post('/send', chatController.sendMessage);
router.get('/messages', chatController.getAllMessages);

module.exports = router;