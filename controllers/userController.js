import pool from '../db.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import validator from 'validator';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '2d' })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        let text;
        let values;
        let query;
        let result;

        if (!email || !password) {
            throw Error('both user name and password must be provided')
        }

        text = 'select id, email, password from users where email = $1';
        values = [email]
        query = await pool.query(text, values);

        result = query.rows[0]

        if (!result) {
            throw Error('Incorrect email');
        }

        const match = await bcrypt.compare(password, result.password)

        if (!match) {
            throw Error('Incorrect password');
        }

        const token = createToken(result.id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const signupUser = async (req, res) => {
    const { email, password } = req.body;

    let text = 'select email from users where email = $1';
    let values = [email];
    let response = await pool.query(text, values);

    if (response.rowCount === 0) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        text = 'insert into users values(default, $1, $2)';
        values = [email, hash];
        let query = await pool.query(text, values);

        text = 'select id from users where email = $1';
        values = [email]
        query = await pool.query(text, values);

        const userId = query.rows[0].id;

        const token = createToken(userId);

        res.status(200).json({ email, token });
    } else {
        res.status(301).send(`${email} already in database, cant create`);
    }
}

export { loginUser, signupUser }