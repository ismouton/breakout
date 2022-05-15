import Block from "./Block";
import Character from "./Character";

const RIGHT_EDGE = 0;
const LEFT_EDGE = 1;
const TOP_EDGE = 2;
const BOTTOM_EDGE = 3;

const createEdgesFromBounds = (bounds) => {
	const edges = [];

	edges[TOP_EDGE] = [{ x: bounds.minX, y: bounds.minY}, {x: bounds.maxX, y: bounds.minY}];
	edges[BOTTOM_EDGE] = [{ x: bounds.minX, y: bounds.maxY}, {x: bounds.maxX, y: bounds.maxY}];
	edges[LEFT_EDGE] = [{ x: bounds.minX, y: bounds.minY}, {x: bounds.minX, y: bounds.maxY}];
	edges[RIGHT_EDGE] = [{ x: bounds.maxX, y: bounds.minY}, {x: bounds.maxX, y: bounds.maxY}];

	return edges;
}

class Ball extends Block {
	name = 'Ball';
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
		this._context.video.drawBlock({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			color: 0xffff00,
			borderColor: 0xffff00,
		});
	}

	_handleCollision(objectBounds) {
		const testIntersection = (ball, object) => {
			const intersect = (A, B, C, D) => {
				const ccw = (A,B,C) => (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x);
	
				return ccw(A,C,D) != ccw(B,C,D) && ccw(A,B,C) != ccw(A,B,D)
			};
			
			const ballEdges = createEdgesFromBounds(ball);
			const objectEdges = createEdgesFromBounds(object);

			let intersectRightBounds = false;
			let intersectTopBounds = false;
			let intersectLeftBounds = false;
			let intersectBottomBounds = false;

			if (this.xVelocity > 0) {
				intersectRightBounds = intersect(...ballEdges[BOTTOM_EDGE], ...objectEdges[LEFT_EDGE])
					|| intersect(...ballEdges[TOP_EDGE], ...objectEdges[LEFT_EDGE]);
			} else if (this.xVelocity < 0) {
				intersectLeftBounds = intersect(...ballEdges[BOTTOM_EDGE], ...objectEdges[RIGHT_EDGE])
					|| intersect(...ballEdges[TOP_EDGE], ...objectEdges[RIGHT_EDGE]);
			}

			if (this.yVelocity > 0) {
				intersectTopBounds = intersect(...ballEdges[LEFT_EDGE], ...objectEdges[TOP_EDGE])
					|| intersect(...ballEdges[RIGHT_EDGE], ...objectEdges[TOP_EDGE]);
			} else if (this.yVelocity < 0) {
				intersectTopBounds = intersect(...ballEdges[LEFT_EDGE], ...objectEdges[BOTTOM_EDGE])
					|| intersect(...ballEdges[RIGHT_EDGE], ...objectEdges[BOTTOM_EDGE]);
			}

			return {
				intersectRightBounds,
				intersectTopBounds,
				intersectLeftBounds,
				intersectBottomBounds,
			}
		};

		let newX = this.xVelocity + this.x;
		let newY = this.yVelocity + this.y;

		const { maxX, maxY } = objectBounds;
		
		const ballBounds = {
			minX: newX,
			maxX: newX + this.width,
			minY: newY,
			maxY: newY + this.height,
		};

		const {
			intersectRightBounds,
			intersectTopBounds,
			intersectLeftBounds,
			intersectBottomBounds,
		} = testIntersection(ballBounds, objectBounds);

		let localCollisionFlag = false;

		if (intersectRightBounds) {
			this.xVelocity = -this.xVelocity;
			newX = maxX;
			this.collisionFlag = true;
			localCollisionFlag = true;
		}

		if (intersectTopBounds) {
			this.yVelocity = -this.yVelocity;
			newY = maxY;
			this.collisionFlag = true;
			localCollisionFlag = true;
		}

		if (intersectLeftBounds) {
			this.xVelocity = -this.xVelocity;
			newX = maxX;
			this.collisionFlag = true;
			localCollisionFlag = true;
		}

		if (intersectBottomBounds) {
			this.yVelocity = -this.yVelocity;
			newY = maxY - this.height;
			this.collisionFlag = true;
			localCollisionFlag = true;
		}

		return { collisionFlag: localCollisionFlag, newCoords: { newX, newY }};
	}

	_handleMovement() {
		const minX = 0;
		const minY = 0;
		const maxX = this._context.video.width - this.width;
		const maxY = this._context.video.height - this.height;

		const borders = { minX, minY, maxX, maxY };
		const collisionObjects = this.collisionObjects;

		let newX;
		let newY;

		for(let i = 0; i < collisionObjects.length; i++) {
			const collisionObject = collisionObjects[i];
			const { newCoords, collisionFlag } = this._handleCollision(collisionObject.bounds);

			newX = newCoords.newX;
			newY = newCoords.newY;

			if (collisionFlag) {
				collisionObject.destroy && collisionObject.destroy();
			}
		}

		this.x = newX;
		this.y = newY;

		if (this.y > 256) {
			this.dead = true;
		}
	}

	_tick() {
		/* Handle collision from previous tick */
		if (this.collisionFlag) {
			this._context.audio.playRing({ millis: 50, frequencies: [100] });
			this.collisionFlag = false;
		}

		this._handleMovement();
		this._draw();
	}
}

export default Ball;
