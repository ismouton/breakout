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
  } = {}) {
    super(...arguments);

    this.durability = durability;

    this.width = width;
    this.height = height;
  }

  _draw() {
    this.video.drawBlock({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			color: 0xffff00,
			borderColor: 0xffff00,
		});
  }

  tick() {
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
