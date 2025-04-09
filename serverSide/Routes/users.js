const express = require("express");
const DataFetcher = require("../controllers/Users/users");
const users = express.Router();
const fetch = new DataFetcher();

users.get('/users', async (req, res) => {
    try {
        const data = await fetch.fetchData('SELECT * FROM users', []); 
        res.json(data); 
        const userData = {
            name: "John Doe",
            email: "john@example.com",
            password: "securepass123"
        };
        // const checkData = fetch.checkDataExistOrNot('users', 'email', userData.email)
        // if(checkData){
        //     return console.log('duplicate found.');
        // }
        // const insert = fetch.insertData('users', userData);
        // if(insert){
        //     console.log('data inserted');
        // }
        

    } catch (e) {
        console.error('Error fetching users:', e);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

module.exports = users;
