import Character from "./Character";
import MouseInteractive from "./MouseInteractive";
import TextBox from "./Text";

class TitleScreen extends Character {
	constructor({ startCallback, context }) {
		super(...arguments);

		this.startCallback = startCallback;
		this.x = 0;
		this.y = 0;

		this.scrollUpFlag = false;

		this.objects = [];
		this.objects.push(
			new TextBox({
				context,
				scale: 1,
				x: 8 * 5,
				y: 8 * 3,
				string: `Shane's`,
			}),
			new TextBox({
				context,
				scale: 4,
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
				context,
				blinkCycle: {
					onDutyCycles: 45,
					offDutyCycles: 45,
				},
				x: 8 * 15,
				y: 8 * 16,
				string: `Push start`,
			}),
			new TextBox({
				context,
				x: 8 * 27,
				y: 8 * 29,
				string: `2021 ismouton`,
			}),
			new MouseInteractive({ context, x: 150, y: 150 })
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

	_handleInput = async () => {
		if (!this._context.keyboard.inputMap.Enter) {
			return;
		}

		this.scrollUpFlag = true;

		await this._context.audio.playTrill(100);

		this.startCallback && this.startCallback();
		this.destroy();
		this.reap();
	};

	_tick() {
		this._handleInput();
		this._draw();
	}
}

export default TitleScreen;
