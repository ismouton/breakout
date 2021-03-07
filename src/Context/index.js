import Audio from "./Audio";
import Video from "./Video";
import Mouse from "./Mouse";
import Keyboard from "./Keyboard";

/**
 * Default video options passed to video context constructor.
 */
const defaultVideoOptions = {
	scale: 4,
	width: 320,
	height: 240,
	background: 0x111111,
};

class Context {
	constructor({ canvas }, videoOptions = defaultVideoOptions) {
		canvas.setAttribute("tabindex", "-1");

		this.audio = new Audio();
		this.video = new Video(canvas, videoOptions);
		this.mouse = new Mouse({ canvas, video: this.video });
		this.keyboard = new Keyboard({ canvas });

		/**
		 * Global variables used by application.
		 */
		this.state = {
			blocksDestroyed: 0,
			score: 0,
		};
	}
}

export default Context;
