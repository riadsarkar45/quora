const express = require("express");
const DataFetcher = require("../controllers/Users/users");
const followingUsersPost = express.Router();
const fetch = new DataFetcher();

followingUsersPost.get('/followed-user-posts/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const followers = await fetch.fetchData('SELECT * FROM followers WHERE "followerId" = $1', [req.params.id]);
        if (!followers.length) {
            return res.status(404).json({ error: 'No followers found' });
        }
        const postsPromises = followers.map(async (follower) => {
            const following = await fetch.fetchRelationalData(
                'SELECT * FROM questions WHERE "userId" = $1',
                [follower?.followingId]
            );
            const questionsWithUserData = Promise.all(
                following?.map(async(user) => {
                    const userData = await fetch.fetchRelationalData('SELECT name FROM users WHERE "userId" = $1', [user?.userId])
                    console.log(userData);
                    return {
                        ...user,
                        userName: userData[1] || "Undefined",
                    }
                })

                
            )
            return questionsWithUserData;
        });
        const allPosts = await Promise.all(postsPromises);
        const flatPosts = allPosts.flat(); 
        console.log(flatPosts, 'questions');
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
            followingId: 'clicked user id',
            followerId: 'logged in user id',
            followedAt: new Date(),
        }
        const insert = fetch.insertData('followers', dataToInsert)
        if (insert) {
            console.log('follow successful');
            return res.send({ msg: 'Following you will receive posts in your feed.' })
        }
    } catch (e) {
        throw e;
    }
})

module.exports = followingUsersPost;