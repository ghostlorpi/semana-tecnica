const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const ballRadius = 10;
const paddleWidth = 10;
const paddleHeight = 100;
let upArrowPressed = false;
let downArrowPressed = false;

let pontos = 0;
let pontosIA = 0;

// Objeto da bola
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 5,
    dy: 5,
    speed: 7,
    directionX: 1,
    directionY: 1,
};

// Objetos das raquetes
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

// Funções de desenho
function drawBackground() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById('pontos').innerText = `Pontos: ${pontos}`;
    document.getElementById('pontosIA').innerText = `Pontos Computador: ${pontosIA}`;

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

// Funções de movimento
function moveBall() {
    ball.x += ball.dx * ball.directionX;
    ball.y += ball.dy * ball.directionY;
}

function checkBallCollisions() {
    // Colisão com as bordas superior e inferior
    if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
        ball.directionY = -ball.directionY;
    }

    //Colisão com a raquete esquerda
    if (ball.x - ballRadius < leftPaddle.x + paddleWidth && 
        ball.y > leftPaddle.y && 
        ball.y < leftPaddle.y + paddleHeight) {
        ball.directionX = -ball.directionX;
    }

    // Colisão com a raquete direita
    if (ball.x + ballRadius > rightPaddle.x && 
        ball.y > rightPaddle.y && 
        ball.y < rightPaddle.y + paddleHeight) {
        ball.directionX = -ball.directionX;
    }

    // Pontuação (quando a bola sai pela esquerda ou direita)
    if (ball.x + ballRadius > canvas.width || ball.x - ballRadius < 0) {
        if(ball.x - ballRadius < 0){
            pontos++;
        } else {
            pontosIA++;
        }
        // Reset da bola
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.directionX = -ball.directionX;
        
        // Reset das raquetes
        leftPaddle.y = canvas.height / 2 - paddleHeight / 2;
        rightPaddle.y = canvas.height / 2 - paddleHeight / 2;


    }
}

function movePaddles() {
    // Movimento da raquete direita (setas)
    if (upArrowPressed && rightPaddle.y > 0) {
        rightPaddle.y -= rightPaddle.dy;
    }
    if (downArrowPressed && rightPaddle.y < canvas.height - paddleHeight) {
        rightPaddle.y += rightPaddle.dy;
    }

    // Movimento automático da raquete esquerda (IA simples)
    const leftPaddleCenter = leftPaddle.y + paddleHeight / 2;
    if (leftPaddleCenter < ball.y - 10) {
        leftPaddle.y += leftPaddle.dy;
    } else if (leftPaddleCenter > ball.y + 10) {
        leftPaddle.y -= leftPaddle.dy;
    }

    // Limitar a raquete esquerda dentro da tela
    if (leftPaddle.y < 0) {
        leftPaddle.y = 0;
    } else if (leftPaddle.y > canvas.height - paddleHeight) {
        leftPaddle.y = canvas.height - paddleHeight;
    }
}

// Event listeners para controle
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

// Loop principal do jogo
function update() {
    drawBackground();
    drawBall();
    drawPaddles();
    moveBall();
    checkBallCollisions();
    movePaddles();
    requestAnimationFrame(update);
}

// Iniciar o jogo
update();
