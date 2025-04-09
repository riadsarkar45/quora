const express = require("express");
const DataFetcher = require("../controllers/Users/users");
const followingUsersPost = express.Router();
const fetch = new DataFetcher();

followingUsersPost.get('/followed-user-posts', async (req, res) => {
    try {
        const data = await fetch.fetchData('SELECT * FROM followers', []);
        console.log(data);
        res.send(data)

    } catch (e) {
        console.error('Error fetching users:', e);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

module.exports = followingUsersPost;