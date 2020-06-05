const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv/config');
// docs use - (see line below) ????
// require('dotenv').config()

const PORT = 5000;

const postRoute = require('./routes/posts');
const personRoute = require('./routes/persons');

app.use(cors());
app.use(express.json());

// register post routes
app.use('/posts', postRoute);
app.use('/persons', personRoute);

// connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to Mongo...'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));