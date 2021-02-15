class Ball {
	constructor({
		width = 16,
		height = 16,
		xVelocity = 1,
		yVelocity = 1,
		x = 0,
		y = 0,
	} = {}) {
		this.width = width;
		this.height = height;
		this.xVelocity = xVelocity;
		this.yVelocity = yVelocity;
		this.x = x;
		this.y = y;
	}

	tick() {

	}
}