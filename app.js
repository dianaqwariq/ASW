
// app.js file
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const libraryRouter = require('./routes/library');
const userProfileRoutes = require('./routes/user_profile')
const { authenticateTokenHandler } = require("./models/auth");
app.use(express.urlencoded({ extended: false }));



app.use("/profile", userProfileRoutes)
app.use('/library', authenticateTokenHandler, libraryRouter);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(3001, () => {
    console.log('Server is  running now');
});