"use strict"
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let MAX_FRAME_RATE = 120, // frames per second
    FRAME_DIFF = 1000 / MAX_FRAME_RATE, 
    lastDraw = 0;

//Кнопки
let leftBtn = document.getElementById("leftBtn"), 
    rightBtn = document.getElementById("rightBtn"), 
    upBtn = document.getElementById("upBtn"),
    downBtn = document.getElementById("downBtn");

//Статы игрока(шарика)>Position and Physical<
//Физические характеристики
let speedY = 0,
    speedX = 0,
    radius = 20,
    speedMax = 10,
    gravity = 10,
    jumpForce = -2, 
    ax = 0.1,
    axMax = 2,
    ay = gravity;

//Вектор
let showVector = false;

//Позиция
let x = canvas.width - 72,
    y = canvas.height - radius;

//Состояние, когда шарик на полу
let isGround = true;

function showVec(){
  showVector = !showVector;
}

//Кнопки
function controle() {
  leftBtn.addEventListener('click', 
    function left() {
      ax -= 0.7;
    });
  rightBtn.addEventListener('click',
    function right() {
      ax += 0.7;
    });
  upBtn.addEventListener('click',
    function jump() {
      if(isGround==true){
        speedY=0;
        ay = jumpForce;
      }
    });
  downBtn.addEventListener('click',
    function brake() {
      ax = 0;
    });
  document.addEventListener("keydown",
    function(event)
    {
      if (event.code == "KeyA"){
        ax -= 0.7;
      }
      if (event.code == "KeyD") {
        ax += 0.7;
      }
      if (event.code == "KeyW") {
        if(isGround==true){
          speedY=0;
          ay = jumpForce;
        }
      }
      if (event.code == "KeyS") {
        ax = 0;
      }
    });
}

//Звуки
function playSoundCollision(){
  let soundCollision = new Audio('./Sounds/ballCollision.mp3');
  soundCollision.play();
}

//Проверка столкновений и воспроизведение звука при столкновении
function detectCollision(){
  if(x <= 0 + radius)
  {
    //playSoundCollision();
    ax = -(ax - ax * 0.8);
    speedX = -(speedX - speedX * 0.4);
    x = radius + 1;
  }
  
  if (x >= canvas.width - radius)
  {
    //playSoundCollision();
    ax = -(ax - ax * 0.8);
    speedX = -(speedX - speedX * 0.4);
    x = canvas.width - radius - 1;
  }
  
  if (y <= 0 + radius)
  {
    y = radius;
  }
  if (y >= canvas.height - radius && isGround == false)
  {
    //playSoundCollision();
  }
  
  if (y >= canvas.height - radius)
  {
    isGround = true;
    y = canvas.height-radius;
  }
  if (y < canvas.height - radius)
  {
    isGround = false;
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
  if(ax > 0){ax-= 0.05;}
  if(ax < 0){ax+= 0.05;}
  if(ay < gravity){ay += 0.1;}
}

//Отрисовка статы(для разработчиков)
function drawUpdate(){
  ctx.fillStyle = "black";
  ctx.font = "bold 20pt Arial";
  ctx.fillText("Version:   0.0.1", 750, 25);
  ctx.fillText(">Update physic", 750, 50);
}

function drawStats() {
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
  ctx.strokeStyle = 'black';
  ctx.stroke();
  move();    
}

function drawVector(type){
  let vx = speedX * 15;
  let vy = speedY * 15;
  if(x + vx >= canvas.width - radius){vx = canvas.width - x - 1;}
  if(x + vx <= radius){vx = 1 - x;}
  if (y + vy >= canvas.height - radius) { vy = canvas.height - y - 1;}
  if(type == true){
    drawStats();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + vx, y);
    ctx.moveTo(x + vx * 0.8, y - vx / 15);
    ctx.lineTo(x + vx, y);
    ctx.moveTo(x + vx * 0.8, y + vx / 15);
    ctx.lineTo(x + vx, y);
    ctx.closePath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + vy);
    ctx.moveTo(x - vy / 15, y + vy * 0.8);
    ctx.lineTo(x, y + vy);
    ctx.moveTo(x + vy / 15, y + vy * 0.8);
    ctx.lineTo(x, y + vy);
    ctx.closePath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'green';
    ctx.stroke();
  }
}

//Главная функция
function main() {
  let now = Date.now(),
  diff = now - lastDraw;

  if (diff >= FRAME_DIFF) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    controle();
    drawUpdate();
    drawVector(showVector);
    drawPlayer();

    lastDraw = now;
  }
    requestAnimationFrame(main);
}

main();