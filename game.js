"use strict"
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
 
// Статы игрока(шарика)-->Позиция и физические характеристики<--
//Позиция
let y = canvas.height / 2;
let x = canvas.width - 72;

//Физические характеристики
let speedY = 0;
let speedX = 0;
let radius = 20;
let speedMax = 10;
let gravity = 10;
let jumpForce = -2;
let ax = 0.1;
let axMax = 2;
let ay = 1;

//Кнопки
function left() {ax -= 0.7;}
function right(){ax += 0.7;}
function jump() {speedY=0;ay = jumpForce;}
function brake() {}

//Звуки
function playSoundCollision(){
  let soundCollision = new Audio('./Sounds/ballCollision.mp3');
  soundCollision.play();
}

//Проверка столкновений и воспроизведение звука при столкновении
function detectCollision(){
  if(x <= 0 + radius)
  {
    playSoundCollision();
    ax = -(ax - ax * 0.6);
    speedX = -(speedX - speedX * 0.4);
    x = radius + 1;
  }
  
  if (x >= canvas.width - radius)
  {
    playSoundCollision();
    ax = -(ax - ax * 0.6);
    speedX = -(speedX - speedX * 0.4);
    x = canvas.width - radius - 1;
  }
  
  if (y <= 0 + radius)
  {
    y = radius;
  }
  
  if (y >= canvas.height - radius)
  {
    y = canvas.height-radius;
  }
}

//Движение
function move(){
  if(ax>axMax){ax=axMax;}
  if(ax<-axMax){ax=-axMax;}
  speedX += ax;
  speedY += ay;
  if(speedX > speedMax){speedX=speedMax;}
  if(speedX < -speedMax){speedX=-speedMax;}
  if(speedY > gravity){speedY = gravity;}
  if(speedY > gravity){speedY = gravity;}
  if(speedY < -5){speedY = -5;}
  x += speedX;
  y += speedY;
  detectCollision();
  if(speedX.toFixed()== 0){speedX = 0;}
  if(speedX > 0){speedX-=0.2;}
  if(speedX < 0){speedX+=0.2;}
  if(speedY < 10) {speedY += 0.2;}
  if(ax.toFixed()== 0){ax = 0;}
  if(ax > 0){ax-= 0.03;}
  if(ax < 0){ax+= 0.03;}
  if(ay < gravity){ay += 0.05;}
}

//Отрисовка статы(для разработчиков)
function drawStats(){
  ctx.fillStyle = "black";
  ctx.font = "bold 20pt Arial";
  ctx.fillText("SPEED-X: " + speedX.toFixed(2), 10, 25);
  ctx.fillText("AX: " + ax.toFixed(2), 220, 25);
  ctx.fillText("X: " + x.toFixed() + " Y: " + y.toFixed(), 10, 75);
  ctx.fillText("SPEED-Y: " + speedY.toFixed(2), 10, 50);
  ctx.fillText("AY: " + ay.toFixed(2), 220, 50);
}

//Отрисовываем игрока
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

//Главная функция
function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStats();
    drawPlayer();
    requestAnimationFrame(main);
}

main();