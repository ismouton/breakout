import Character from "../Character";

import TextBox from "../Text";
import Ball from "../Ball";
import loadLevel from "./levels";
import { noop } from "../utils";

class GameArea extends Character {
	name = 'GameArea'
	constructor({ context, onEnd = noop }) {
		super(...arguments);
		context.keyboard.setContinuousMode();
		this._onEnd = onEnd;
		this.life = 5;
		this.score = 0;
		this.level = 0;

		this.flagCounter = 0;
		this.flag = 'ready';

		this.scoreText = new TextBox({
			context,
			x: 4,
			y: 4,
		});

		this.lifeText = new TextBox({
		context,
			x: 260,
			y: 4,
		});

		this.endText = new TextBox({
			context,
			x: 140,
			y: 135,
			blinkCycle: {
				onDutyCycles: 5,
				offDutyCycles: 10,
			},
		});

		this.goText = new TextBox({
			context,
			x: 150,
			y: 135,
		});

		this.loseText = new TextBox({
			context,
			x: 125,
			y: 135,
		});

		this.stageText = new TextBox({
			context,
			x: 125,
			y: 135,
		});

		this._loadLevel(this.level);
	}

	_loadLevel(number) {
		console.log('Loading level: ', number);
		const {
			balls,
			blocks,
			objects,
			collisionObjects,
		} = loadLevel(this._context, number);

		this.balls = balls;
		this.blocks = blocks;
		this.objects = objects;
		this.collisionObjects = collisionObjects;
	}

	_draw() {
		const lifeEnd = this.balls.every(o => o.dead);
		const stageCleared = this.blocks.every(o => o.dead);

		this.objects.forEach((o) => {
			if (['ready', 'go'].includes(this.flag) && ['Ball'].includes(o.name)) {
				return;
			}

			o.tick();
		});

		this.balls = this.balls.filter((o) => !o.dead);
		this.objects = this.objects.filter((o) => !o.dead);
		this.scoreText.setString(`Score ${this.score.toString()}`).tick();
		this.lifeText.setString(`Lives ${this.life.toString()}`).tick();

		if (!['ready', 'go', 'gameEnd'].includes(this.flag) && lifeEnd) {
			this.flag = 'ready';
			this.flagCounter = 0;
			this.life--;
		}

		if ((!['stageCleared', 'beginStage'].includes(this.flag) && stageCleared)) {
			this.flag = 'stageCleared';
		}

		if (this.life === 0) {
			this.flag = 'gameEnd';
		}

		switch (this.flag) {
			case 'stageCleared':
				this.stageText.setString('Cleared').tick();

				setTimeout(() => {
					this.flag = 'beginStage';
					this.flagCounter = 0;
				}, 1500);
			break;
			case 'beginStage':
				this.stageText.setString(`Stage ${this.level}`).tick();

				if (this.flagCounter === 120) {
					this.flag = 'ready';
					this._loadLevel(++this.level);
					this.flagCounter = 0;
				}
			break;
			case 'gameEnd':
				this.loseText.setString('You Lose!').tick();
				setTimeout(() => {
					this._onEnd();
					this._onEnd = noop;
				}, 5000);
			break;
			case 'ready':
				this.endText.setString(`READY?`).tick();

				if (this.flagCounter === 120) {
					this.flagCounter = 0;
					this.flag = 'go';
				}
			break;

			case 'go':
				this.goText.setString(`GO!`).tick();

				if (this.flagCounter === 120) {
					this.flagCounter = 0;
					this.flag = 'run';

					for (let i = 0; i < 1; i++) {
						const ball = new Ball({
							size: 6,
							context: this._context,
							x: 154 - i * 1,
							y: 200 - i * 1,
							width: 1,
							collisionObjects: this.collisionObjects,
						});

						this.objects.push(ball);
						this.balls.push(ball);
					}
				}

			break
			case 'run':
			break;
			default:
				break;
		}

		this.flagCounter++;

		if (stageCleared) {
			// console.log('stageCleared');
		}
	}

	_tick() {
		this._draw();

		for (let i = 0; i < this.collisionObjects.length; i++) {
			const collisionObject = this.collisionObjects[i];

			if (collisionObject.dead) {
				this.score += 100;
				collisionObject.reap();
				this.collisionObjects.splice(i, 1);
			}
		}
	}
}

export default GameArea;
