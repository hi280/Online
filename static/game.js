const socket = io()

const WINDOW_WIDTH = 800;
const WINDOW_HIGHT = 600;

const canvas = document.getElementById("canvas")
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HIGHT;
const context = canvas.getContext("2d")
socket.emit("new player");
class Player{
    constructor(props){
        this.name = props.name;
        this.id = props.id;
        this._playerRadius = 30;

        this.positionX = 300;
        this.positionY = 300
    }
}
const player = new Player({
    id: socket.id,
    name: "You",
})

socket.on("state", (players) =>{
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0,0, WINDOW_WIDTH, WINDOW_HIGHT)
    context.closePath();
    for(const id in players){
        if(id != socket.id){
            const player = players[id]
            drawPlayer(context,player)
        }
    }
    if(player && socket){
        const data = getMove()
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
        socket.emit("position", player);
        drawPlayer(context, player)
    }
});