import dgam from "node:dgram"; // UDP
import  net from "node:net"//TCP
import http from "node:http";
import https from "node:https"
import dns from "node:dns";

import os from 'node:os'
const networkInterface = os.networkInterfaces();
console.log(networkInterface);

//.........................
//Creating a UDP server in NODEJS
const socket = dgram.createSocket("udp4");
console.log(socket);
socket.on('message' , (message , remoteAddress) =>{
    console.log(message.toString());
    console.log(remoteAddress);
    
    socket.send('Message Received Successfully')
})
socket.send("message Received Successfully on Server " , 
    remoteAddress.port,
    remoteAddress.address
)
socket.bind({ port : 4000,} , () =>{
    console.log(socket.address());
    console.log(`listening on port ${address.port}`);

});

//..........................SOCKET
 
//File transfer in UDP

const writeStream = createWriteStream("numbers.mp4")
socket.on("message", async(message ,remoteAddress)=>{
    if(message.toString() === "EOF"){
        socket.send(
            "File Upload Successfully on the server",
            remoteAddress.port,
            remoteAddress.address
        )

    }else{
        writeStream.write(message);

    }
});
socket.bind({port: 4000} , () =>{
    console.log(socket.address());
    const addres = socket.address();
    console.log(`Listening on port ${addres.port}`);

});
