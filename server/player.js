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
            name: Object.keys(players).length,
        })
    });
    socket.on("movement",data=>{
        const player = players[socket.id] || {};
        if(data.left){
            player.positionX-=5;
        }
        if(data.up){
            player.positionY-=5;
        }
        if(data.right){
            player.positionX+=5;
        }
        if(data.down){
            player.positionY+=5;
        }
    })
    socket.on("disconnect", () =>{
        delete players[socket.id]
    })
    return players;
}