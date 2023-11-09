let canvas = document.getElementById("airplain_fighter_table_ct");
const restartBtn = document.getElementById("restart_game");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let airplaiPositionX, airplaiPositionY, rockX, rockY, playerWidth = 100, playerHeight = 80, bulletX, bulletY, speed = 400, hitRocks = 0, avoidedRock = 0;
airplaiPositionX = (window.innerWidth / 2) - playerWidth / 2;
airplaiPositionY = (window.innerHeight) - playerHeight;

const TILE = 40;
let rocksToDestroy = 0;

const playerImage = new Image();
playerImage.src = "./image/airplain.png";

const bgImage = new Image();
bgImage.src = "./image/space.png";

const enemy = new Image();
enemy.src = "./image/asteroid_enemy.png";

const gameOver = new Image();
gameOver.src = "./image/game_over.png";

const bullet = new Image();
bullet.src = "./image/bullet.png";

const explosion = new Image();
explosion.src = "./image/explosion.png";

document.getElementById("count_ponits").innerHTML = hitRocks;
document.getElementById("count_avoided_rocks").innerHTML = avoidedRock;
document.getElementById("final_avoided_score").innerHTML = "Avoided objects: " + avoidedRock;
document.getElementById("final_score").innerHTML = "Destroyed objects: " + hitRocks;

function generateBoard() {
    generateRocks();
    ctx.drawImage(bgImage, 0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(playerImage, airplaiPositionX, airplaiPositionY, playerWidth, playerHeight);
    boardUpdateInterval = setInterval(updateBoard, 400);
}

function generateRocks() {
    rockX = Math.floor(Math.random() * 36) * 10;
    while (rockX % TILE != 0) {
        rockX = Math.floor(Math.random() * 36) * 10;
    }
    rockY = Math.floor(Math.random());
}

function placeRocks() {
    ctx.drawImage(enemy, rockX, rockY, 50, 50);
    rockY += TILE;
    if (rockY > window.innerHeight) {
        generateRocks();
    }
}

function updateBoard() {
    ctx.clearRect(0, 0, canvas.width = window.innerWidth, canvas.height = window.innerHeight);
    ctx.drawImage(bgImage, 0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(playerImage, airplaiPositionX, airplaiPositionY, playerWidth, playerHeight);
    placeRocks();
    checkPlaneCollision();
    avoidedRocks();
    if (rocksToDestroy == 1) {
        shoot();
    }
}

function checkPlaneCollision() {
    if (rockY >= airplaiPositionY + 10 && rockX === airplaiPositionX + 25) {
        clearInterval(boardUpdateInterval);
        ctx.clearRect(airplaiPositionX, airplaiPositionY, TILE, TILE);
        ctx.drawImage(explosion, airplaiPositionX, airplaiPositionY, 100, 100);
        setTimeout(() => {
            renderGameOverImage();
        }, "1000");

    }
}

function renderGameOverImage() {
    canvas.style.display = "none";
}

function shoot() {
    ctx.clearRect(bulletX, bulletY, 10, 20);
    bulletY -= 20;
    ctx.drawImage(bullet, bulletX, bulletY, 10, 20);
    if (bulletY + 30 <= rockY && bulletX == rockX + 20) {
        rocksToDestroy = 0;
        ctx.drawImage(explosion, bulletX - 15, bulletY - 20, 100, 100);
        generateRocks();
        ++hitRocks;
        document.getElementById("count_ponits").innerHTML = hitRocks;
        document.getElementById("final_score").innerHTML = "Destroyed objects: " + hitRocks;
    }
}

function avoidedRocks() {
    if (rockY === 0) {
        ++avoidedRock;
        document.getElementById("count_avoided_rocks").innerHTML = avoidedRock;
        document.getElementById("final_avoided_score").innerHTML = "Avoided objects: " + avoidedRock;
    }
}

window.onload = function () {
    generateBoard();
}

restartBtn.addEventListener("click", function () {
    location.reload();
});

document.addEventListener("keydown", function (e) {
    if (e.code === "ArrowRight" && airplaiPositionX <= window.innerWidth - 80) {
        airplaiPositionX += 40;
    } else if (e.code === "ArrowLeft" && airplaiPositionX >= 0 + 15) {
        airplaiPositionX -= 40;
    } else if (e.code == "Space") {
        bulletX = airplaiPositionX + 45;
        bulletY = airplaiPositionY - 20;
        ctx.drawImage(bullet, bulletX, bulletY, 10, 20);
        rocksToDestroy = 1;
        shoot();
    }
    checkPlaneCollision();
})