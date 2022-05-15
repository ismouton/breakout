import Block from "./Block";
import Character from "./Character";

class Paddle extends Block {
	constructor({
		/**
		 * Instance of `Video`.
		 */
		video,

		/**
		 * Instance of `Audio`.
		 */
		audio,

		/**
		 * Starting X coordinate.
		 */
		x = (320 - 48) / 2,

		/**
		 * Starting Y coordinate.
		 */
		y = 430,

		/**
		 * How far can the paddle move right until it hits a wall.
		 */
		rightBounds = 640,

		/**
		 * How far can the paddle move left until it hits a wall.
		 */
		leftBounds = 0,

		/**
		 * How wide is the paddle.
		 */
		width = 64,

		/**
		 * How tall is the paddle.
		 */
		height = 16,

		/**
		 * The cap on `paddleSpeed`.
		 */
		maxSpeed = 8,

		/**
		 * The color of the paddle.
		 */
		color = 0xffffff,

		/**
		 * The color of the border of the paddle.
		 */
		borderColor = 0x000000,
	} = {}) {
		super(...arguments);

		this.speed = 0;
		this.rightBounds = rightBounds;
		this.leftBounds = leftBounds;
		this.width = width;
		this.height = height;
		this.lastDirection = null;
		this.maxSpeed = maxSpeed;
		this.color = color;
		this.borderColor = borderColor;

		/* Input state */
		this.input = {
			fireSpaceLasers: false,
			left: false,
			right: false,
		};
	}

	/**
	 * Noop.
	 * Paddle is technically a block so we override this method to be a noop
	 * as the paddle should be impervious to the balls destroying powers.
	 */
	destroy() {}

	_handleMovement = () => {
		const inputMap = this._context.keyboard.inputMap;
		const { ArrowLeft, ArrowRight } = inputMap;

		/* Handle input */
		if (ArrowRight && ArrowLeft) {
			this.lastDirection = null;
		} else if (ArrowRight) {

			if (this.lastDirection === "right") {
				this.speed += 1;
			} else {
				this.speed = 1;
			}

			this.lastDirection = "right";
		} else if (ArrowLeft) {
			if (this.lastDirection === "left") {
				this.speed -= 1;
			} else {
				this.speed = -1;
			}

			this.lastDirection = "left";
		} else {
			// console.log('no dir')
			this.speed = 0;
		}

		/* Enforce the speed limit */
		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		} else if (this.speed < -this.maxSpeed) {
			this.speed = -this.maxSpeed;
		}

		/* Enforce bounds */
		let newX = this.speed + this.x;
		if (newX < this.leftBounds) {
			newX = this.leftBounds;
			this._context.audio.playTrill(5);
		} else if (newX > this.rightBounds - this.width) {
			newX = this.rightBounds - this.width;
			this._context.audio.playTrill(5);
		}

		this.x = newX;
	};

	_draw = () => {
		this._context.video.drawBlock({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			color: this.color,
			borderColor: this.borderColor,
		});
	};

	/**
	 * Iterate the object.
	 */
	_tick = () => {
		this._handleMovement();
		this._draw();
	};
}

export default Paddle;
