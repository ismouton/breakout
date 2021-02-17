import Character from "./Character";

class Ball extends Character {
	constructor({
		size = 6,
		xVelocity = 1,
		yVelocity = -1,
		x = 0,
		y = 0,
		video,
		audio,
	} = {}) {
		super({ video, audio, x, y });

		this.size = size;
		this.xVelocity = xVelocity;
		this.yVelocity = yVelocity;
		this.collisionFlag = false;
	}

	_draw() {
		this.video.drawBlock({
			x: this.x,
			y: this.y,
			width: this.size,
			height: this.size,
			color: 0xFFFF00,
			borderColor: 0xFFFF00,
		});
	}

	_handleMovement() {
		let newX = this.xVelocity + this.x;
		let newY = this.yVelocity + this.y;
		const minX = 0;
		const minY = 0;
		const maxX = this.video.width - this.size;
		const maxY = this.video.height - this.size;

		if (newX <= minX) {
			this.xVelocity = -this.xVelocity;
			newX = minX;
			this.collisionFlag = true;
		}

		if (newY <= minY) {
			this.yVelocity = -this.yVelocity;
			newY = minY;
			this.collisionFlag = true;
		}

		if (newX >= maxX) {
			this.xVelocity = -this.xVelocity;
			newX = maxX;
			this.collisionFlag = true;
		}

		if (newY >= maxY) {
			this.yVelocity = -this.yVelocity;
			newY = maxY;
			this.collisionFlag = true;
		}

		this.x = newX;
		this.y = newY;
	}

	tick() {
		/* Handle collision from previous tick */
		if (this.collisionFlag) {
			this.audio.playRing({ millis: 50, frequencies: [100] });
			this.collisionFlag = false;
		}

		this._handleMovement();
		this._draw();
	}
}

export default Ball;
