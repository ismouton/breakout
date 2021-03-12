import Character from "./Character";

const W = 0xffffff;
// prettier-ignore
const defaultSprite = [
	[ W, W, W, W, W, W, W, W, W, W, W],
	[ W,  ,  ,  ,  ,  ,  ,  ,  ,  , W],
	[ W,  ,  , W, W,  ,  ,  ,  ,  , W],
	[ W,  , W,  ,  , W,  ,  ,  ,  , W],
	[ W,  , W,  ,  , W,  ,  ,  ,  , W],
	[ W,  ,  , W, W,  , W,  , W,  , W],
	[ W,  ,  ,  ,  ,  , W, W,  ,  , W],
	[ W,  ,  ,  ,  ,  , W,  , W,  , W],
	[ W,  ,  ,  ,  ,  , W,  , W,  , W],
	[ W,  ,  ,  ,  ,  ,  ,  ,  ,  , W],
	[ W, W, W, W, W, W, W, W, W, W, W],
];

class MouseInteractive extends Character {
	constructor({ sprite = defaultSprite } = {}) {
		super(...arguments);

		this.sprite = sprite;
	}

	_draw() {
		this._context.video.setAoA(this.x, this.y, this.sprite);
	}

	/**
	 * TODO implement this method.
	 */
	_isCoordinateInBounds(coords) {
		if (coords == null) {
			return false;
		}

		return true;
	}

	_handleClicks() {
		const { mouseMap } = this._context.mouse;
		const { click } = mouseMap;
		const { mouseDown, mouseUp } = click;

		if (
			this._isCoordinateInBounds(mouseDown) &&
			this._isCoordinateInBounds(mouseUp)
		) {
			const delta = click.mouseUp.time - click.mouseDown.time;
			console.log(mouseUp);
			console.log(mouseDown);
			console.log("delta", delta);

			delete click.mouseUp;
		}
	}

	_tick() {
		this._handleClicks();
		this._draw();
	}
}

export default MouseInteractive;
