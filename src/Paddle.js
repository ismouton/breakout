import Character from './Character';

class Paddle extends Character {
	constructor(
		{
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
		} = {}
	) {
		super({
			x,
			y,
			audio,
			video,
		});

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

	_handleMovement = () => {
		/* Handle input */
		if (this.input.right && this.input.left) {
			this.lastDirection = null;
		} else if (this.input.right) {
			if (this.lastDirection === "right") {
				this.speed += 1;
			} else {
				this.speed = 1;
			}

			this.lastDirection = "right";
		} else if (this.input.left) {
			if (this.lastDirection === "left") {
				this.speed -= 1;
			} else {
				this.speed = -1;
			}

			this.lastDirection = "left";
		} else {
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
			this.audio.playTrill(5);
		} else if (newX > this.rightBounds - this.width) {
			newX = this.rightBounds - this.width;
			this.audio.playTrill(5);
		}

		this.x = newX;
	};

	_draw = () => {
		this.video.drawBlock({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			color: this.color,
			borderColor: this.borderColor,
		});
	};

	/**
	 * Fires the space lasers if available.
	 */
	pressFireSpaceLasers = () => {
		this.input.fireSpaceLasers = true;
	};

	/**
	 * Moves the paddle leftward.
	 */
	pressLeft = () => {
		this.input.left = true;
	};

	/**
	 * Moves the paddle rightward.
	 */
	pressRight = () => {
		this.input.right = true;
	};

	/**
	 * Stops firing the space lasers.
	 */
	releaseFireSpaceLasers = () => {
		this.input.fireSpaceLasers = false;
	};

	/**
	 * Stops moving the paddle left and resets speed.
	 */
	releaseLeft = () => {
		this.input.left = false;
		this.paddleSpeed = 0;
	};

	/**
	 * Stops moving the paddle right and resets speed.
	 */
	releaseRight = () => {
		this.input.right = false;
		this.paddleSpeed = 0;
	};

	/**
	 * Iterate the object.
	 */
	tick = () => {
		this._handleMovement();
		this._draw();
	};
}

export default Paddle;
