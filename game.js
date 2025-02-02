"use strict"
const startTime = performance.now()
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
let speed = [0, 0],
    position = [0, 0], 
    a = [0, 0],
    aMax = [3, 10], 
    radius = 25,
    speedMax = [10, 10],
    jumpForce = -2;

position[0] = canvas.width - 100;
position[1] = canvas.height - radius;

//Вектор
let showVector = false;

//Состояние, когда шарик на полу
let isGround = true;

function showVec(){
  showVector = !showVector;
}

function moveLeft(){
  a[0] -= 2;
}

function moveRight() {
  a[0] += 2;
}

function moveUp() {
  if(isGround==true){
        speed[1] = 0;
        a[1] = jumpForce;
  }
}

function moveDown() {
  if(!isGround){a[1] += 2;}
}

//Кнопки
function controle() {
  leftBtn.addEventListener('click',moveLeft);
  rightBtn.addEventListener('click',moveRight);
  upBtn.addEventListener('click', moveUp);
  downBtn.addEventListener('click',moveDown);
  document.addEventListener("keydown",
    function(event)
    {
      if (event.code == "KeyA"){
        moveLeft();
      }
      if (event.code == "KeyD") {
        moveRight();
      }
      if (event.code == "KeyW") {
        moveUp();
      }
      if (event.code == "KeyS") {
        moveDown();
      }
    });
}

//Проверка столкновений
function detectCollision(){
  if(position[0] <= 0 + radius)
  {
    a[0] = -(a[0] - a[0] * 0.8);
    speed[0] = -(speed[0] - speed[0] * 0.4);
    position[0] = radius + 1;
  }
  if (position[0] >= canvas.width - radius)
  {
    a[0] = -(a[0] - a[0] * 0.8);
    speed[0] = -(speed[0] - speed[0] * 0.4);
    position[0] = canvas.width - radius - 1;
  }
  if (position[1] <= 0 + radius)
  {
    position[1] = radius;
  }
  if (position[1] >= canvas.height - radius)
  {
    isGround = true;
    position[1] = canvas.height - radius;
  }
  if (position[1] < canvas.height - radius)
  {
    isGround = false;
  }
}

function normalizeSpeed(speed, speedMax){
  if(speed[0] > speedMax[0]){speed[0] = speedMax[0];}
  if(speed[0] < -speedMax[0]){speed[0] = -speedMax[0];}
  if(speed[1] > speedMax[1]){speed[1] = speedMax[1];}
  if(speed[1] < -(speedMax[1] / 2)){speed[1] = -(speedMax[1] / 2);}
  return speed;
}

//Движение
function move(){
  a[0] = normalizeSpeed(a, aMax)[0];
  speed[0] += a[0];
  speed[1] += a[1];
  normalizeSpeed(speed, speedMax);
  position[0] += speed[0];
  position[1] += speed[1];
  detectCollision();
  if(a[0].toFixed()== 0){a[0] = 0;}
  if(speed[0].toFixed() == 0){a[0] == 0;}
  if(speed[0] > 0){a[0] -= 0.2;}
  if(speed[0] < 0){a[0] += 0.2;}
  if(a[0].toFixed() == 0 && speed[0].toFixed() == 0){a[0] = 0;speed[0] = 0;}
  if(a[1] < speedMax[1] && !isGround){a[1] += speedMax[1] / 100;}
  if(isGround){a[1] = 0;speed[1] = 0;}
}

//Отрисовка статы(для разработчиков)
function drawUpdate(){
  ctx.fillStyle = "black";
  ctx.font = "20pt Verdana";
  ctx.fillText("Version:  0.0.2a", 750, 25);
  ctx.fillText("Control: W/A/S/D", 750, 50);
}

function drawStats() {
  ctx.fillStyle = "black";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("SPEED-X: " + speed[0].toFixed(2), 10, 25);
  ctx.fillText("AX: " + a[0].toFixed(2), 220, 25);
  ctx.fillText("X: " + position[0].toFixed() + " Y: " + position[1].toFixed(), 10, 75);
  ctx.fillText("SPEED-Y: " + speed[1].toFixed(2), 10, 50);
  ctx.fillText("AY: " + a[1].toFixed(2), 220, 50);
}

//Отрисовываем игрока
function drawPlayer(){
  ctx.beginPath();
  ctx.arc(position[0], position[1], radius, 0, 2*Math.PI, false) ;
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  move();    
}

function drawVector(type){
  let v = [speed[0] * radius / 2, speed[1] * radius / 2];
  if(position[0] + v[0] >= canvas.width - radius){v[0] = canvas.width - position[0] - 1;}
  if(position[0] + v[0] <= radius){v[0] = 1 - position[0];}
  if (position[1] + v[1] >= canvas.height - radius) { v[1] = canvas.height - position[1] - 1;}
  if(type == true){
    drawStats();
    ctx.beginPath();
    ctx.moveTo(position[0], position[1]);
    ctx.lineTo(position[0] + v[0], position[1]);
    ctx.moveTo(position[0] + v[0] * 0.8, position[1] - v[0] / 15);
    ctx.lineTo(position[0] + v[0], position[1]);
    ctx.lineTo(position[0] + v[0] * 0.8, position[1] + v[0] / 15);
    ctx.lineWidth = radius/5;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(position[0], position[1]);
    ctx.lineTo(position[0], position[1] + v[1]);
    ctx.moveTo(position[0] - v[1] / 15, position[1] + v[1] * 0.8);
    ctx.lineTo(position[0], position[1] + v[1]);
    ctx.lineTo(position[0] + v[1] / 15, position[1] + v[1] * 0.8);
    ctx.closePath();
    ctx.lineWidth = radius/5;
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
console.log(startTime);
main();