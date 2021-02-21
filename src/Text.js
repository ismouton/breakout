import Character from "./Character";

// const   = false;
const W = true;
const characterMap = {
	" ": [
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
	],
	0: [
		[ ,  , W, W, W,  ,  ],
		[ , W,  ,  , W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  , W,  , W, W],
		[W, W,  ,  ,  , W, W],
		[ , W, W,  ,  , W,  ],
		[ ,  , W, W, W,  ,  ],
	],
	1: [
		[ ,  ,  , W, W,  ,  ],
		[ ,  , W, W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ , W, W, W, W, W, W],
	],
	2: [
		[ , W, W, W, W, W,  ],
		[W, W,  ,  ,  , W, W],
		[ ,  ,  ,  , W, W, W],
		[ ,  , W, W, W, W,  ],
		[ , W, W, W, W,  ,  ],
		[W, W, W,  ,  ,  ,  ],
		[W, W, W, W, W, W, W],
	],
	3: [
		[ , W, W, W, W, W, W],
		[ ,  ,  ,  , W, W,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  , W, W, W, W,  ],
		[ ,  ,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[ , W, W, W, W, W,  ],
	],
	4: [
		[ ,  ,  , W, W, W,  ],
		[ ,  , W, W, W, W,  ],
		[ , W, W,  , W, W,  ],
		[W, W,  ,  , W, W,  ],
		[W, W, W, W, W, W, W],
		[ ,  ,  ,  , W, W,  ],
		[ ,  ,  ,  , W, W,  ],
	],
	5: [
		[W, W, W, W, W, W,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W, W, W, W, W,  ],
		[ ,  ,  ,  ,  , W, W],
		[ ,  ,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[ , W, W, W, W, W,  ],
	],
	6: [
		[ ,  , W, W, W, W,  ],
		[ , W, W,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W, W, W, W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[ , W, W, W, W, W,  ],
	],
	7: [
		[W, W, W, W, W, W, W],
		[W, W,  ,  ,  , W, W],
		[ ,  ,  ,  , W, W,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
	],
	8: [
		[ , W, W, W, W,  ,  ],
		[W, W,  ,  ,  , W,  ],
		[W, W, W,  ,  , W,  ],
		[ , W, W, W, W,  ,  ],
		[W,  ,  ,  ,  , W, W],
		[W,  ,  ,  ,  , W, W],
		[ , W, W, W, W, W,  ],
	],
	9: [
		[ , W, W, W, W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[ , W, W, W, W, W, W],
		[ ,  ,  ,  ,  , W, W],
		[ ,  ,  ,  , W, W,  ],
		[ , W, W, W, W,  ,  ],
	],
	a: [
		[ ,  , W, W, W,  ,  ],
		[ , W, W,  , W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W, W, W, W, W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
	],
	b: [
		[W, W, W, W, W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W, W, W, W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W, W, W, W, W,  ],
	],
	c: [
		[ ,  , W, W, W, W,  ],
		[ , W, W,  ,  , W, W],
		[W, W,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[ , W, W,  ,  , W, W],
		[ ,  , W, W, W, W,  ],
	],
	d: [
		[W, W, W, W, W,  ,  ],
		[W, W,  ,  , W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  , W, W,  ],
		[W, W, W, W, W,  ,  ],
	],
	e: [
		[W, W, W, W, W, W, W],
		[W, W,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W, W, W, W, W,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W, W, W, W, W, W],
	],
	f: [
		[W, W, W, W, W, W, W],
		[W, W,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W, W, W, W, W,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
	],
	g: [
		[ ,  , W, W, W, W, W],
		[ , W, W,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W,  ,  , W, W, W],
		[W, W,  ,  ,  , W, W],
		[ , W, W,  ,  , W, W],
		[ ,  , W, W, W, W, W],
	],
	h: [
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W, W, W, W, W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
	],
	i: [
		[ ,  , W, W, W, W,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  , W, W, W, W,  ],
	],
	j: [
		[ ,  ,  , W, W, W, W],
		[ ,  ,  ,  ,  , W, W],
		[ ,  ,  ,  ,  , W, W],
		[ ,  ,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[ , W, W, W, W, W,  ],
	],
	k: [
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  , W, W,  ],
		[W, W,  , W, W,  ,  ],
		[W, W, W, W,  ,  ,  ],
		[W, W,  , W, W,  ,  ],
		[W, W,  ,  , W, W,  ],
		[W, W,  ,  ,  , W, W],
	],
	l: [
		[ , W, W,  ,  ,  ,  ],
		[ , W, W,  ,  ,  ,  ],
		[ , W, W,  ,  ,  ,  ],
		[ , W, W,  ,  ,  ,  ],
		[ , W, W,  ,  ,  ,  ],
		[ , W, W,  ,  ,  ,  ],
		[ , W, W, W, W, W, W],
	],
	m: [
		[W, W,  ,  ,  , W, W],
		[W, W, W,  , W, W, W],
		[W, W, W, W, W, W, W],
		[W, W, W, W, W, W, W],
		[W, W,  , W,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
	],
	n: [
		[W, W,  ,  ,  , W, W],
		[W, W, W,  ,  , W, W],
		[W, W, W, W,  , W, W],
		[W, W, W, W, W, W, W],
		[W, W,  , W, W, W, W],
		[W, W,  ,  , W, W, W],
		[W, W,  ,  ,  , W, W],
	],
	 o: [
		[ , W, W, W, W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[ , W, W, W, W, W,  ],
	],
	p: [
		[W, W, W, W, W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W, W, W, W, W,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
	],
	q: [
		[ , W, W, W, W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  , W, W, W, W],
		[W, W,  ,  , W, W,  ],
		[ , W, W, W, W,  , W],
	],
	r: [
		[W, W, W, W, W, W,  ],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W, W, W, W, W,  ],
		[W, W,  , W, W,  ,  ],
		[W, W,  ,  , W, W,  ],
		[W, W,  ,  ,  , W, W],
	],
	s: [
		[ , W, W, W, W,  ,  ],
		[W, W,  ,  , W, W,  ],
		[W, W,  ,  ,  ,  ,  ],
		[ , W, W, W, W, W,  ],
		[ ,  ,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[ , W, W, W, W, W,  ],
	],
	t: [
		[W, W, W, W, W, W,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
	],
	u: [
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[ , W, W, W, W, W,  ],
	],
	v: [
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W, W,  , W, W, W],
		[ , W, W, W, W, W,  ],
		[ ,  , W, W, W,  ,  ],
		[ ,  ,  , W,  ,  ,  ],
	],
	w: [
		[W, W,  ,  ,  , W, W],
		[W, W,  ,  ,  , W, W],
		[W, W,  , W,  , W, W],
		[W, W, W, W, W, W, W],
		[W, W, W, W, W, W, W],
		[W, W, W,  , W, W, W],
		[W, W,  ,  ,  , W, W],
	],
	x: [
		[W, W,  ,  ,  , W, W],
		[W, W, W,  , W, W, W],
		[ , W, W, W, W, W,  ],
		[ ,  , W, W, W,  ,  ],
		[ , W, W, W, W, W,  ],
		[W, W, W,  , W, W, W],
		[W, W,  ,  ,  , W, W],
	],
	y: [
		[ , W, W,  ,  , W, W],
		[ , W, W,  ,  , W, W],
		[ , W, W,  ,  , W, W],
		[ ,  , W, W, W, W,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
	],
	z: [
		[W, W, W, W, W, W, W],
		[ ,  ,  ,  , W, W, W],
		[ ,  ,  , W, W, W,  ],
		[ ,  , W, W, W,  ,  ],
		[ , W, W, W,  ,  ,  ],
		[W, W, W,  ,  ,  ,  ],
		[W, W, W, W, W, W, W],
	],
	",": [
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ , W, W,  ,  ,  ,  ],
		[ ,  , W,  ,  ,  ,  ],
		[ , W,  ,  ,  ,  ,  ],
	],
	"!": [
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  , W, W,  ,  ],
	],
	"'": [
		[ ,  , W, W,  ,  ,  ],
		[ ,  ,  , W,  ,  ,  ],
		[ ,  , W,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
	],
	"&": [
		[ , W, W, W,  ,  ,  ],
		[W,  ,  ,  , W,  ,  ],
		[ , W,  , W,  ,  ,  ],
		[ ,  , W,  ,  ,  ,  ],
		[ , W,  , W,  , W,  ],
		[W,  ,  ,  , W,  ,  ],
		[ , W, W, W,  , W, W],
	],
	".": [
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
	],
	'"': [
		[ ,  , W,  ,  , W,  ],
		[ ,  , W,  ,  , W,  ],
		[ ,  , W,  ,  , W,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
	],
	"?": [
		[ ,  , W, W, W,  ,  ],
		[ , W,  ,  ,  , W,  ],
		[ ,  ,  ,  ,  , W,  ],
		[ ,  ,  ,  , W,  ,  ],
		[ ,  ,  , W,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  , W,  ,  ,  ],
	],
	"-": [
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[W, W, W, W, W, W,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
	],
	":": [
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  ,  ,  ,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
	],
	"\\": [
		[W,  ,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[ , W, W,  ,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ ,  ,  , W, W,  ,  ],
		[ ,  ,  ,  , W, W,  ],
		[ ,  ,  ,  ,  , W,  ],
	],
	">": [
		[W,  ,  ,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[ , W, W,  ,  ,  ,  ],
		[ ,  , W, W,  ,  ,  ],
		[ , W, W,  ,  ,  ,  ],
		[W, W,  ,  ,  ,  ,  ],
		[W,  ,  ,  ,  ,  ,  ],
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
