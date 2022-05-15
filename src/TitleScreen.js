import Character from "./Character";
import MouseInteractive from "./MouseInteractive";
import TextBox from "./Text";
import { noop } from "./utils";

class TitleScreen extends Character {
	name = 'TitleScreen';
	constructor({ startCallback = noop, context }) {
		super(...arguments);

		this._reapCB = startCallback;
		this.x = 0;
		this.y = 0;

		this.scrollUpFlag = false;

		const titleText = new TextBox({
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
		});
		this.titleText = titleText;

		this.objects = [];

		this.objects.push(
			new TextBox({
				context,
				scale: 1,
				x: 8 * 5,
				y: 8 * 3,
				string: `Shane's`,
			}),
			titleText,
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
				x: 8 * 26,
				y: 8 * 28,
				string: `2022 ismouton`,
			}),
			// new MouseInteractive({ context, x: 150, y: 150 })
		);
	}

	_playTrill() {
		return this._context.audio.playTrill(100);
	}

	_draw() {
		this.objects.forEach((o) => o.tick());

		if (this.scrollUpFlag) {
			const scrollSpeed = -6;
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
		this._handleInput = noop;

		this.scrollUpFlag = true;
		await this._playTrill();

		setTimeout(() => {
			this.destroy();
			this.reap();
		}, 2 * 1000);

	};

	_tick() {
		this._handleInput();
		this._draw();
	}
}

export default TitleScreen;
