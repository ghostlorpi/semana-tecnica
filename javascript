const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const ballRadius = 10;
const paddleWidth = 10;
const paddleHeight = 100;
let upArrowPressed = false;
let downArrowPressed = false;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 5,
    dy: 5,
    speed: 7,
    directionX: 1,
    directionY: 1,
};

const leftPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 4,
};

const rightPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 4,
};

function drawBackground() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function drawPaddles() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);
}

function moveBall() {
    ball.x += ball.dx * ball.directionX;
    ball.y += ball.dy * ball.directionY;
}

    if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
        ball.directionY = -ball.directionY; 
    }

    if (ball.x + ballRadius > canvas.width) {
        leftPaddle.y = canvas.height / 2 - paddleHeight / 2;
        rightPaddle.y = canvas.height / 2 - paddleHeight / 2; 
        ball.x = canvas.width / 2; 
        ball.y = canvas.height / 2;
        ball.directionX = -ball.directionX; 
    }
    
    if (ball.x - ballRadius < leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) {
        ball.directionX = -ball.directionX; 

    if (ball.x + ballRadius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight) {
        ball.directionX = -ball.directionX; 
    }
}

function movePaddles() {
    if (upArrowPressed && rightPaddle.y > 0) {
        rightPaddle.y -= rightPaddle.dy; 
    }

    if (downArrowPressed && rightPaddle.y < canvas.height - paddleHeight) {
        rightPaddle.y += rightPaddle.dy; 
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        upArrowPressed = true;
    }
    if (event.key === "ArrowDown") {
        downArrowPressed = true;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowUp") {
        upArrowPressed = false;
    }
    if (event.key === "ArrowDown") {
        downArrowPressed = false;
    }
});

function update() {
    drawBackground();
    drawBall();
    drawPaddles();
    moveBall();
    movePaddles();
}
    requestAnimationFrame(update); 

update();
