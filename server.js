require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const testRoutes = require('./routes/test');

// express app
const app = express();

// middleware
app.use(cors())
app.use(express.json());

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/test', testRoutes);

// connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })
