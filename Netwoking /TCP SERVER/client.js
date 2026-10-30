import net from "node:net";

// Connect to the TCP Server
// Uses localhost (127.0.0.1) by default; replace with server's LAN IP if running on separate machines.
const HOST = "127.0.0.1";
const PORT = 4000;

console.log(`[TCP Client] Connecting to ${HOST}:${PORT}...`);
const socket = net.createConnection({ host: HOST, port: PORT });

socket.on("connect", () => {
    console.log("[TCP Client] Connected successfully (3-way handshake complete)!");

    // Send payload to the server
    socket.write("Hello from TCP Client!");
});

// Fired when the server sends data back
socket.on("data", (chunk) => {
    console.log("[TCP Client] Received from server:\n", chunk.toString());
});

// Fired when connection is closed
socket.on("close", () => {
    console.log("[TCP Client] Connection closed.");
});

socket.on("error", (err) => {
    console.error("[TCP Client] Error:", err.message);
});
