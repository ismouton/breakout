import "./styles.css";
import Audio from "./Audio";
import Video from "./Video";
import Paddle from "./Paddle";
import TextBox from "./Text";
import Ball from "./Ball";
import Block from "./Block";
import TitleScreen from "./TitleScreen";
import HighScore from "./HighScore";
import InputGrid from "./InputGrid";

let blocksDestroyed = 0;

const audio = new Audio();
document.addEventListener("DOMContentLoaded", bootApp);

const width = 320;
const height = 240;

function bootApp() {
	document.body.innerHTML = /*html*/ `
    <canvas>
    </canvas>
  `;

	const canvas = document.body.querySelector("canvas");
	const video = new Video(canvas, {
		scale: 4,
		width,
		height,
		background: 0x111111,
	});
	const paddle0 = new Paddle({
		width: 48,
		video,
		audio,
		x: (320 - 48) / 2,
		y: 220,
		rightBounds: width,
		height: 12,
	});
	// const paddle1 = new Paddle({ video, audio, y: 32, color: 0xff0ff });

	const titleScreen = new TitleScreen({
		audio,
		video,
	});

	const highScore = new HighScore({
		x: 0,
		y: 0,
		audio,
		video,
	});

	const inputMap = {};

	// audio.playNoise();
	document.addEventListener("keydown", (e) => {
		const { code: key } = e;

		inputMap[key] = true;
	});

	document.addEventListener("keyup", (e) => {
		const { code: key } = e;

		delete inputMap[key];
	});

	const context = {
		audio,
		video,
		inputMap,
	};

	const inputGrid = new InputGrid({
		context,
		x: 32,
		y: 32,
	});

	const blockColors = [
		0xff0000,
		0x00ff00,
		0x0000ff,
		0xff00ff,
		0xffff00,
		0x00ffff,
	];

	const blocks = [];
	for (let y = 0; y < 9; y++) {
		const width = 32;
		const height = 10;
		for (let x = 0; x < 10; x++) {
			const block = new Block({
				video,
				audio,
				width,
				height,
				y: y * height + 16,
				x: x * width,
				color: blockColors[y % (blockColors.length - 1)],
				borderColor: 0x000000,
				onReap: () => blocksDestroyed++,
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
		video,
		audio,
		x: 154,
		y: 200,
		width: 16,
		collisionObjects,
	});
	const ball1 = new Ball({
		xVelocity: 1,
		video,
		audio,
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
		video,
		audio,
		x: 4,
		y: 4,
	});

	const renderArray = [];

	const renderLoop = () => {
		renderArray.length = 0;

		if (!titleScreen.dead) {
			// renderArray.push(titleScreen);
			renderArray.push(inputGrid);
		} else {
			renderArray.push(
				new TextBox({
					video,
					audio,
					x: 269,
					y: 4,
					string: `X: ${paddle0.x.toString()}`,
				}),
				scoreText.setString(`Score: ${score.toString()}`),
				...objects,
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

		video.sync();

		requestAnimationFrame(renderLoop);
	};

	renderLoop();
}
