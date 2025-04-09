const express = require("express");
const DataFetcher = require("../controllers/Users/users");
const followingUsersPost = express.Router();
const fetch = new DataFetcher();

followingUsersPost.get('/followed-user-posts', async (req, res) => {
    try {
        const followers = await fetch.fetchData('SELECT * FROM followers', []);
        const postsPromises = followers.map(async (follower) => {
            const post1 = await fetch.fetchRelationalData('SELECT * FROM questions ');
            const post2 = await fetch.fetchRelationalData('SELECT * FROM questions ');
            const post3 = await fetch.fetchRelationalData('SELECT * FROM questions ');
            return { post1, post2, post3 };
        });
        const allPosts = await Promise.all(postsPromises)
        const flatPosts = allPosts.flat();

        res.send(flatPosts);

    } catch (e) {
        console.error('Error fetching users:', e);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

followingUsersPost.post('/follow-user/:userId', async (req, res) => {
    if (!req.params) {
        return res.send({ msg: 'Something went wrong. Please try again later.' })
    }
    try {
        const dataToInsert = {
            followedUserId: 'followedUserId',
            followingUserId: 'clicked to follow user account id',
            followedAt: new Date(),
        }
        const insert = fetch.insertData('followers', dataToInsert)
        if(insert){
            console.log('follow successful');
            return res.send({msg: 'Following you will receive posts in your feed.'})
        }
    } catch (e) {
        throw e;
    }
})

module.exports = followingUsersPost;