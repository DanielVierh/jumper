export class Obstacle {

    constructor(pos_x, pos_y, width, height) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
        this.velocity_x = Math.floor(Math.random() * (-1 + 4)) - 4;
        this.gravity = 0;
    }

    update(obstacles) {
        this.pos_x += this.velocity_x;

        if (this.pos_x <= 0) {
            this.pos_x = 0;
            obstacles.splice(0, 1);
            this.velocity_x = 0;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.pos_x, this.pos_y, this.width, this.height);
    }

}