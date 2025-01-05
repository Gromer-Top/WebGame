"use strict"
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
 
let y = canvas.height / 2;
let x = canvas.width / 2;
let directionX = 0;
let directionY = 0;
let gravity = 2;
let speedY = 0;
let speedX = 0;
let radius = 20;
let speed = 3;

let mass = 1;
const g = 9.8;
let weight = mass * g;

function left() {directionX = -1;}
function right(){directionX = 1;}
function jump() {}

function move(){
  speedX = speed * directionX;
  speedY = weight;
  x += speedX;
  y += speedY;
  detectCollision();
  console.log("DirectionY: " + directionY);
  console.log("DirectionX: " + directionX);
}

function detectCollision(){
  if(x <= 0 + radius)
  {
    directionX = 0;
    x = 0 +radius;
  }
  if (x >= canvas.width - radius)
  {
    directionX = 0;
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
    y = canvas.height - radius;
  }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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