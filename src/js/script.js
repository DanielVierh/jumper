import { Player } from './classes/Player.js';
import { Obstacle } from './classes/Obstacle.js';

const canvas = document.getElementById('canvas');
const btn_jump = document.getElementById('btn_jump');
const ctx = canvas.getContext('2d');

let player = new Player(10, canvas.height - 30, 20, 30);
let obstacles = [];

btn_jump.addEventListener('click', () => {
    player.jump();
});

function createObstacle() {
    let obstacle = new Obstacle(canvas.width, canvas.height - 30, 20, 30);
    return obstacle;
}



setInterval(() => {
    let newObstacle = createObstacle();
    obstacles.push(newObstacle);
    console.log(obstacles);
    
}, 1500);



function checkCollision(player, obstacle) {
    return player.pos_x < obstacle.pos_x + obstacle.width &&
           player.pos_x + player.width > obstacle.pos_x &&
           player.pos_y < obstacle.pos_y + obstacle.height &&
           player.pos_y + player.height > obstacle.pos_y;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw(ctx);

    obstacles.forEach(obstacle => {
        obstacle.update(obstacles);
        obstacle.draw(ctx);

        if (checkCollision(player, obstacle)) {
            console.log('Collision detected!');
            // Hier kannst du die Logik hinzufügen, die bei einer Kollision ausgeführt werden soll
            // Zum Beispiel das Spiel beenden oder den Spieler zurücksetzen
        }
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();