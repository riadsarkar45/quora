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

insert.post("/react-post/:type/:postId/:userId", async (req, res) => {
    const reactType = req.params.type;
    const postId = req.params.postId;
    const userId = req.params.userId;
    console.log(reactType, postId, userId);
    if (!reactType || !postId || !userId) {
        return res.send({ msg: 'Something went wrong. Please try again later.' })
    }
    // if (reactType !== 'like' || reactType !== 'dislike') { this line is the problem
    //     return res.send('Unauthorized access request.')
    // }
    const dataToInsert = {
        postId: postId,
        userId: userId,
        likedAt: new Date(),
    }
    const insert = dataInserter.insertData('likes', dataToInsert)
    if (insert) {
        res.send({ msg: 'Thank you for your interaction' })
    }
})

module.exports = insert;
