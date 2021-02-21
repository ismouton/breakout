import Character from "./Character";

const o = false;
const l = true;
const characterMap = {
	" ": [
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
	],
	0: [
		[o, o, l, l, l, o, o],
		[o, l, o, o, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[o, l, l, o, o, l, o],
		[o, o, l, l, l, o, o],
	],
	1: [
		[o, o, o, l, l, o, o],
		[o, o, l, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, l, l, l, l, l, l],
	],
	2: [
		[o, l, l, l, l, l, o],
		[l, l, o, o, o, l, l],
		[o, o, o, o, l, l, l],
		[o, o, l, l, l, l, o],
		[o, l, l, l, l, o, o],
		[l, l, l, o, o, o, o],
		[l, l, l, l, l, l, l],
	],
	3: [
		[o, l, l, l, l, l, l],
		[o, o, o, o, l, l, o],
		[o, o, o, l, l, o, o],
		[o, o, l, l, l, l, o],
		[o, o, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[o, l, l, l, l, l, o],
	],
	4: [
		[o, o, o, l, l, l, o],
		[o, o, l, l, l, l, o],
		[o, l, l, o, l, l, o],
		[l, l, o, o, l, l, o],
		[l, l, l, l, l, l, l],
		[o, o, o, o, l, l, o],
		[o, o, o, o, l, l, o],
	],
	5: [
		[l, l, l, l, l, l, o],
		[l, l, o, o, o, o, o],
		[l, l, l, l, l, l, o],
		[o, o, o, o, o, l, l],
		[o, o, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[o, l, l, l, l, l, o],
	],
	6: [
		[o, o, l, l, l, l, o],
		[o, l, l, o, o, o, o],
		[l, l, o, o, o, o, o],
		[l, l, l, l, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[o, l, l, l, l, l, o],
	],
	7: [
		[l, l, l, l, l, l, l],
		[l, l, o, o, o, l, l],
		[o, o, o, o, l, l, o],
		[o, o, o, l, l, o, o],
		[o, o, l, l, o, o, o],
		[o, o, l, l, o, o, o],
		[o, o, l, l, o, o, o],
	],
	8: [
		[o, l, l, l, l, o, o],
		[l, l, o, o, o, l, o],
		[l, l, l, o, o, l, o],
		[o, l, l, l, l, o, o],
		[l, o, o, o, o, l, l],
		[l, o, o, o, o, l, l],
		[o, l, l, l, l, l, o],
	],
	9: [
		[o, l, l, l, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[o, l, l, l, l, l, l],
		[o, o, o, o, o, l, l],
		[o, o, o, o, l, l, o],
		[o, l, l, l, l, o, o],
	],
	a: [
		[o, o, l, l, l, o, o],
		[o, l, l, o, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, l, l, l, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
	],
	b: [
		[l, l, l, l, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, l, l, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, l, l, l, l, o],
	],
	c: [
		[o, o, l, l, l, l, o],
		[o, l, l, o, o, l, l],
		[l, l, o, o, o, o, o],
		[l, l, o, o, o, o, o],
		[l, l, o, o, o, o, o],
		[o, l, l, o, o, l, l],
		[o, o, l, l, l, l, o],
	],
	d: [
		[l, l, l, l, l, o, o],
		[l, l, o, o, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, l, l, o],
		[l, l, l, l, l, o, o],
	],
	e: [
		[l, l, l, l, l, l, l],
		[l, l, o, o, o, o, o],
		[l, l, o, o, o, o, o],
		[l, l, l, l, l, l, o],
		[l, l, o, o, o, o, o],
		[l, l, o, o, o, o, o],
		[l, l, l, l, l, l, l],
	],
	f: [
		[l, l, l, l, l, l, l],
		[l, l, o, o, o, o, o],
		[l, l, o, o, o, o, o],
		[l, l, l, l, l, l, o],
		[l, l, o, o, o, o, o],
		[l, l, o, o, o, o, o],
		[l, l, o, o, o, o, o],
	],
	g: [
		[o, o, l, l, l, l, l],
		[o, l, l, o, o, o, o],
		[l, l, o, o, o, o, o],
		[l, l, o, o, l, l, l],
		[l, l, o, o, o, l, l],
		[o, l, l, o, o, l, l],
		[o, o, l, l, l, l, l],
	],
	h: [
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, l, l, l, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
	],
	i: [
		[o, o, l, l, l, l, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, l, l, l, l, o],
	],
	j: [
		[o, o, o, l, l, l, l],
		[o, o, o, o, o, l, l],
		[o, o, o, o, o, l, l],
		[o, o, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[o, l, l, l, l, l, o],
	],
	k: [
		[l, l, o, o, o, l, l],
		[l, l, o, o, l, l, o],
		[l, l, o, l, l, o, o],
		[l, l, l, l, o, o, o],
		[l, l, o, l, l, o, o],
		[l, l, o, o, l, l, o],
		[l, l, o, o, o, l, l],
	],
	l: [
		[o, l, l, o, o, o, o],
		[o, l, l, o, o, o, o],
		[o, l, l, o, o, o, o],
		[o, l, l, o, o, o, o],
		[o, l, l, o, o, o, o],
		[o, l, l, o, o, o, o],
		[o, l, l, l, l, l, l],
	],
	m: [
		[l, l, o, o, o, l, l],
		[l, l, l, o, l, l, l],
		[l, l, l, l, l, l, l],
		[l, l, l, l, l, l, l],
		[l, l, o, l, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
	],
	n: [
		[l, l, o, o, o, l, l],
		[l, l, l, o, o, l, l],
		[l, l, l, l, o, l, l],
		[l, l, l, l, l, l, l],
		[l, l, o, l, l, l, l],
		[l, l, o, o, l, l, l],
		[l, l, o, o, o, l, l],
	],
	o: [
		[o, l, l, l, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[o, l, l, l, l, l, o],
	],
	p: [
		[l, l, l, l, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, l, l, l, l, o],
		[l, l, o, o, o, o, o],
		[l, l, o, o, o, o, o],
		[l, l, o, o, o, o, o],
	],
	q: [
		[o, l, l, l, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, l, l, l, l],
		[l, l, o, o, l, l, o],
		[o, l, l, l, l, o, l],
	],
	r: [
		[l, l, l, l, l, l, o],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, l, l, l, l, o],
		[l, l, o, l, l, o, o],
		[l, l, o, o, l, l, o],
		[l, l, o, o, o, l, l],
	],
	s: [
		[o, l, l, l, l, o, o],
		[l, l, o, o, l, l, o],
		[l, l, o, o, o, o, o],
		[o, l, l, l, l, l, o],
		[o, o, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[o, l, l, l, l, l, o],
	],
	t: [
		[l, l, l, l, l, l, o],
		[o, o, l, l, o, o, o],
		[o, o, l, l, o, o, o],
		[o, o, l, l, o, o, o],
		[o, o, l, l, o, o, o],
		[o, o, l, l, o, o, o],
		[o, o, l, l, o, o, o],
	],
	u: [
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[o, l, l, l, l, l, o],
	],
	v: [
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, l, o, l, l, l],
		[o, l, l, l, l, l, o],
		[o, o, l, l, l, o, o],
		[o, o, o, l, o, o, o],
	],
	w: [
		[l, l, o, o, o, l, l],
		[l, l, o, o, o, l, l],
		[l, l, o, l, o, l, l],
		[l, l, l, l, l, l, l],
		[l, l, l, l, l, l, l],
		[l, l, l, o, l, l, l],
		[l, l, o, o, o, l, l],
	],
	x: [
		[l, l, o, o, o, l, l],
		[l, l, l, o, l, l, l],
		[o, l, l, l, l, l, o],
		[o, o, l, l, l, o, o],
		[o, l, l, l, l, l, o],
		[l, l, l, o, l, l, l],
		[l, l, o, o, o, l, l],
	],
	y: [
		[o, l, l, o, o, l, l],
		[o, l, l, o, o, l, l],
		[o, l, l, o, o, l, l],
		[o, o, l, l, l, l, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
	],
	z: [
		[l, l, l, l, l, l, l],
		[o, o, o, o, l, l, l],
		[o, o, o, l, l, l, o],
		[o, o, l, l, l, o, o],
		[o, l, l, l, o, o, o],
		[l, l, l, o, o, o, o],
		[l, l, l, l, l, l, l],
	],
	",": [
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, l, l, o, o, o, o],
		[o, o, l, o, o, o, o],
		[o, l, o, o, o, o, o],
	],
	"!": [
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, l, l, o, o],
	],
	"'": [
		[o, o, l, l, o, o, o],
		[o, o, o, l, o, o, o],
		[o, o, l, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
	],
	"&": [
		[o, l, l, l, o, o, o],
		[l, o, o, o, l, o, o],
		[o, l, o, l, o, o, o],
		[o, o, l, o, o, o, o],
		[o, l, o, l, o, l, o],
		[l, o, o, o, l, o, o],
		[o, l, l, l, o, l, l],
	],
	".": [
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, l, l, o, o, o],
		[o, o, l, l, o, o, o],
	],
	'"': [
		[o, o, l, o, o, l, o],
		[o, o, l, o, o, l, o],
		[o, o, l, o, o, l, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
	],
	"?": [
		[o, o, l, l, l, o, o],
		[o, l, o, o, o, l, o],
		[o, o, o, o, o, l, o],
		[o, o, o, o, l, o, o],
		[o, o, o, l, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, l, o, o, o],
	],
	"-": [
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[l, l, l, l, l, l, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
	],
	":": [
		[o, o, o, o, o, o, o],
		[o, o, l, l, o, o, o],
		[o, o, l, l, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, o, o, o, o, o],
		[o, o, l, l, o, o, o],
		[o, o, l, l, o, o, o],
	],
	"\\": [
		[l, o, o, o, o, o, o],
		[l, l, o, o, o, o, o],
		[o, l, l, o, o, o, o],
		[o, o, l, l, o, o, o],
		[o, o, o, l, l, o, o],
		[o, o, o, o, l, l, o],
		[o, o, o, o, o, l, o],
	],
	">": [
		[l, o, o, o, o, o, o],
		[l, l, o, o, o, o, o],
		[o, l, l, o, o, o, o],
		[o, o, l, l, o, o, o],
		[o, l, l, o, o, o, o],
		[l, l, o, o, o, o, o],
		[l, o, o, o, o, o, o],
	],
};

class TextBox extends Character {
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
		y,

		/**
		 * Starting Y coordinate.
		 */
		x,

		/**
		 * The string to display.
		 */
		string,

		/**
		 * The color of the string.
		 */
		color = 0xffffff,

		/**
		 * Render one character per tick.
		 */
		typewriter = false,

		rowScroll = false,

		blinkCycle = false,

		scale = 1,
	}) {
		super({ x, y, audio, video, x, y });

		this.setString(string);

		this._blinkCycle = blinkCycle;
		this._offDutyFlag = false;
		this._waitFlag = 0;
		(this._scale = scale), (this.typewriter = typewriter);
		this.color = color;
		this.rowScroll = rowScroll;
	}

	setString = (s = "") => {
		this.string = s;
		this._characters = s
			.split("")
			.map((c) => characterMap[c.toLowerCase()] || c);

		this._characterCount = this._typewriter ? 0 : this._characters.length;

		return this;
	};

	_draw() {
		let row = 0;
		let column = 0;
		const scale = this._scale;

		if (this.rowScroll && this._characterCount % 60 === 0) {
			// Rotate the characters
			for (let i = 0; i < this._characters.length; i++) {
				const character = this._characters[i];

				if (Array.isArray(character)) {
					character.push(character.shift());
				}
			}
		}

		for (
			let characterIndex = 0;
			characterIndex < this._characterCount;
			characterIndex++
		) {
			const character = this._characters[characterIndex];
			const rowCount = character.length;

			if (character === "\n") {
				column = 0;
				row++;

				continue;
			}

			if (
				this.string[characterIndex] === "." ||
				this.string[characterIndex] === ","
			) {
				if (!this._waitFlag && characterIndex === this._characterCount - 1) {
					this._waitFlag = this.string[characterIndex] === "," ? 3 : 6;
				}
			}

			for (let localY = 0; localY < rowCount; localY++) {
				const characterRow = character[localY];
				const pixelCount = characterRow.length;
				for (let localX = 0; localX < pixelCount; localX++) {
					const characterPixel = characterRow[localX];
					if (characterPixel) {
						for (let scaleY = 0; scaleY < scale; scaleY++) {
							for (let scaleX = 0; scaleX < scale; scaleX++) {
								this.video.setPixel(
									scaleX + this._x + (localX * scale) + column * 8 * scale,
									scaleY + this._y + (localY * scale) + row * 8 * scale,
									Array.isArray(this.color) ? this.color[characterIndex % this.color.length] : this.color,
								);
							}
						}
					}
				}
			}

			column++;
		}
	}

	_enforceDutyCycle() {
		if (!this._blinkCycle) {
			return;
		}

		const { onDutyCycles, offDutyCycles } = this._blinkCycle;

		if (this._cycleCount % (onDutyCycles + offDutyCycles) === 0) {
			// Off Duty
			this._offDutyFlag = true;
		} else if (this._cycleCount % onDutyCycles === 0) {
			// On Duty
			this._offDutyFlag = false;
		}
	}

	_tick() {
		this._enforceDutyCycle();

		if (this._offDutyFlag) {
			return;
		}

		if (this._waitFlag) {
			this._waitFlag -= 1;
		}

		if (
			!this._waitFlag &&
			this._cycleCount % 5 === 0 &&
			this._characterCount < this._characters.length
		) {
			this._characterCount++;
			this.audio.playRing({ frequencies: [700, 650], millis: 30, gain: 0.02 });
		}

		this._draw();
	}
}

export default TextBox;
