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
		[o, o, l, l, o, o, o],
		[o, o, o, l, o, o, o],
		[o, o, l, o, o, o, o],
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
		color = 0xFFFFFF,

		/**
		 * Render one character per tick.
		 */
		typewriter = false,
	}) {
		super({ x, y, audio, video, x, y });

		this.string = string;

		this._characters = string.split('')
			.map(c => characterMap[c.toLowerCase()] || c);

		this._waitFlag = 0;
		this._tick = 0;
		this.typewriter = typewriter;
		this.color = color;
		this._characterCount = typewriter ? 0 : this._characters.length;
	}

	_draw() {
		let row = 0;
		let column = 0
		for (let characterIndex = 0; characterIndex < this._characterCount; characterIndex++) {
			const character = this._characters[characterIndex];
			const rowCount = character.length;

			if (character === "\n") {
				column = 0;
				row++;

				continue;
			}

			if (this.string[characterIndex] === "." || this.string[characterIndex] === ",") {
				if (!this._waitFlag && characterIndex === this._characterCount - 1) {
					this._waitFlag = this.string[characterIndex] === "," ? 3 : 6;
				}
			}

			column++;

			for (let localY = 0; localY < rowCount; localY++) {
				const characterRow = character[localY];
				const pixelCount = characterRow.length;
				for (let localX = 0; localX < pixelCount; localX++) {
					const characterPixel = characterRow[localX];
					if (characterPixel) {
						this.video.setPixel(this._x + localX + (column * 8), this._y + localY + (row * 8), this.color);
					}
				}
			}
		}
	}

	tick() {
		if (this._waitFlag) {
			this._waitFlag -= 1;
		}
		
		if (!this._waitFlag && this._tick % 5 === 0 && this._characterCount < this._characters.length) {
			this._characterCount++;
			this.audio.playRing({ frequencies: [700, 650], millis: 30, gain: 0.02 });
		}

		this._draw();

		this._tick++;
	}
}

export default TextBox;
