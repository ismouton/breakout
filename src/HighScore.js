import Character from "./Character";
import TextBox from "./Text";

class HighScore extends Character {
	constructor({
		highScoresList = [
			// 1
			["Name1", 119001],
			// 2
			["Name2", 32646],
			// 3
			["Name3", 7001],
			// 4
			["Name4", 6001],
			// 5
			["Name5", 5001],
			// 6
			["Name6", 4001],
			// 7
			["Name7", 3001],
			// 8
			["Name7", 2001],
			// 9
			["Name9", 1001],
			// 10
			["Name10", 1],
		],
	}) {
		super(...arguments);

		this.objects = [];
		this._highScoresList = [];

		const ranks = [
			"1st",
			"2nd",
			"3rd",
			"4th",
			"5th",
			"6th",
			"7th",
			"8th",
			"9th",
			"10th",
		];

		const nameColumn = 12;
		const rankColumn = 4;
		const scoreColumn = 28;
		const headerRow = 6;

		this.objects.push(
			new TextBox({
				scale: 1,
				audio: this.audio,
				video: this.video,
				x: 8 * rankColumn + this.x,
				y: 8 * headerRow + this.y,
				string: `Rank`,
				color: 0xff0000,
			}),
			new TextBox({
				scale: 1,
				audio: this.audio,
				video: this.video,
				x: 8 * nameColumn + this.x,
				y: 8 * headerRow + this.y,
				string: `Name`,
				color: 0xff0000,
			}),
			new TextBox({
				scale: 1,
				audio: this.audio,
				video: this.video,
				x: 8 * scoreColumn + this.x,
				y: 8 * headerRow + this.y,
				string: `Score`,
				color: 0xff0000,
			}),
			new TextBox({
				scale: 1,
				audio: this.audio,
				video: this.video,
				x: 8 * 13 + this.x,
				y: 8 * 1 + this.y,
				string: `- High Scores -`,
				color: 0xff0000,
			})
		);

		const maxScoreLength = Math.max(
			highScoresList.reduce((accumulator, [, score]) => {
				return Math.max(accumulator, score.toString().length);
			}, 0),
			5
		);

		for (let i = 0; i < highScoresList.length; i++) {
			const score = highScoresList[i];
			const row = 16 * (i + 1) + 2;
			const scoreString = score[1].toString();
			const scorePadding = new Array(maxScoreLength - scoreString.length)
				.fill(" ")
				.join("");

			this.objects.push(
				new TextBox({
					scale: 1,
					audio: this.audio,
					video: this.video,
					x: 8 * rankColumn + this.x,
					y: row + 8 * headerRow + this.y,
					string: ranks[i],
					color: 0xffffff,
				}),
				new TextBox({
					scale: 1,
					audio: this.audio,
					video: this.video,
					x: 8 * scoreColumn + this.x,
					y: row + 8 * headerRow + this.y,
					string: scorePadding + scoreString,
					color: 0xffff33,
				}),
				new TextBox({
					scale: 1,
					audio: this.audio,
					video: this.video,
					x: 8 * nameColumn + this.x,
					y: row + 8 * headerRow + this.y,
					string: score[0],
					color: 0xffffff,
				})
			);
		}
	}

	_draw() {
		this.objects.forEach((o) => o.tick());
	}

	_tick() {
		this._draw();
	}
}

export default HighScore;
