import Character from "./Character";
import TextBox from "./Text";

class TitleScreen extends Character {
	constructor({ startCallback }) {
		super(...arguments);

		this.startCallback = startCallback;
		this.x = 0;
		this.y = 0;

		this.scrollUpFlag = false;

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
				color: [
					0xff00ff,
					0xffff00,
					0x00ffff,
					0xff0000,
					0x00ff00,
					0xff8000,
					0x2222ff,
					0xffff00,
				],
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

		if (this.scrollUpFlag) {
			const scrollSpeed = -4;
			this.y += scrollSpeed;
			if (this.y < -240) {
				this.destroy();

				return;
			}

			for (let i = 0; i < this.objects.length; i++) {
				const object = this.objects[i];

				object.y += scrollSpeed;
			}
		}
	}

	start = async () => {
		this.scrollUpFlag = true;

		// await this.audio.playTrill(100);

		// this.startCallback && this.startCallback();
		// this.destroy();
	};

	_tick() {
		this._draw();
	}
}

export default TitleScreen;
