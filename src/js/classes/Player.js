export class Player {

    constructor(pos_x, pos_y, width, height) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.width = width;
        this.height = height;
        this.velocity_y = 0;
        this.gravity = 0.2;
        this.jumpStrength = -5;
        this.ground = pos_y;
        this.is_jumping = false;
        this.is_double_jump = false;
        this.rotation = 0; // Neue Eigenschaft für die Rotation

        // load images
        this.images = [];
        for (let i = 1; i <= 5; i++) {
            const img = new Image();
            img.src = `src/assets/player/mario${i}.png`;
            this.images.push(img);
        }
        this.currentImageIndex = 0;
    }

    jump() {
        if (this.pos_y === this.ground) {
            this.velocity_y = this.jumpStrength;
            this.is_jumping = true;
        } else if (this.pos_y !== this.ground) {
            //* Double Jump
            if (this.is_double_jump === false) {
                this.velocity_y = this.jumpStrength / 2;
                this.is_double_jump = true;
                this.rotation = 0; // Reset rotation
            }
        }
    }

    update() {
        this.velocity_y += this.gravity;
        this.pos_y += this.velocity_y;

        if (this.pos_y > this.ground) {
            this.pos_y = this.ground;
            this.velocity_y = 0;
        }

        // Bildanimation aktualisieren
        if (this.frameCount === undefined) {
            this.frameCount = 0;
        }

        if (this.is_jumping === true) {
            this.frameCount++;
            if (this.frameCount % 2 === 0) {
                this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
            }
        }

        if (this.pos_y === this.ground) {
            this.is_jumping = false;
            this.currentImageIndex = 0;
            this.is_double_jump = false;
            this.rotation = 0; // Reset rotation when on the ground
        }

        if (this.is_double_jump) {
            this.rotation += 10; // Increase rotation angle
        }
    }

    draw(ctx) {
        const img = this.images[this.currentImageIndex];
        ctx.save();
        ctx.translate(this.pos_x + this.width / 2, this.pos_y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

}