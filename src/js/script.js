import { Player } from "./classes/Player.js";
import { Obstacle } from "./classes/Obstacle.js";
import { Coin } from "./classes/Coin.js";

const canvas = document.getElementById("canvas");
const btn_jump = document.getElementById("btn_jump");
const lbl_live = document.getElementById("lbl_live");
const lbl_score = document.getElementById("score");
const bdy = document.getElementById("bdy");
const lbl_coins = document.getElementById("lbl_coins");
const ctx = canvas.getContext("2d");
const btn_play_again = document.getElementById("btn_play_again");
const game_over_screen = document.getElementById("game_over_screen");
const background = new Image();
background.src = 'src/assets/bg/background3-720.png';

background.onload = function() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
};

let player = new Player(30, canvas.height - 25, 25, 25);
let obstacles = [];
let live = 5;
let score = 0;
let coins = [];
let coin_wallet = 0;

btn_jump.addEventListener("click", () => {
  player.jump();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    player.jump();
  }
});

function createObstacle() {
  const obstacle_size = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
  let obstacle = new Obstacle(
    canvas.width,
    canvas.height - obstacle_size - Math.floor(Math.random() * (30 - 5 + 1)) + 10,
    obstacle_size + 18,
    obstacle_size + 15, 
    'src/assets/objects/Kreissaege.png'
  );
  return obstacle;
}

function createCoins() {
  let coin = new Coin(
    canvas.width,
    canvas.height - 20 - 70,
    20,
    10, 
    'src/assets/objects/coin.png'
  );
  return coin;
}

setInterval(() => {
  if (live === 0) {
    game_over_screen.classList.add('active')
    return;
  }
  let newObstacle = createObstacle();
  obstacles.push(newObstacle);
}, 2500);

setInterval(() => {
  if (live === 0) {
    return;
  }
  let newCoin = createCoins();
  coins.push(newCoin);
}, 1000);

function checkCollision(player, obstacle) {
  return (
    player.pos_x < obstacle.pos_x + obstacle.width &&
    player.pos_x + player.width > obstacle.pos_x &&
    player.pos_y < obstacle.pos_y + obstacle.height &&
    player.pos_y + player.height > obstacle.pos_y
  );
}

function gameLoop() {
  lbl_live.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-pulse" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5"/>
    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z"/>
  </svg> ${live}`;

  lbl_score.innerHTML = `Score: ${score}`;
  lbl_coins.innerHTML = `Coins: ${coin_wallet}`


  bdy.classList.remove('hit');
  bdy.classList.remove('extra-live')

  if (live === 0) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Hintergrund zeichnen
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  player.update();
  player.draw(ctx);

  obstacles.forEach((obstacle) => {
    obstacle.update(obstacles, score);
    obstacle.draw(ctx);

    if (checkCollision(player, obstacle)) {
      bdy.classList.add('hit');
      obstacles.splice(0, 1);
      live--;
    }else {
        score++;
    }
  });

  coins.forEach((coin, index) => {
    coin.update(coins, score);
    coin.draw(ctx);

    if (checkCollision(player, coin)) {
      coins.splice(index, 1);
      score += 2;
      coin_wallet++;

      if(coin_wallet % 20 === 0) {
        live++;
        bdy.classList.add('extra-live')
      }
    }
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();


btn_play_again.addEventListener('click', ()=> {
  window.location.reload();
})