import { test } from './modules/functions.js';
import { Player } from './classes/Player.js';



test();

const canvas = document.getElementById('canvas');
const btn_jump = document.getElementById('btn_jump');
const ctx = canvas.getContext('2d');


let player = new Player(10, canvas.height - 30, 20, 30)


ctx.fillStyle = 'blue';
ctx.fillRect(player.pos_x, player.pos_y, player.width, player.height);



btn_jump.addEventListener('click', ()=> {
    player.jump(); 
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw(ctx);
    requestAnimationFrame(gameLoop);
}

gameLoop();