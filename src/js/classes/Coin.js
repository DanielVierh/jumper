export class Coin {
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

    update(coins) {
        this.pos_x += this.velocity_x;

        if (this.pos_x <= 0) {
            this.pos_x = 0;
            coins.splice(0, 1);
            this.velocity_x = 0;
        }
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.pos_x,
            this.pos_y,
            this.width,
            this.height
        );
    }
}
