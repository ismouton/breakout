import Block from "./Block";
import Character from "./Character";

class SelectionBracket extends Character {
	_draw() {
		const r = 9;
		const angle = 2;
		const q = Math.PI / 32;

		const size = 2;

		const blockCount = 6;

		for (let i = 0; i < blockCount; i++) {
			const blockX = r * Math.cos(this._cycleCount * q + i);
			const blockY = r * Math.sin(this._cycleCount * q + i);

			new Block({
				context: this._context,
				x: Math.round(this.x + blockX),
				y: Math.round(this.y + blockY),
				width: size,
				height: size,
				color: 0xFFFF00,
				borderColor: 0xFFFF00,
			}).tick();
		}
	}

	_tick() {
		this._draw();
	}
}

export default SelectionBracket;
