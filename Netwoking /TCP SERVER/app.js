import net from "node:net";

// Create a TCP server instance
// A TCP server listens for incoming stream-based connections from clients.
const server = net.createServer();

const PORT = 4000;
const HOST = "0.0.0.0"; // Listen on all network interfaces (localhost + LAN)

server.listen(PORT, HOST, () => {
    console.log(`[TCP Server] Listening on ${HOST}:${PORT}`);
});

// Fired each time a new client establishes a 3-way handshake connection
server.on("connection", (socket) => {
    const clientEndpoint = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`[TCP Server] Client connected: ${clientEndpoint}`);

    // Fired when data chunks arrive from the client socket stream
    socket.on("data", (chunk) => {
        console.log(`[TCP Server] Received from ${clientEndpoint}: "${chunk.toString().trim()}"`);

        // Send a response back through the TCP socket stream
        socket.write("Server response: Got your message over TCP!\n");

        // Gracefully close the write side of the socket (sends FIN packet)
        socket.end();
    });

    // Fired when the client disconnects or socket finishes closing
    socket.on("close", () => {
        console.log(`[TCP Server] Client disconnected: ${clientEndpoint}`);
    });

    // Handle any socket errors (e.g. client abrupt reset ECONNRESET)
    socket.on("error", (err) => {
        console.error(`[TCP Server] Socket error on ${clientEndpoint}:`, err.message);
    });
});

server.on("error", (err) => {
    console.error("[TCP Server] Server error:", err.message);
});