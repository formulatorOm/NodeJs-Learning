import dgram from "node:dgram"; // UDP
import net from "node:net";      // TCP
import http from "node:http";
import https from "node:https";
import dns from "node:dns";
import os from "node:os";
import { createWriteStream } from "node:fs";

const networkInterface = os.networkInterfaces();
console.log(networkInterface);

//.........................
//Creating a UDP server in NODEJS
const socket = dgram.createSocket("udp4");
console.log(socket);

//..........................SOCKET
//File transfer in UDP
const writeStream = createWriteStream("numbers.mp4");

socket.on("message", (message, remoteAddress) => {
    const text = message.toString();
    console.log(text);
    console.log(remoteAddress);

    if (text === "EOF") {
        socket.send(
            "File Upload Successfully on the server",
            remoteAddress.port,
            remoteAddress.address
        );
    } else {
        writeStream.write(message);
        socket.send(
            "Message Received Successfully on Server",
            remoteAddress.port,
            remoteAddress.address
        );
    }
});

socket.bind({ port: 4000 }, () => {
    const address = socket.address();
    console.log(address);
    console.log(`listening on port ${address.port}`);
});
