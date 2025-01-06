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
let speed = 2;
let deltaTime = 0;
let ax = 0.3;
let timer;

let isLeft = false;
let isRight = false;

let mass = 1;
const g = 9.8;
let weight = mass * g;

let leftBtn = document.getElementById("leftBtn");

function left() {directionX = -1;}
function right(){directionX = 1;}
function jump() {}
function brake() {
  directionX = 0;
  while(speedX > 0){speedX-= 0.01;}
}

function move(){
  speedX += ax * directionX;
  speedY = weight * 1;
  x += speedX;
  y += speedY;
  if(directionX > 0){directionX-=0.05;}
  if(directionX < 0){directionX+=0.05;}
  if(speedX > 0){speedX-=0.05;}
  detectCollision();
}

function detectCollision(){
  if(x <= 0 + radius)
  {
    speedX = 0;
    x = 0 + radius;
  }
  if (x >= canvas.width - radius)
  {
    speedX = 0;
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