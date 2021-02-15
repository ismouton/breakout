class Video {
	constructor(el) {
		const { tagName } = el;
		const height = +el.getAttribute("height");
		const width = +el.getAttribute("width");

		if (tagName !== "CANVAS") {
			throw Error(
				"Video constructor must be passed canvas element as argument 1!"
			);
		}

		this.width = width;
		this.height = height;
		this.canvasElement = el;
		this.context = el.getContext("2d");
		this.imageData = this.context.getImageData(0, 0, width, height);
	}

	_getIndex = (x, y) => y * (this.width * 4) + x * 4;

	drawBlock({
		x,
		y,
		width,
		height,
		color = 0xff00ff,
		borderColor = 0xffffff,
	} = {}) {
		for (let localX = 0; localX < width; localX++) {
			for (let localY = 0; localY < height; localY++) {
				const pixelColor =
					!localY || !localX || localY === height - 1 || localX === width - 1
						? borderColor
						: color;

				this.setPixel(localX + x, localY + y, pixelColor);
			}
		}

		return this;
	}

	clear(color) {
		const width = this.width;
		const height = this.height;

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				this.setPixel(x, y, color);
			}
		}

		return this;
	}

	renderStatic() {
		const width = this.width;
		const height = this.height;

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const number = Math.floor(Math.random() * 255 + 1);
				const color = (number << 16) | (number << 8) | number;

				this.setPixel(x, y, color);
			}
		}

		return this;
	}

	setPixel(x, y, color) {
		const idx = this._getIndex(x, y);
		const red = (color >> 16) & 0xff;
		const green = (color >> 8) & 0xff;
		const blue = color & 0xff;
		const alpha = 0xff;

		this.imageData.data[idx] = red;
		this.imageData.data[idx + 1] = green;
		this.imageData.data[idx + 2] = blue;
		this.imageData.data[idx + 3] = alpha;

		return this;
	}

	sync() {
		this.context.putImageData(this.imageData, 0, 0);

		return this;
	}
}

export default Video;
