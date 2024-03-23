const express = require('express');
const app = express();
const projectsRouter = require('./routes/projects');
const userProfileRoutes = require('./routes/user_profile')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { authenticateTokenHandler } = require("./models/auth");


// Define Routes
app.use("/profile", userProfileRoutes)
app.use('/projects', authenticateTokenHandler, projectsRouter);

console.log(process.env);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start server
app.listen(3001, () => {
    console.log('Server is running now');
});
