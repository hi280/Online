const players = {}

class Player{
    constructor(props){
        this.name = props.name;
        this.id = props.id;
        this._playerRadius = 30;

        this.positionX = 300;
        this.positionY = 300
    }
}

module.exports.getPlayers = (socket) =>{
    socket.on("new player", ()=>{
        players[socket.id] = new Player({
            id: socket.id,
            name: "Player "+Object.keys(players).length,
        })
    });
    socket.on("position",data=>{
        const player = players[socket.id] || {};
        player.positionX = data.positionX
        player.positionY = data.positionY
    })
    socket.on("disconnect", () =>{
        console.log("disconected " + socket.id)
        delete players[socket.id]
    })
    return players;
}