import Character from "./Character";

class Block extends Character {
  constructor({
    /**
     * 
     */
    durability = Infinity,
    width = 8,
    height = 8,
    x = 0,
    y = 0,
    video,
    audio,
    borderColor = 0xffff00,
    color = 0xffff00,
  } = {}) {
    super(...arguments);

    this.durability = durability;

    this.width = width;
    this.height = height;
    this.dead = false;
    this.color = color;
    this.borderColor = borderColor;
  }

  _draw() {
    this.video.drawBlock({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			color: this.color,
			borderColor: this.borderColor,
		});
  }

  _tick() {
    this._draw();
  }

  get bounds() {
    return {
      minX: this.x,
      minY: this.y,
      maxX: this.x + this.width,
      maxY: this.y + this.height,
    };
  }
}

export default Block;
