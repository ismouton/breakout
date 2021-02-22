class Character {
	constructor({
		/**
		 * Application context.
		 */
		context,
		/**
		 * Starting X coordinate.
		 */
		y,

		/**
		 * Starting Y coordinate.
		 */
		x,

		/**
		 * Function to call upon cleanup.
		 */
		onReap,

		/**
		 * How long this object will live until it destroys itself.
		 */
		lifeCycleInTicks,
	} = {}) {
		this._context = context;
		this._x = x;
		this._y = y;

		this._cycleCount = 1;
		this._reapCB = onReap;
		this._lifeCycleInTicks = lifeCycleInTicks;
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

  /**
   * Mark as dead and available for garbage collection.
   */
  destroy() {
    this.dead = true;
  }

	/**
	 * Called upon cleaning up the object.
	 */
	reap() {
		typeof this._reapCB === 'function' && this._reapCB();
	}

	tick() {
		this._tick();
		if (this._lifeCycleInTicks <= this._cycleCount) {
			this.destroy();
		}

		this._cycleCount += 1;
	}
}

export default Character;
