import pg from 'pg';

const {Pool} = pg;

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'workoutsdb'
})

export default pool;