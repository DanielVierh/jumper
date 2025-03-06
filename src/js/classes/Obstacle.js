export class Obstacle {

    constructor(pos_x, pos_y, width, height, imageSrc) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
        this.velocity_x = Math.floor(Math.random() * (-1 + 4)) - 4;
        this.gravity = 0;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    update(obstacles) {
        this.pos_x += this.velocity_x;
        this.angle = (this.angle || 0) + .3;

        if (this.pos_x <= -100) {
            this.pos_x = -100;
            obstacles.splice(0, 1);
            this.velocity_x = 0;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos_x + this.width / 2, this.pos_y + this.height / 2);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

}