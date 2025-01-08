"use strict"
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
 
let y = canvas.height / 2;
let x = canvas.width - 72;
let directionX = 0;
let directionY = 0;
let speedY = 0;
let speedX = 0;
let radius = 20;
let speedMax = 10;
let ax = 0.1;
let axMax = 2;
let ay = 1;

function left() {directionX = -1;ax += 0.7;}
function right(){directionX = 1;ax += 0.7;}
function jump() {}
function brake() {}

function playSoundCollision(){
  let soundCollision = new Audio('./Sounds/ballCollision.mp3');
  soundCollision.play();
}


function detectCollision(){
  if(x <= 0 + radius)
  {
    playSoundCollision();
    directionX = 1;
    ax -= ax * 0.6;
    speedX -= speedX * 0.8;
    x = radius;
  }
  if (x >= canvas.width - radius)
  {
    playSoundCollision();
    directionX = -1;
    ax -= ax * 0.6;
    speedX -= speedX * 0.8;
    x = canvas.width - radius;
  }
  if (y <= 0 + radius)
  {
    directionY = 0;
    y = 0 + radius;
  }
  if (y >= canvas.height - radius)
  {
    directionY = 0;
    y = canvas.height-radius;
  }
}

function move(){
  if(ax>axMax){ax=axMax;}
  speedX += ax;
  if(speedX > speedMax){speedX=speedMax;}
  speedY += ay;
  x += speedX * directionX;
  y += speedY;
  detectCollision();
  if(speedX.toFixed()== 0){speedX = 0;}
  if(speedX > 0){speedX-=0.2;}
  if(speedX < 0){speedX+=0.2;}
  if(ax > 0){ax-= 0.03;}
  if(ax < 0){ax=0;}
}

function drawStats(){
  ctx.fillStyle = "black";
  ctx.font = "bold 20pt Arial";
  ctx.fillText("Speed: " + speedX.toFixed(2), 10, 25);
    ctx.fillText("Ax: " + ax.toFixed(2), 200, 25);
    ctx.fillText("DX: " + directionX.toFixed(2), 390, 25);
    ctx.fillText("x: " + x.toFixed() + " y: " + y.toFixed(), 10, 50);
}

function drawPlayer(){
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2*Math.PI, false) ;
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'red';
  ctx.stroke();
  move();    
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStats();
    drawPlayer();
    requestAnimationFrame(main);
}

main();