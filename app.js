const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const PORT = 5000;
const connString = process.env.DB_CONNECTION;

const postRoute = require('./routes/posts');

app.use(express.json());

// register post routes
app.use('/posts', postRoute);

// connect to db
mongoose.connect(connString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to Mongo...'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));