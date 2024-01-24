const canvas = document.getElementById("airplainFighterTableCt");
const ctx = canvas.getContext("2d");

const countDestroiedObjectsElm = document.getElementById("countDestroiedObjects");
const countAvoidedRocksElm = document.getElementById("countAvoidedRocks");

const gameOverScreen = document.getElementById("gameOverScreen");
const restartBtn = document.getElementById("restartGame");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const playerImg = new Image();
playerImg.src = "./image/airplain.png";

const bulletImg = new Image();
bulletImg.src = "./image/bullet.png";

const enemyImg = new Image();
enemyImg.src = "./image/asteroid_enemy.png";

const explosion = new Image();
explosion.src = "./image/explosion.png";

// Player properties
let playerX = canvas.width / 2;
const playerY = canvas.height - 50;
const playerSpeed = 15;

// Bullet properties
let bulletX = playerX;
let bulletY = playerY;
const bulletSpeed = 8;
let isBulletFired = false;

// Enemy properties
let enemyX = 50;
let enemyY = 0;
const enemySpeed = 2;

let drawExplosionSlow = false;
let countAvoidedObjects = 0;
let countDestroiedObjects = 0;
let isGameOver = false;

function drawPlayer() {
    ctx.drawImage(playerImg, playerX - 40, playerY - 40, 80, 80);
}

function drawBullet() {
    ctx.drawImage(bulletImg, bulletX - 2, bulletY, 4, 10);
}

function drawEnemy() {
    ctx.drawImage(enemyImg, enemyX, enemyY, 40, 40);
}

function drawExplosion() {
    ctx.drawImage(explosion, bulletX - 15, bulletY - 20, 100, 100);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function countScores(countDestroiedObjects, countAvoidedObjects) {
    countDestroiedObjectsElm.innerHTML = "";
    countAvoidedRocksElm.innerHTML = "";
    countDestroiedObjectsElm.innerHTML += "Destroied objects: " + countDestroiedObjects;
    countAvoidedRocksElm.innerHTML += "Avoided objects: " + countAvoidedObjects;
}

function enemyBehavior() {
    if (enemyY > canvas.height) {
        enemyY = 0;
        countAvoidedObjects += 1;

        countScores(countDestroiedObjects, countAvoidedObjects)

        let enemyRandomX = getRandomInt(0, canvas.width);

        if (enemyRandomX >= canvas.width) {
            enemyRandomX - enemy.width
        } else if (enemyRandomX <= canvas.width) {
            enemyRandomX - 40
        }

        enemyX = enemyRandomX;
    }
}

function bulletBehavior() {
    if (isBulletFired) {
        ctx.clearRect(bulletX, bulletY, 10, 20);

        bulletY -= bulletSpeed;
        drawBullet();

        if (bulletY <= 0) {
            isBulletFired = false;
            bulletY = playerY;
        }

        if (
            bulletX < enemyX + 40 &&
            bulletX + 4 > enemyX &&
            bulletY < enemyY + 40 &&
            bulletY + 10 > enemyY
        ) {
            countDestroiedObjects += 1;
            countScores(countDestroiedObjects, countAvoidedObjects);

            enemyX = Math.random() * (canvas.width - 40);
            enemyY = -40;
            drawExplosionSlow = true;
            drawExplosion();

            isBulletFired = false;
            bulletY = playerY;
        }
    }
}

function playerBehavior() {
    if (
        playerX < enemyX + 80 &&
        playerX + 80 > enemyX &&
        playerY < enemyY + 80 &&
        playerY + 80 > enemyY
    ) {
        ctx.drawImage(explosion, enemyX - 15, enemyY - 20, 100, 100);
        isGameOver = true;
        gameOverScreen.style.display = "flex";
    }
}

function gameOverBehavior() {
    if (!isGameOver) {
        gameOverScreen.style.display = "none";
        enemyY += enemySpeed;

        if (drawExplosionSlow) {
            setTimeout(() => {
                requestAnimationFrame(update);
            }, 150);
            drawExplosionSlow = false;
        } else {
            requestAnimationFrame(update);
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    enemyBehavior();
    bulletBehavior();
    playerBehavior();
    drawEnemy();
    gameOverBehavior();
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerX - playerSpeed >= 0) {
        playerX -= playerSpeed;
    } else if (e.key === 'ArrowRight' && playerX + playerSpeed <= canvas.width) {
        playerX += playerSpeed;
    } else if (e.key === ' ') {
        isBulletFired = true;
        bulletX = playerX;
    }
});

restartBtn.addEventListener("click", function () {
    location.reload();
});

update();