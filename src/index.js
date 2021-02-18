import "./styles.css";
import Audio from "./Audio";
import Video from "./Video";
import Paddle from "./Paddle";
import TextBox from "./Text";
import Ball from "./Ball";
import Block from "./Block";

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
		y: 220,
		rightBounds: width,
		height: 12,
	});
	// const paddle1 = new Paddle({ video, audio, y: 32, color: 0xff0ff });

	const inputMap = {
		ArrowLeft: [
			{
				keydown: paddle0.pressLeft,
				keyup: paddle0.releaseLeft,
			},
			// {
			// 	keydown: paddle1.pressRight,
			// 	keyup: paddle1.releaseRight,
			// },
		],
		ArrowRight: [
			{
				keydown: paddle0.pressRight,
				keyup: paddle0.releaseRight,
			},
			// {
			// 	keydown: paddle1.pressLeft,
			// 	keyup: paddle1.releaseLeft,
			// },
		],
		Space: [],
	};

	// audio.playNoise();
	document.addEventListener("keydown", (e) => {
		const { code: key } = e;

		const keyMaps = inputMap[key];

		if (keyMaps) {
			keyMaps.forEach((k) => k.keydown());
		}
	});

	document.addEventListener("keyup", (e) => {
		const { code: key } = e;

		const keyMaps = inputMap[key];

		if (keyMaps) {
			keyMaps.forEach((k) => k.keyup());
		}
	});

	const multiLineText = new TextBox({
		video,
		audio,
		x: 4,
		y: 100,
		string:
			"This is a longer string.\nI wonder, if commas help readability.\n\nProbably not!",
		color: 0xff66ff,
		typewriter: true,
	});

	const block = new Block({
		video,
		audio,
		width: 1,
		height: 120,
		x: 100,
		y: 10,
	});
	const block1 = new Block({
		video,
		audio,
		width: 6,
		height: 160,
		x: 160,
		y: 10,
	});
	// const back

	const blockColors = [
		0xFF0000,
		0x00FF00,
		0x0000FF,
		0xFF00FF,
		0xFFFF00,
		0x00FFFF,
	];

	const blocks = [];
	for (let y = 0; y < 9; y++) {
		const width = 32;
		const height = 8;
		for (let x = 0; x < 10; x++) {
			const block = new Block({
				video,
				audio,
				width,
				height,
				y: y * height + 16,
				x: x * width,
				color: blockColors[y % (blockColors.length  -1)],
				borderColor: 0x000000,
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
		{ bounds: { minY: height, maxY: height, minX: 0, maxX: width } },
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
		xVelocity: -1,
		video,
		audio,
		x: 154,
		y: 200,
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

	const renderLoop = () => {
		[
			new TextBox({
				video,
				audio,
				x: 269,
				y: 4,
				string: `X: ${paddle0.x.toString()}`,
			}),
			new TextBox({
				video,
				audio,
				x: 4,
				y: 4,
				string: `Score: ${score.toString()}`,
			}),
			...objects,
		].forEach((o) => o.tick());

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
				objects.splice(i, 1);
			}
		}

		video.sync();

		requestAnimationFrame(renderLoop);
	};

	renderLoop();
}
