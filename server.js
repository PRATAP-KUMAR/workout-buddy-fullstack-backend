import express from 'express';
import cors from 'cors';
import workoutsRouter from './routes/workoutsRouter.js';
import userRouter from './routes/userRouter.js';
import dotenv from "dotenv";

import pool from './db.js';

dotenv.config();

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    next();
})
 
// routes
app.use('/api/workouts', workoutsRouter);
app.use('/api/user', userRouter);

let connection;

try {
    const client = await pool.connect();
    if (client) {
        connection = true;
        client.release();
    }
} catch (error) {
    console.log('error', error);
}

if (connection) {
    app.listen(3001, () => {
        console.log('conncted to db & listening on port 3001')
    })
}