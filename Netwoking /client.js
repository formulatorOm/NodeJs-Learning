import dgram from "node:dgram";
import { createReadStream, existsSync } from "node:fs";

const socket = dgram.createSocket("udp4");

socket.on("message", (message, remoteAddress) => {
    console.log(message.toString());
    console.log(remoteAddress);
});

socket.send("Hi from Lap", 4000, "127.0.0.1");

//........
const filePath = existsSync("numbers.txt") ? "numbers.txt" : "chars.txt";

if (existsSync(filePath)) {
    const readStream = createReadStream(filePath, { highWaterMark: 1000 });

    readStream.on("data", (chunk) => {
        socket.send(chunk, 4000, "127.0.0.1");
    });

    readStream.on("end", () => {
        socket.send("EOF", 4000, "127.0.0.1", () => {
            console.log("message sent");
        });
    });
}