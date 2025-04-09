const { Pool } = require('pg');

class Database {
    constructor() {
        if (!Database.instance) {
            this.pool = new Pool({
                user: 'postgres',
                host: 'localhost',
                database: 'quora',
                password: '1234',
                port: 5432,
                max: 10,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
            });

            this.pool.on('error', (err) => {
                console.error('Unexpected DB Error:', err);
                process.exit(-1);
            });

            Database.instance = this;
        }
        return Database.instance;
    }

    async query(queryText, params = []) {
        const client = await this.pool.connect();
        try {
            const res = await client.query(queryText, params);
            return res.rows;
        } catch (err) {
            console.error('Query failed:', err);
            throw err;
        } finally {
            client.release(); 
        }
    }

    async disconnect() {
        try {
            await this.pool.end();
            console.log('Database pool closed.');
        } catch (err) {
            console.error('Error closing database pool:', err);
        }
    }
}

const dbInstance = new Database();
Object.freeze(dbInstance);

module.exports = dbInstance;
