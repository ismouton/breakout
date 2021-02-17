import "./styles.css";
import Audio from "./Audio";
import Video from "./Video";
import Paddle from "./Paddle";
import TextBox from "./Text";
import Ball from "./Ball";

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
	const video = new Video(canvas, { scale: 4, width, height, background: 0x111111 });
	const paddle0 = new Paddle({ width: 48, video, audio, y: 220, rightBounds: width, height: 12 });
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

	// const multiLineText = new TextBox({
	// 	video,
	// 	audio,
	// 	x: 4,
	// 	y: 100,
	// 	string:
	// 		"This is a longer string.\nI wonder, if commas help readability.\n\nProbably not!",
	// 	color: 0xff66ff,
	// 	typewriter: true,
  // });
  
  const ball = new Ball({ video, audio, x: 154, y: 200, width: 16, });

	let score = 0;
	const renderLoop = () => {
		const objects = [
			new TextBox({
				video,
				audio,
				x: 16,
				y: 4,
				string: `X: ${paddle0.x.toString()}`,
			}),
			new TextBox({
				video,
				audio,
				x: 80,
				y: 4,
				string: `Y: ${paddle0.y.toString()}`,
			}),
			// multiLineText,
      paddle0,
      ball,
			// paddle1,
		];

		// video.clear(0x333333);

    // video.renderStatic();

		objects.forEach((o) => o.tick());
		video.sync();

		requestAnimationFrame(renderLoop);
	};

	renderLoop();
}
