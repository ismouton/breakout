import "./styles.css";

import MouseSprite from "./Mouse";
import Context from "./Context";
import Breakout from "./Breakout";
import TitleScreen from "./TitleScreen";
import InputGrid from "./InputGrid";
import HighScore from "./HighScore";

document.addEventListener("DOMContentLoaded", bootApp);

let highScoresList =[
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
];

function bootApp() {
	document.body.innerHTML = /*html*/ `
		<canvas>
		</canvas>
	`;

	const canvas = document.body.querySelector("canvas");
	const context = new Context({ canvas });
	const getGameInstance = () => new TitleScreen({
		onEachCycle() {
			if (this._cycleCount % 60 === 0) {
				/* Rotate colors. */
				this.titleText.color.unshift(
					this.titleText.color.pop()
				);
			}
		},
		context,
		x: 0,
		y: 0,
		startCallback() {
			this.dead = true;
			renderArray.unshift(
				new Breakout({
					x: 0,
					y: 0,
					context,
					onEnd() {
						this.dead = true;
						const that = this;
						renderArray.unshift(
								new InputGrid({
								x: 48,
								y: 85,
								context,
								onEnd(name) {
									highScoresList.push([name, that.score]);
									highScoresList = highScoresList.sort(([,a], [,b]) => b - a).slice(0, 10);
									this.dead = true;
									renderArray.unshift(
										new HighScore({
											context,
											x: 0,
											y: 0,
											highScoresList,
											onEachCycle() {
												if (this._cycleCount < 300) {
													return;
												}
												this.dead = true;
												renderArray.push(getGameInstance());
											}
										})
									);
								},
							})
						);
					},
				})
			);
		}
	})

	const mouse = new MouseSprite({
		context,
	});

	let renderArray = [
		getGameInstance(),
		mouse,
	];

	const renderLoop = () => {
		renderArray.forEach((o) => o.dead && o.reap());
		renderArray = renderArray.filter((o) => !o.dead);

		renderArray.forEach((o) => o.tick && o.tick());
		context.video.sync();
		requestAnimationFrame(renderLoop);
	};

	renderLoop();
}
