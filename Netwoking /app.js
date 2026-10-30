import dgram from "node:dgram"; // UDP
import net from "node:net";      // TCP
import http from "node:http";
import https from "node:https";
import dns from "node:dns";
import os from "node:os";
import { createWriteStream } from "node:fs";

// -------------------------------------------------------------
// 1. Inspecting Network Interfaces
// -------------------------------------------------------------
// os.networkInterfaces() returns details about each physical and virtual
// network interface (Wi-Fi, Ethernet, loopback) including IP, MAC address, and netmask.
const networkInterface = os.networkInterfaces();
console.log("=== Network Interfaces ===");
console.log(networkInterface);

// -------------------------------------------------------------
// 2. Creating a UDP Server in Node.js (node:dgram)
// -------------------------------------------------------------
// UDP (User Datagram Protocol) is connectionless, fast, and lightweight.
// "udp4" means we are creating an IPv4 datagram socket.
const socket = dgram.createSocket("udp4");

// Listen for incoming datagram packets from clients
socket.on("message", (message, remoteAddress) => {
    console.log(`[UDP Server] Received message: "${message.toString()}"`);
    console.log(`[UDP Server] From: ${remoteAddress.address}:${remoteAddress.port}`);

    // Send a response packet back to the client
    const response = Buffer.from("Message Received Successfully on Server");
    socket.send(response, remoteAddress.port, remoteAddress.address, (err) => {
        if (err) console.error("Error sending response:", err);
    });
});

// Bind socket to port 4000 to start listening
socket.bind({ port: 4000 }, () => {
    const address = socket.address();
    console.log(`[UDP Server] Listening on ${address.address}:${address.port}`);
});

// -------------------------------------------------------------
// 3. File Transfer over UDP with EOF Signaling
// -------------------------------------------------------------
// In UDP, there is no stream connection. Large files are broken into
// small chunks (datagrams). An "EOF" (End Of File) string is sent to indicate completion.
//
// NOTE: To run this file-transfer server, bind to a dedicated port (e.g. 4001)
// to prevent EADDRINUSE conflict with port 4000 above:
const fileSocket = dgram.createSocket("udp4");
const writeStream = createWriteStream("received_file.mp4");

fileSocket.on("message", (message, remoteAddress) => {
    const text = message.toString();

    if (text === "EOF") {
        console.log("[UDP File Server] Received EOF. File transfer complete!");
        writeStream.end();

        fileSocket.send(
            "File Uploaded Successfully on the server",
            remoteAddress.port,
            remoteAddress.address
        );
    } else {
        // Write the binary chunk to the file
        writeStream.write(message);
    }
});

fileSocket.bind({ port: 4001 }, () => {
    const address = fileSocket.address();
    console.log(`[UDP File Server] Listening on port ${address.port}`);
});
