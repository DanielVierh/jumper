export class Fireball {

    constructor(pos_x, pos_y, width, height, imageSrc) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
        this.velocity_x = Math.random() * (2 - 0.3) + 0.3;
        this.velocity_y = Math.floor(Math.random() * (2 - 1.1 + 1)) + 1;
        this.gravity = 0;
        this.image = new Image();
        this.image.src = imageSrc;
        this.is_harmfull = true;
    }

    update(fireballs, canvas) {
        this.pos_x -= this.velocity_x;
        this.pos_y += this.velocity_y;
        this.angle = (this.angle || 0) + .3;

        // Abprallen an den Rändern
        if (this.pos_x + this.width >= canvas.width || this.pos_x <= 0) {
            this.velocity_x = -this.velocity_x;
        }

        if (this.pos_y + this.height >= canvas.height || this.pos_y <= 0) {
            this.velocity_y = -this.velocity_y;
        }

        // Entfernen des Fireballs, wenn er die linke Seite des Canvas verlässt
        if (this.pos_x <= 0) {
            fireballs.splice(fireballs.indexOf(this), 1);
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