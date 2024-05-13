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
app.use(cors({
    origin: 'https://workout-mern-backend-ohg1fwteu-pratap-kumar1s-projects.vercel.app', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
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
