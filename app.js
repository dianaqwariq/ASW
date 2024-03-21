
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const rout = require('./routes/router');
const cookieParser = require("cookie-parser");
const projectRoutes = require('./routes/projects');



app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/projects', projectRoutes);




// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rout);

app.listen(3001, () => {
    console.log('Server is running now');
});