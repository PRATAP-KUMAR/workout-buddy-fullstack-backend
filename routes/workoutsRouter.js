import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { addWorkout, deleteWorkout, getWorkouts } from '../controllers/workoutsController.js';

const workoutsRouter = express.Router();

// protect routes
workoutsRouter.use(requireAuth);

// Add a workout
workoutsRouter.post('/', addWorkout);

// Get all workouts
workoutsRouter.get('/', getWorkouts);

// Delete a workout
workoutsRouter.delete('/:id', deleteWorkout);

export default workoutsRouter;