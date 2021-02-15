class Character {
	constructor({
		/**
		 * Instance of `Video`.
		 */
		video,

		/**
		 * Instance of `Audio`.
		 */
		audio,

		/**
		 * Starting X coordinate.
		 */
		y,

		/**
		 * Starting Y coordinate.
		 */
		x,
	}) {
		const isVideoInstanceOfVideo = video.constructor.name === "Video";
		const isAudioInstanceOfAudio = audio.constructor.name === "Audio";
		if (!isVideoInstanceOfVideo) {
			throw Error(
				"Paddle constructor must be passed instance of `Video` as argument 1!"
			);
		}

		if (!isAudioInstanceOfAudio) {
			throw Error(
				"Paddle constructor must be passed instance of `Audoio` as argument 2!"
			);
		}

		this._x = x;
		this._y = y;
		this.audio = audio;
		this.video = video;
	}

	set x(value) {
		this._x = value;
	}

	set y(value) {
		this._y = value;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}
}

export default Character;
