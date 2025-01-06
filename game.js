"use strict"
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
 
let y = canvas.height / 2;
let x = canvas.width - 50;
let directionX = 0;
let directionY = 0;
let gravity = 2;
let speedY = 0;
let speedX = 0;
let radius = 20;
let ax = 0.1;

let mass = 0.5;
const ay = 9.8;
let weight = mass * ay;

let leftBtn = document.getElementById("leftBtn");

function left() {directionX = -1;ax += 0.7;}
function right(){directionX = 1;ax += 0.7;}
function jump() {}
function brake() {

}

function playSoundCollision(){
  let soundCollision = new Audio('./Sounds/ballCollision.mp3');
  soundCollision.play();
}

function detectCollision(){
  if(x <= 0 + radius)
  {
    playSoundCollision();
    directionX = 1;
    speedX -= speedX * 0.7;
    x = radius;
  }
  if (x >= canvas.width - radius)
  {
    playSoundCollision();
    directionX = -1;
    speedX -= speedX * 0.7;
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
  
  speedX += ax;
  speedY = weight;
  x += speedX * directionX;
  y += speedY;
  detectCollision();
  if(speedX.toFixed()== 0){speedX = 0;}
  if(speedX > 0){speedX-=0.2;}
  if(speedX < 0){speedX+=0.2;}
  if(ax > 0){ax-= 0.03;}
  if(ax < 0){ax=0;}
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "bold 20pt Arial";
    ctx.fillText("Speed: " + speedX.toFixed(2), 10, 25);
    ctx.fillText("ax: " + ax.toFixed(2), 170, 25);
    ctx.fillText("DX: " + directionX.toFixed(2), 10, 50);
    ctx.fillText("x: " + x.toFixed(), 140, 50);
    ctx.fillText("y: " + y.toFixed(), 220, 50);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI, false) ;
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    move();    
    requestAnimationFrame(gameLoop);
}

gameLoop();