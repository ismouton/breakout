import { getTimestamp, noop } from "../utils";

class Mouse {
	constructor({ canvas, video }) {
		this._canvas = canvas;
		this._video = video;

		this.mouseMap = {
			x: null,
			y: null,
			click: {
				mouseDown: null,
				mouseUp: null,
			},
			buttonDown: false,
		};

		this._canvasOffset = {
			x: null,
			y: null,
		};

		this._setCanvasOffset();
		this._registerEvents();
	}

	destroy() {
		window.removeEventListener("resize", this._setCanvasOffset);
		this._canvas.removeEventListener("mousemove", this._mouseMove);
		this._canvas.removeEventListener("mouseleave", this._mouseLeave);
		this._canvas.removeEventListener("mousedown", this._mouseDown);
		this._canvas.removeEventListener("mouseup", this._mouseUp);
	}

	_mouseMove = (e) => {
		const { x, y } = this._deriveCoordinateFromEvent(e);

		this.mouseMap.x = x;
		this.mouseMap.y = y;
	};

	_mouseLeave = (e) => {
		this.mouseMap.x = null;
		this.mouseMap.y = null;

		this.mouseMap.click.mouseUp = null;
		this.mouseMap.click.mouseDown = null;
	};

	_mouseDown = (e) => {
		const { x, y } = this._deriveCoordinateFromEvent(e);
		const time = getTimestamp();

		this.mouseMap.click.mouseDown = {
			time,
			x,
			y,
		};

		this.mouseMap.buttonDown = true;
	};

	_mouseUp = (e) => {
		const { x, y } = this._deriveCoordinateFromEvent(e);
		const time = getTimestamp();

		this.mouseMap.click.mouseUp = {
			time,
			x,
			y,
		};

		this.mouseMap.buttonDown = false;
	};

	_registerEvents() {
		window.addEventListener("resize", this._setCanvasOffset);
		this._canvas.addEventListener("mousemove", this._mouseMove);
		this._canvas.addEventListener("mouseleave", this._mouseLeave);
		this._canvas.addEventListener("mousedown", this._mouseDown);
		this._canvas.addEventListener("mouseup", this._mouseUp);
	}

	_deriveCoordinateFromEvent(e) {
		const { clientX, clientY } = e;
		const x = Math.floor((clientX - this._canvasOffset.x) / this._video.scale);
		const y = Math.floor((clientY - this._canvasOffset.y) / this._video.scale);

		return { x: Math.max(x, 0), y: Math.max(y, 0) };
	}

	_setCanvasOffset = () => {
		const { x, y } = this._canvas.getBoundingClientRect();

		this._canvasOffset.x = x;
		this._canvasOffset.y = y;
	};
}

export default Mouse;
