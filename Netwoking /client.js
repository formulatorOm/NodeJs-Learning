import dgram from "node:dgram";
import { createReadStream, existsSync } from "node:fs";

// Create an IPv4 UDP socket
const socket = dgram.createSocket("udp4");

const SERVER_HOST = "127.0.0.1"; // Default localhost (or change to LAN IP e.g. 192.168.0.105)
const SERVER_PORT = 4000;
const FILE_SERVER_PORT = 4001;

// -------------------------------------------------------------
// 1. Send Simple Text Datagram
// -------------------------------------------------------------
socket.on("message", (message, remoteAddress) => {
    console.log(`[Client] Server replied: "${message.toString()}"`);
    console.log(`[Client] From: ${remoteAddress.address}:${remoteAddress.port}`);
});

const msg = Buffer.from("Hi from Client Laptop!");
socket.send(msg, SERVER_PORT, SERVER_HOST, (err) => {
    if (err) {
        console.error("Send error:", err);
    } else {
        console.log(`[Client] Datagram sent to ${SERVER_HOST}:${SERVER_PORT}`);
    }
});

// -------------------------------------------------------------
// 2. Stream File in Chunks over UDP with EOF
// -------------------------------------------------------------
// When sending a file over UDP, chunks must fit within the network MTU
// (Maximum Transmission Unit, typically 1500 bytes on Ethernet, safe UDP payload <= 1400 bytes).
const testFile = "numbers.txt";

if (existsSync(testFile)) {
    const readStream = createReadStream(testFile, { highWaterMark: 1000 });

    readStream.on("data", (chunk) => {
        socket.send(chunk, FILE_SERVER_PORT, SERVER_HOST);
    });

    readStream.on("end", () => {
        // Send EOF signal to inform the server that the upload is complete
        socket.send("EOF", FILE_SERVER_PORT, SERVER_HOST, () => {
            console.log("[Client] File streamed successfully and EOF sent!");
        });
    });
}