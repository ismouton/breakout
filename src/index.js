import "./styles.css";
import Audio from "./Audio";
import Video from "./Video";
import Paddle from "./Paddle";
import TextBox from "./Text";

const audio = new Audio();
document.addEventListener("DOMContentLoaded", bootApp);

const width = 320;
const height = 240;

function bootApp() {
	document.body.innerHTML = /*html*/ `
    <canvas>
    </canvas>
    <button class="play-sound">
      Play Sound
    </button>

    <button class="cancel-sound">
      Cancel Sound
    </button>
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

	const multiLineText = new TextBox({
		video,
		audio,
		x: 4,
		y: 100,
		string:
			"This is a longer string.\nI wonder, if commas help readability.\n\nProbably not!",
		// string: `This\nis\na\ntest\nmultiline\nstring.`,
		color: 0xff66ff,
		typewriter: true,
	});

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
			multiLineText,
			paddle0,
			// paddle1,
		];

		// video.clear(0x333333);

    // video.renderStatic();

		objects.forEach((o) => o.tick());
		video.sync();

		requestAnimationFrame(renderLoop);
	};

	renderLoop();

	video.setPixel(0, 0, 0x00ff00);
	video.sync();

	const playButton = document.querySelector(".play-sound");
	const cancelButton = document.querySelector(".cancel-sound");

	let interval;
	playButton.addEventListener("click", async () => {
		// await audio.playSlide({ startFrequency: 20, numberOfSteps: 5000, stepSizeInCents: 1 });

		// const frequencies = [400, 450];
		// await audio.playRing({ frequencies, millis: 400});

		// audio.playTrill();
		audio.playTrill(10);
		// await audio.playBuzz(100, 750, { oscillationMillis: 30, buzzOffsetCents: 500});
		// await audio.playBuzz(300, 750, { oscillationMillis: 30, buzzOffsetCents: 500});
		// await audio.playBuzz(300, 750, { oscillationMillis: 30, buzzOffsetCents: 1000});
		// await audio.playBuzz(350, 750, { oscillationMillis: 30, buzzOffsetCents: 2000});
		// await audio.playBuzz(300, 750, { oscillationMillis: 20, buzzOffsetCents: 500});
		// await audio.playBuzz(300, 750, { oscillationMillis: 20, buzzOffsetCents: 1000});
		// await audio.playBuzz(300, 750, { oscillationMillis: 10, buzzOffsetCents: 500});
		// await audio.playBuzz(300, 750, { oscillationMillis: 10, buzzOffsetCents: 1000});

		// while (true) {
		//   const frequencies = [400, 450];
		//   // // const frequencies = [200, 630];
		//   await audio.playRing({ frequencies, millis: 400});
		//   await audio.playSilence(200);
		//   await audio.playRing({ frequencies, millis: 400});
		//   await audio.playSilence(2000);
		//   // await audio.playBuzz(2000, 75, { oscillationMillis: 10, buzzOffsetCents: 400});
		//   // await audio.playRing({ frequencies: [750, 1100], millis: 50 })
		//   // await audio.playSilence(50);
		// }

		// audio.playScript([
		//   [400, 1000],
		//   [800, 1000],
		//   [300, 500],
		//   [100, 666],
		//   [400, 1000],
		//   [800, 1000],
		//   [300, 500],
		//   [100, 666],
		// ]);

		// await audio.playNote(250, 75);
		// await audio.playNote(500, 75);
		// await audio.playNote(1000, 75);
		// await audio.playNote(2000, 75);
		// await audio.playNote(4000, 75);
		// await audio.playNote(8000, 75);

		/* Wall collision sound */
		// audio.playNote(1000, 17);
		/* Hit ball sound */
		// await audio.playNote(2000, 50);
		// await audio.playNote(1000, 50);
		// await audio.playNote(2000, 50);
		const notes = [
			"1174.659",
			"1108.731",
			"1046.502",
			"987.7666",
			"932.3275",
			"880.0000",
			"830.6094",
			"783.9909",
			"739.9888",
			"698.4565",
			"659.2551",
			"622.2540",
			"587.3295",
			"554.3653",
			"523.2511",
			"493.8833",
			"466.1638",
			"440.0000",
			"415.3047",
			"391.9954",
			"369.9944",
			"349.2282",
			"329.6276",
			"311.1270",
			"293.6648",
		];

		// await audio.playNote("349.2282", 1000);

		// while (true) {
		//   for (let i = 0; i < notes.length; i += 2) {
		//     const note = notes[i];

		//     await audio.playNote(note, 25);
		//   }
		//   // await audio.playNote(250, 75);
		//   // await audio.playNote(500, 75);
		//   // await audio.playNote(1000, 75);
		//   // await audio.playNote(2000, 75);
		//   // await audio.playNote(4000, 75);
		//   // await audio.playNote(8000, 75);
		// }

		/* start sound */
		// await audio.playNote(250, 75);
		// await audio.playNote(500, 75);
		// await audio.playNote(1000, 75);
		// await audio.playNote(2000, 75);
		// await audio.playNote(4000, 75);
		// await audio.playNote(8000, 75);
	});

	cancelButton.addEventListener("click", () => {
		// clearInterval(interval);
	});
}
