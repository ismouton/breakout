class Video {
	constructor(el, {
		scale = 1,
		width = 640,
		height = 480,
		background = 0x000000,
	} = {}) {
		const { tagName } = el;

		if (tagName !== "CANVAS") {
			throw Error(
				"Video constructor must be passed canvas element as argument 1!"
			);
		}

		this.width = width;
		this.height = height;
		this.canvasElement = el;
		this.canvasElement.width = width * scale;
		this.canvasElement.height = height * scale;
		this.scale = scale;
		this.context = el.getContext("2d");
		this.imageData = this.context.getImageData(0, 0, width * this.scale, height * this.scale);
		this.clear(background);
		this.blankImageData = this.context.createImageData(this.imageData);
		this.blankImageData.data.set(this.imageData.data);
	}

	_getIndex = (x, y) => y * this.scale * (this.width * this.scale * 4) + x * this.scale * 4;

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
		const { width, height } = this.canvasElement;

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				this.setPixel(x / this.scale, y / this.scale, color);
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

		for (let localX = 0; localX < this.scale; localX++) {
			for (let localY = 0; localY < this.scale - 2; localY++) {
				const offset = idx + (localX * 4) + (localY * this.width * this.scale * 4);
				this.imageData.data[offset] = red;
				this.imageData.data[offset + 1] = green;
				this.imageData.data[offset + 2] = blue;
				this.imageData.data[offset + 3] = alpha;
			}
		}

		return this;
	}

	sync() {
		this.context.putImageData(this.imageData, 0, 0);
		this.imageData.data.set(this.blankImageData.data);

		return this;
	}
}

export default Video;
