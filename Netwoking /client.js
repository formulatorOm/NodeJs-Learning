import dgram from "node:dgram";
import  {createReadStream} from "node:fs";
import {readFile} from "node:fs/promises";

const socket= dgram.createSocket("udp4");



socket.on("message", (message, remoteAddress) =>{
    console.log(message.toString())
    console.log(remoteAddress)

})
socket.send("Hi from Lap" , 4000, "192.168.87.41")

//........
socket.on("message", (message , remoteAddress) =>{
    console.log(message.toString());
    console.log(remoteAddress)
    socket.close();
})

const readStream = createReadStream(
    "path",
    {highWaterMark : 1000}
);

readStream.on("data" , (chunk) =>{
    socket.send(chunk , 400 , "192.168.0,105");
})
readStream.on("end" , () =>{
    socket.send("EOF" , 4000 , "192.168.0.105" , () =>{
        console.log("message sent")
    })
})