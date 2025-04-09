const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const users = require("./Routes/users");
const SocketConnection = require("./controllers/socket/socket");
const insert = require("./Routes/post");
const followingUsersPost = require("./Routes/followUser");
const server = http.createServer(app);
const connect = new SocketConnection();
connect.socketConnect(server);


app.use(express.json()); 


app.use(
    cors({
        origin: "*", 
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use("/api", users);
app.use("/api", insert);
app.use("/api", followingUsersPost);

app.get("/", (req, res) => {
    res.send("Welcome to the Express API!");
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
