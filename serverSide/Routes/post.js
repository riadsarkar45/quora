const express = require("express");
const DataFetcher = require("../controllers/Users/users");
const insert = express.Router();
const dataInserter = new DataFetcher();

insert.post("/insert", async (req, res) => {
    try {
        const { text, userId } = req.body;
        const data = {
            date: new Date(),
            userId: userId,
            question: text,
            status: 'OFF'
        }
        
        const insert = dataInserter.insertData('questions', data)
        if (insert) {
            console.log('Question added successfully ');
        }
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

insert.get('/posts', async(req, res) => {
    const getPost = await dataInserter.fetchData('SELECT * FROM questions', []);
    console.log(getPost);
    res.json(getPost)
})

module.exports = insert;
