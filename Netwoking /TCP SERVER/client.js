import net from "node:net";

const socket = net.createConnection({host:"192.168.0.105" , port:4000});

setTimeout(() => {
    socket.write("hi");
}, 2000);
socket.on("data" , (chunk)=>{
    console.log(chunk.toString());

})
