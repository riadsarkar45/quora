const Database = require("../../database/databaseConnection");

class DataFetcher {
    constructor() {
        this.db = Database;
    }

    async fetchData(query, params) {
        try {
            return await this.db.query(query, params);
        } catch (e) {
            console.error('Error fetching data:', e.message);
        }
    }

    async checkDataExistOrNot(tableName, columnToCheck, checkValue) {
        if (!tableName || !columnToCheck || checkValue === undefined) {
            throw new Error('Missing required parameters: tableName, columnToCheck, or checkValue');
        }

        const validTableName = tableName.replace(/[^a-zA-Z0-9_]/g, '');
        const validColumnName = columnToCheck.replace(/[^a-zA-Z0-9_]/g, '');
        const sql = `SELECT 1 FROM "${validTableName}" WHERE "${validColumnName}" = $1 LIMIT 1`;

        try {
            const result = await this.db.query(sql, [checkValue]);
            return result.length > 0;
        } catch (error) {
            console.error('Error checking data existence:', error.message);
            return false;
        }
    }

    async insertData(tableName, dataToInsert) {
        if (!tableName || typeof dataToInsert !== 'object' || Object.keys(dataToInsert).length < 1) {
            throw new Error('Invalid table name or data.');
        }

        const columns = Object.keys(dataToInsert).map(col => `"${col}"`).join(', ');
        const valuesPlaceholders = Object.keys(dataToInsert).map((_, i) => `$${i + 1}`).join(', ');
        const sql = `INSERT INTO "${tableName}" (${columns}) VALUES (${valuesPlaceholders}) RETURNING *`;

        const valuesArray = Object.values(dataToInsert);

        try {
            const result = await this.db.query(sql, valuesArray);
            return result.length > 0;
        } catch (error) {
            console.error('Error inserting data:', error.message);
            return false;
        }
    }
}

module.exports = DataFetcher;
