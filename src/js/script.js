import { Player } from "./classes/Player.js";
import { Obstacle } from "./classes/Obstacle.js";
import { Coin } from "./classes/Coin.js";
import { Fireball } from "./classes/Fireball.js";
import { Enemy } from "./classes/Enemy.js";

import {
  saveHighscore,
  getHighscore,
  displayHighscore,
} from "./modules/highscore.js";

//* DOM Objects
const canvas = document.getElementById("canvas");
const btn_jump = document.getElementById("btn_jump");
const lbl_live = document.getElementById("lbl_live");
const lbl_score = document.getElementById("score");
const bdy = document.getElementById("bdy");
const lbl_coins = document.getElementById("lbl_coins");
const ctx = canvas.getContext("2d");
const btn_play_again = document.getElementById("btn_play_again");
const game_over_screen = document.getElementById("game_over_screen");
const lbl_highscore = document.getElementById("lbl_highscore");
const lbl_last_score = document.getElementById("lbl_last_score");
const mdl_menu = document.getElementById("mdl_menu");
const btn_start_game = document.getElementById("btn_start_game");
const background = new Image();
background.src = "src/assets/bg/background3-720.png";

background.onload = function () {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
};

//* Variables
let player = new Player(30, canvas.height - 25, 25, 25);
let obstacles = [];
let score = 0;
let coins = [];
let coin_wallet = 0;
let fireballs = [];
let enemies = [];
let obstacle_interval = 10_000;
const obstacle_min_Interval = 5_500;
let enemy_interval = 5_000;
const enemy_min_Interval = 3_500;
let new_score_is_set = false;

window.onload = ()=> {
  displayHighscore(lbl_last_score);
}

btn_start_game.addEventListener('click', ()=> {
  mdl_menu.classList.remove('active');
  btn_jump.classList.add('active')
})


btn_jump.addEventListener("click", () => {
  player.jump();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    player.jump();
  }
});

//* Create Obstacles
function createObstacles() {
  if (player.live === 0) {
    game_over();
    return;
  }
  if (score >= 20) {
    let newObstacle = createObstacle();
    obstacles.push(newObstacle);
    if (obstacle_interval > obstacle_min_Interval) {
      obstacle_interval -= 200;      
    }
  }
  setTimeout(createObstacles, obstacle_interval);
}

setTimeout(createObstacles, obstacle_interval);

function createObstacle() {
  const obstacle_size = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
  let obstacle = new Obstacle(
    canvas.width,
    canvas.height -
      obstacle_size -
      Math.floor(Math.random() * (30 - 5 + 1)) +
      5,
    obstacle_size + 18,
    obstacle_size + 15,
    "src/assets/objects/Kreissaege.png"
  );
  return obstacle;
}

//* Create Coins
setInterval(() => {
  if (player.live === 0) {
    return;
  }
  let newCoin = createCoins();
  coins.push(newCoin);
}, 1000);

function createCoins() {
  let coin = new Coin(
    canvas.width,
    canvas.height - 20 - (Math.floor(Math.random() * (70 - 40 + 1)) + 40),
    20,
    10,
    "src/assets/objects/coin.png"
  );
  return coin;
}

//* Create Fireballs
setInterval(() => {
  if (player.live === 0) {
    game_over();
    return;
  }
  if(score > 7000) {
    let newFireball = createFireballs();
    fireballs.push(newFireball);
  }
}, 20000);

function createFireballs() {
  let fireball = new Fireball(
    canvas.width - 10,
    0,
    10,
    10,
    "src/assets/objects/piew.png"
  );
  return fireball;
}

//* Create Enemies
function createEnemies() {
  if (player.live === 0) {
    game_over();
    return;
  }
  if (score >= 20) {
    let newEnemy = createEnemy();
    enemies.push(newEnemy);
    if (enemy_interval > enemy_min_Interval) {
      enemy_interval -= 200;
    }
  }
  setTimeout(createEnemies, enemy_interval);
}

setTimeout(createEnemies, enemy_interval);

function createEnemy() {
  const enemy_size = 20;
  let enemy = new Enemy(
    canvas.width,
    canvas.height - enemy_size,
    enemy_size,
    enemy_size
  );
  return enemy;
}

