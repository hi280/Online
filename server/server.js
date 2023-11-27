const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const getPlayers = require("./player").getPlayers;

const app = express();
const server = http.Server(app)
const io = socketIO(server)

const PORT = process.env.PORT || 5000

app.set("port", PORT);
app.use("/static", express.static(path.dirname(__dirname) + "/static"));

app.get("/", (require, response) => {
    response.sendFile(path.join(path.join(__dirname), "index.html"));
});

server.listen(PORT, ()=>{
    console.log("Starting server on port " + PORT);
});

let players = null;
let count = 1;
io.on("connection", (socket)=>{
    players = getPlayers(socket)
    console.log("conected " + socket.id)
})

const gameLoop = (players, io) =>{
    io.sockets.emit("state", players);
}

setInterval(() =>{
    if(players && io){
        gameLoop(players,io)
    }
}, 1000/60)