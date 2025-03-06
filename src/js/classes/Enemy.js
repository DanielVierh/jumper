export class Enemy {
  constructor(pos_x, pos_y, width, height) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.width = width;
    this.height = height;
    this.velocity_x = Math.floor(Math.random() * (-1 + 4)) - 4;
    this.gravity = 0;
    this.images = [];
    this.imagesLoaded = 0;
    this.currentImageIndex = 0;
    this.is_alive = true;

    for (let i = 1; i <= 3; i++) {
      const img = new Image();
      img.src = `src/assets/enemies/enemy${i}.png`;
      img.onload = () => {
        this.imagesLoaded++;
      };
      this.images.push(img);
    }
  }

  update(enemies) {
    if(this.is_alive) {

    if (this.frameCount === undefined) {
      this.frameCount = 0;
    }

    this.pos_x += this.velocity_x;
    this.angle = (this.angle || 0) + 0.3;

    if (this.pos_x <= -50) {
      this.pos_x = -50;
      enemies.splice(enemies.indexOf(this), 1);
      this.velocity_x = 0;
    }

      this.frameCount++;
      if (this.frameCount % 10 === 0) {
        this.currentImageIndex = (this.currentImageIndex + 1) % (this.images.length - 1);
      }
    }else {
      this.currentImageIndex = 2;
    }

  }

  draw(ctx) {
    if (this.imagesLoaded === this.images.length) {
      const img = this.images[this.currentImageIndex];
      ctx.drawImage(img, this.pos_x, this.pos_y, this.width, this.height);
    }
  }
  
}