function checkCollision(player, colliding_object) {
  return (
    player.pos_x < colliding_object.pos_x + colliding_object.width &&
    player.pos_x + player.width > colliding_object.pos_x &&
    player.pos_y < colliding_object.pos_y + colliding_object.height &&
    player.pos_y + player.height > colliding_object.pos_y
  );
}

function checkEnemyCollision(player, colliding_enemy) {

  if(colliding_enemy.is_alive === false) {
    return false;
  }

  const playerBottom = player.pos_y + player.height;
  const enemyTop = colliding_enemy.pos_y;
  const playerRight = player.pos_x + player.width;
  const enemyRight = colliding_enemy.pos_x + colliding_enemy.width;
  const playerLeft = player.pos_x;
  const enemyLeft = colliding_enemy.pos_x;

  // Check if player is landing on top of the enemy
  if (playerBottom <= enemyTop + 5 && playerBottom >= enemyTop - 5 && playerRight > enemyLeft && playerLeft < enemyRight) {
    return 'landed';
  }

  return (
    player.pos_x < colliding_enemy.pos_x + colliding_enemy.width &&
    player.pos_x + player.width > colliding_enemy.pos_x &&
    player.pos_y + player.height > colliding_enemy.pos_y &&
    player.pos_y < colliding_enemy.pos_y + colliding_enemy.height
  ) ? 'collided' : false;
}

function gameLoop() {
  lbl_live.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-pulse" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5"/>
    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z"/>
  </svg> ${player.live}`;

  lbl_score.innerHTML = `Score: ${score}`;
  lbl_coins.innerHTML = `Coins: ${coin_wallet}`;

  bdy.classList.remove("hit");
  bdy.classList.remove("extra-live");

  if (player.live === 0) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Hintergrund zeichnen
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  player.update();
  player.draw(ctx);

  //* Loop obstacles
  obstacles.forEach((obstacle) => {
    obstacle.update(obstacles, score);
    obstacle.draw(ctx);

    if (checkCollision(player, obstacle)) {
      got_hit(obstacle)
    } else {
      score++;
    }
  });

  //* Loop Coins
  coins.forEach((coin, index) => {
    coin.update(coins, score);
    coin.draw(ctx);

    if (checkCollision(player, coin)) {
      coins.splice(index, 1);
      score += 2;
      coin_wallet++;

      if (coin_wallet % 20 === 0) {
        player.live++;
        bdy.classList.add("extra-live");
      }
    }
  });

    //* Loop Fireballs
  fireballs.forEach((fireball) => {
    fireball.update(fireballs, canvas);
    fireball.draw(ctx);

    if (checkCollision(player, fireball)) {
      got_hit(fireball);
    }

      //* Collision between enemy and fireball
    enemies.forEach((enemy, index) => {
      if (checkCollision(fireball, enemy)) {
        enemy.is_alive = false;
        
        setTimeout(() => {
          enemies.splice(index, 1);
        }, 500);
      }
    });
  });

//* Loop enemies
enemies.forEach((enemy, index) => {
  enemy.update(enemies, canvas);
  enemy.draw(ctx);

  const collisionStatus = checkEnemyCollision(player, enemy);
  if (collisionStatus === 'collided') {
    got_hit(enemy);
  } else if (collisionStatus === 'landed') {
    // Remove enemy if player lands on it
    enemy.is_alive = false;
    score += 10;
    
    setTimeout(() => {
       enemies.splice(index, 1);
    }, 500);
  }else {
    score++;
  }

  //* Collision between enemy and obstacle
  obstacles.forEach((obstacle) => {
    if (checkCollision(enemy, obstacle)) {
      enemy.is_alive = false;
      
      setTimeout(() => {
         enemies.splice(index, 1);
      }, 500);
    }
  });

});

  setTimeout(() => {
    gameLoop()
  }, 18);
}

gameLoop();

btn_play_again.addEventListener("click", () => {
  window.location.reload();
});

function got_hit(collision_obj) {
  if(player.is_invulnerable === false && collision_obj.is_harmfull == true) {
    bdy.classList.add("hit");
    player.live--;
    collision_obj.is_harmfull = false;
    player.invulnerable();
  }
}

function game_over() {
  game_over_screen.classList.add("active");
  if(new_score_is_set === false) {
    saveHighscore(score);
    displayHighscore(lbl_highscore);
    new_score_is_set = true;
    setTimeout(() => {
      window.location.reload();
    }, 10000);
  }
}