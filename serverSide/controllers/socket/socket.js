const { Server } = require("socket.io");

class SocketConnection {
    constructor() {
        this.io = null;
        this.isConnected = new Map();
    }

    socketConnect(server) {
        if (this.io) {
            console.log('WebSocket already initialized');
            return this.io;
        }

        this.io = new Server(server, {
            cors: { origin: "*" }
        });

        this.io.on("connection", (socket) => {
            this.isConnected.set(socket.id, socket.id);
            console.log("Connected clients:", this.isConnected);

            socket.on('response', (data) => {
                const { name, type, message, to } = data || {};
                this.sendResponseToTheClient(to, data);
            });

            socket.on("disconnect", () => {
                console.log(`Client disconnected: ${socket.id}`);
                this.isConnected.delete(socket.id);
            });
        });

        return this.io;
    }

    sendResponseToTheClient(sendToId, data) {
        if (!this.isConnected.has(sendToId)) {
            console.log(`🚨 Receiver ID not found: ${sendToId}`);
            return;
        }

        this.io.to(sendToId).emit('response', {
            type: 'success',
            data: data
        });

        console.log(`📤 Sent response to ${sendToId}`);
    }

    getIo() {
        if (!this.io) {
            throw new Error("WebSocket not initialized. Call `socketConnect(server)` first.");
        }
        return this.io;
    }
}

module.exports = SocketConnection;
