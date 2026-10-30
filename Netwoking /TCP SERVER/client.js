import net from "node:net";

const socket = net.createConnection({ host: "127.0.0.1", port: 4000 });

setTimeout(() => {
    socket.write("hi");
}, 2000);

socket.on("data", (chunk) => {
    console.log(chunk.toString());
});
