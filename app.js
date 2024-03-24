const express = require('express');
const app = express();
const projectsRouter = require('./routes/projects');
const userProfileRoutes = require('./routes/user_profile')
const { authenticateTokenHandler } = require("./models/auth");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/profile", userProfileRoutes)
app.use('/projects', authenticateTokenHandler, projectsRouter);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



app.listen(3001, () => {
    console.log('Server is running now');
});
