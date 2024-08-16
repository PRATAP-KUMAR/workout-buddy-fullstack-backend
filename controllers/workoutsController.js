import pool from "../db.js";

// add a workout
const addWorkout = async (req, res) => {
    const { user_id } = req; // private prop

    const { title, load, reps } = req.body;

    const text = 'insert into workouts values(default, $1, $2, $3) returning id';
    const values = [title, reps, user_id];
    const query = await pool.query(text, values);
    const id = query.rows[0].id;

    if (id) {
        res.status(201).json({ title, load, reps, id });
    }
}

// get all workouts
const getWorkouts = async (req, res) => {
    const { user_id } = req; // private prop

    const text = 'select * from workouts where user_id = $1';
    const values = [user_id];
    const query = await pool.query(text, values);

    res.status(200).json(query.rows);
}

// delete workout
const deleteWorkout = async (req, res) => {
    const { user_id } = req; // private prop
    let {id} = req.params;
    id = parseInt(id);

    try {
        const text = 'delete from workouts where user_id = $1 and id = $2';
        const values = [user_id, id];
        const query = await pool.query(text, values);
        if (query.rowCount) {
            console.log('deleting...');
            console.log(id);
            res.status(200).json({id})
        }
    } catch (err) {
        console.log('some error');
    }
}

export { getWorkouts, deleteWorkout, addWorkout }