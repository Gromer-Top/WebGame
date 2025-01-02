"use strict"
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let x = 0;
let speed = 10;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, canvas.height/2, 50, 0, 2*Math.PI, false) ;
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    x += speed;
    requestAnimationFrame(gameLoop);
    if (x > canvas.width+50) x=-100
}

gameLoop();