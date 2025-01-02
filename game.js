const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let x = 0;

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'red';
    context.fillRect(x, 100, 50, 50);
    x += 10;
    requestAnimationFrame(gameLoop);
    if (x > canvas.width+50) x=-100
}

gameLoop();