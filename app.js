const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const projectsRouter = require('./routes/projects');

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.use('/projects', projectsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(3001, () => {
    console.log('Server is running now');
});
