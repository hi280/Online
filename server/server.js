const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const getPlayers = require("./player").getPlayers;

const app = express();
const server = http.Server(app)
const io = socketIO(server)

app.set("port", 5000);
app.use("/static", express.static(path.dirname(__dirname) + "/static"));

app.get("/", (require, response) => {
    response.sendFile(path.join(path.join(__dirname), "index.html"));
});

server.listen(5000, ()=>{
    console.log("Starting server on port 5000");
});
let players = null;
let count = 1;
io.on("connection", (socket)=>{
    players = getPlayers(socket)
    setTimeout(() => {
        console.log(players);
    }, 100);
})

const gameLoop = (players, io) =>{
    io.sockets.emit("state", players);
}

setInterval(() =>{
    if(players && io){
        gameLoop(players,io)
    }
}, 1000/60)