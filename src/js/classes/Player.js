export class Player {

    constructor(pos_x, pos_y, width, height) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
        this.velocity_y = 0;
        this.gravity = 0.5;
        this.jumpStrength = -10;
        this.ground = pos_y;
    }

    jump() {
        if (this.pos_y === this.ground) {
            this.velocity_y = this.jumpStrength;
        }
    }

    update() {
        this.velocity_y += this.gravity;
        this.pos_y += this.velocity_y;

        if (this.pos_y > this.ground) {
            this.pos_y = this.ground;
            this.velocity_y = 0;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.pos_x, this.pos_y, this.width, this.height);
    }

}