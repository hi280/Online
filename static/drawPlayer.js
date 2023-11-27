const drawPlayer = (context, player)=>{
    const playerX = player.positionX;
    const playerY = player.positionY;

    context.beginPath();
    context.fillStyle = "red"
    context.font = "20px sans-serif";
    context.fillText(player.name, playerX -35,playerY -50)
    context.closePath();

    context.beginPath();
    context.strokeStyle = "white";
    context.lineWidth = 10
    context.arc(playerX,playerY, player._playerRadius, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
}