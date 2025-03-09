import { CanvasObject } from "./_CanvasObject.js";

export class Coin extends CanvasObject {
    constructor(pos_x, pos_y, width, height, imageSrc) {
        super(pos_x, pos_y, width, height, imageSrc)
        this.velocity_x = Math.floor(Math.random() * (-1 + 4)) - 4;
        this.gravity = 0;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    update(obj_arr) {
        super.update(obj_arr);
    }

    draw(ctx) {
        super.draw(ctx);
    }
}


