 import net from "node:net";

 const server = net.createServer();

 server.listen(4000, "0.0.0.0" , () =>{
    console.log("Server stated on port 4000");
 })

 server.on("connection" , (socket) =>{
    socket.on("data" , (chunk) =>{
        console.log(chunk.toString());
        socket.write("HTTP\n\nGot Your Message");
        socket.end();
    });
    socket.on("close" , () =>{
        console.log(socket.remoteAddress, " : Client disconnected");

    })
    console.log("client Connected" , socket.remoteAddress)
 })