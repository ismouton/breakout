import Block from "./Block";
import Character from "./Character";

class Ball extends Block {
	constructor({
		/**
		 * The width and height of the ball.
		 */
		size = 6,

		/**
		 * The initial X-axis velocity of the ball.
		 */
		xVelocity = 1,

		/**
		 * The initial y-axis velocity of the ball.
		 */
		yVelocity = -1,

		/**
		 * The initial x coordinate of the ball.
		 */
		x = 0,

		/**
		 * The initial y coordinate of the ball.
		 */
		y = 0,

		/**
		 * Instance of `Video`.
		 */
		video,

		/**
		 * Instance of `Audio`.
		 */
		audio,

		collisionObjects = [],
	} = {}) {
		super(...arguments);

		this.width = size;
		this.height = size;
		this.xVelocity = xVelocity;
		this.yVelocity = yVelocity;
		this.collisionFlag = false;
		this.collisionObjects = collisionObjects;
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

	_handleCollision({
		minX,
		minY,
		maxX,
		maxY,
	}) {
		const intersect = (A, B, C, D) => {
			const ccw = (A,B,C) => (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x);

			return ccw(A,C,D) != ccw(B,C,D) && ccw(A,B,C) != ccw(A,B,D)
		};

		let newX = this.xVelocity + this.x;
		let newY = this.yVelocity + this.y;

		const b0 = { x: this.x, y: this.y };
		const b1 = { x: newX, y: newY };

		// Top Left
		const o0 = { x: minX, y: minY };

		// Bottom Left
		const o1 = { x: minX, y: maxY };

		// Bottom Right
		const o2 = { x: maxX, y: maxY };

		// Top Right
		const o3 = { x: maxX, y: minY };

		const intersectRightBounds = intersect(
			{ x: b0.x + this.width, y: b0.y },
			{ x: b1.x + this.width, y: b1.y },
			o2,
			o3,
		);

		if (intersectRightBounds) {
			console.log('intersectRightBounds');

			this.xVelocity = -this.xVelocity;
			newX = maxX;
			this.collisionFlag = true;
		}

		const intersectTopBounds = intersect(
			{ x: b0.x, y: b0.y },
			{ x: b1.x, y: b1.y },
			o0,
			o3,
		);

		if (intersectTopBounds) {
			console.log('intersectTopBounds');
			this.yVelocity = -this.yVelocity;
			newY = maxY - this.height;
			this.collisionFlag = true;
		}

		const intersectLeftBounds = intersect(
			{ x: b0.x, y: b0.y },
			{ x: b1.x, y: b1.y },
			o0,
			o1,
		);

		if (intersectLeftBounds) {
			console.log('intersectLeftBounds');

			this.xVelocity = -this.xVelocity;
			newX = maxX;
			this.collisionFlag = true;
		}

		const intersectBottomBounds = intersect(
			{ x: b0.x, y: b0.y },
			{ x: b1.x, y: b1.y },
			o1,
			o2,
		);

		if (intersectBottomBounds) {
			console.log('intersectBottomBounds');
			this.yVelocity = -this.yVelocity;
			newY = maxY - this.height;
			this.collisionFlag = true;
		}

		return { newX, newY };
	}

	_handleMovement() {
		const minX = 0;
		const minY = 0;
		const maxX = this.video.width - this.width;
		const maxY = this.video.height - this.height;

		const borders = { minX, minY, maxX, maxY };
		const collisionObjects = this.collisionObjects;

		let newX;
		let newY;

		for(let i = 0; i < collisionObjects.length; i++) {
			const collisionObject = collisionObjects[i];
			const newCoords = this._handleCollision(collisionObject.bounds);

			newX = newCoords.newX;
			newY = newCoords.newY;

			// if (this.collisionFlag) {
			// 	break;
			// }
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
