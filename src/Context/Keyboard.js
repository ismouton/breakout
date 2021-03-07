function getProxyHandler(inputClassInstance) {
	return {
		get: function (target, prop) {
			const isKeyActive = target[prop];

			if (inputClassInstance.mode === "momentary") {
				delete target[prop];
			}

			return isKeyActive;
		},
	};
}

class Keyboard {
	constructor({ canvas }) {
		this._canvas = canvas;
		this.setMomentaryMode();

		this.inputMap = new Proxy({}, getProxyHandler(this));
		this._registerEvents();
	}

	setContinuousMode() {
		this.mode = "continuous";
	}

	setMomentaryMode() {
		this.mode = "momentary";
	}

	_registerEvents() {
		this._canvas.addEventListener("keyup", this._keyUp);
		this._canvas.addEventListener("keydown", this._keyDown);
	}

	_destroy() {
		this._canvas.removeEventListener("keyup", this._keyUp);
		this._canvas.removeEventListener("keydown", this._keyDown);
	}

	_keyDown = (e) => {
		const { code: key } = e;

		this.inputMap[key] = true;
	};

	_keyUp = (e) => {
		const { code: key } = e;

		delete this.inputMap[key];
	};
}

export default Keyboard;
