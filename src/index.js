import "./styles.css";

import Paddle from "./Paddle";
import TextBox from "./Text";
import Ball from "./Ball";
import Block from "./Block";
import TitleScreen from "./TitleScreen";
import HighScore from "./HighScore";
import InputGrid from "./InputGrid";
import MouseSprite from "./Mouse";
import Context from "./Context";

document.addEventListener("DOMContentLoaded", bootApp);

function bootApp() {
	document.body.innerHTML = /*html*/ `
		<canvas>
		</canvas>
	`;

	const canvas = document.body.querySelector("canvas");

	const context = new Context({ canvas });
	const titleScreen = new TitleScreen({
		context,
		onReap: () => context.keyboard.setContinuousMode(),
	});

	const { width, height } = context.video;

	const inputGrid = new InputGrid({
		context,
		x: 48,
		y: 96,
	});

	const mouse = new MouseSprite({
		context,
	});

	const blockColors = [
		0xff0000,
		0x00ff00,
		0x0000ff,
		0xff00ff,
		0xffff00,
		0x00ffff,
	];

	const paddle0 = new Paddle({
		context,
		width: 48,
		x: (320 - 48) / 2,
		y: 220,
		rightBounds: width,
		height: 12,
	});

	const highScore = new HighScore({
		context,
		x: 0,
		y: 0,
	});

	const blocks = [];
	for (let y = 0; y < 9; y++) {
		const width = 32;
		const height = 10;
		for (let x = 0; x < 10; x++) {
			const block = new Block({
				context,
				width,
				height,
				y: y * height + 16,
				x: x * width,
				color: blockColors[y % (blockColors.length - 1)],
				borderColor: 0x000000,
				onReap: () => context.state.blocksDestroyed++,
			});

			blocks.push(block);
		}
	}

	let collisionObjects = [
		paddle0,
		...blocks,
		// block,
		// block1,
		// Left wall
		{ bounds: { minY: 0, maxY: height, minX: 0, maxX: 0 } },
		// Right wall
		{ bounds: { minY: 0, maxY: height, minX: width, maxX: width } },
		// Top wall
		{ bounds: { minY: 0, maxY: 0, minX: 0, maxX: width } },
		// Bottom wall
		// { bounds: { minY: height, maxY: height, minX: 0, maxX: width } },
	];

	const ball = new Ball({
		context,
		x: 154,
		y: 200,
		width: 16,
		collisionObjects,
	});
	const ball1 = new Ball({
		context,
		xVelocity: 1,
		x: 154,
		y: 10,
		width: 16,
		collisionObjects,
	});

	let score = 0;

	let objects = [
		// multiLineText,
		paddle0,
		...blocks,
		// multiLineText,
		ball1,
		ball,
		// paddle1,
	];

	let scoreText = new TextBox({
		context,
		x: 4,
		y: 4,
	});

	const renderArray = [mouse];

	const renderLoop = () => {
		renderArray.length = 0;

		if (!titleScreen.dead) {
			renderArray.push(titleScreen, mouse);
			// renderArray.push(inputGrid, mouse);
		} else {
			renderArray.push(
				new TextBox({
					context,
					x: 269,
					y: 4,
					string: `X: ${paddle0.x.toString()}`,
				}),
				scoreText.setString(`Score: ${score.toString()}`),
				...objects,
				mouse
			);
		}

		renderArray.forEach((o) => o.tick && o.tick());

		/* reap dead objects */
		for (let i = 0; i < collisionObjects.length; i++) {
			const collisionObject = collisionObjects[i];

			if (collisionObject.dead) {
				collisionObjects.splice(i, 1);
			}
		}

		for (let i = 0; i < objects.length; i++) {
			const object = objects[i];

			if (object.dead) {
				score += 100;
				object.reap();
				objects.splice(i, 1);
			}
		}

		context.video.sync();

		requestAnimationFrame(renderLoop);
	};

	renderLoop();
}
