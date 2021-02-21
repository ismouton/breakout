import Character from "./Character";
import TextBox from "./Text";

class TitleScreen extends Character {
	constructor() {
		super(...arguments);
		this.x = 240;
		this.y = 10;

		this.objects = [];
		this.objects.push(
			new TextBox({
				scale: 1,
				audio: this.audio,
				video: this.video,
				x: 8 * 5,
				y: 8 * 3,
				string: `Shane's`,
			}),
			new TextBox({
				scale: 4,
				audio: this.audio,
				video: this.video,
				x: 8 * 5,
				y: 8 * 4,
				string: `breakout`,
				color: [0xff00ff, 0xffff00, 0x00ffff, 0xff0000, 0x00ff00, 0x2222ff],
			}),
			new TextBox({
				blinkCycle: {
					onDutyCycles: 45,
					offDutyCycles: 45,
				},
				audio: this.audio,
				video: this.video,
				x: 8 * 15,
				y: 8 * 16,
				string: `Push start`,
			}),
			new TextBox({
				audio: this.audio,
				video: this.video,
				x: 8 * 27,
				y: 8 * 29,
				string: `2021 ismouton`,
			})
		);
	}

	_draw() {
		this.objects.forEach((o) => o.tick());
		// console.log('tick', this._cycleCount);
		// const legLength = 5;

		// if (this._cycleCount % 3 === 0) {
		//         for (let i = 0; i < legLength; i++) {
		//                 this.video.setPixel(this.x + i, this.y, 0xFF00FF);
		//                 this.video.setPixel(this.x, this.y + i, 0xFF00FF);
		//                 this.video.setPixel(this.x - i, this.y, 0xFF00FF);
		//                 this.video.setPixel(this.x, this.y - i, 0xFF00FF);
		//         }
		// } else {
		//         for (let i = 0; i < legLength - 2; i++) {
		//                 this.video.setPixel(this.x + i, this.y + i, 0xFF00FF);
		//                 this.video.setPixel(this.x - i, this.y - i, 0xFF00FF);

		//                 this.video.setPixel(this.x + i, this.y - i, 0xFF00FF);
		//                 this.video.setPixel(this.x - i, this.y + i, 0xFF00FF);
		//         }
		// }
	}

	_handleInput() {
		/* Should use menu component */
	}

	_tick() {
		this._handleInput();
		this._draw();

		this.x -= 1;
	}
}

export default TitleScreen;
