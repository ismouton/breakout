import Block from "./Block";
import Character from "./Character";
import SelectionBracket from "./SelectionBracket";
import TextBox from "./Text";

const _ = null;
class InputGrid extends Character {
	constructor({ context, x, y }) {
		super(...arguments);

		this._grid = [
			["a", "b", "c", "d", "e", "f", "1", "2", "3"],
			["g", "h", "i", "j", "k", "l", "4", "5", "6"],
			["m", "n", "o", "p", "q", "r", "7", "8", "9"],
			["s", "t", "u", "v", "w", "x", "y", "z", "0"],
			[_, _, _, _, _, _, _, "\b", "\0"],
		];

		this._cursor = {
			column: 0,
			row: 0,
		};

		const totalRows = this._grid.length;
		const totalColumns = 9;

		this.objects = [
			new Block({
				context,
				x,
				y,
				width: totalColumns * 24 + 7,
				height: totalRows * 24 + 7,
				color: 0x990000,
				borderColor: 0xffffff,
			}),
			new Block({
				context,
				x,
				y: y - 20,
				width: 8 * 7 - 1,
				height: 14,
				color: 0x990000,
				borderColor: 0xffffff,
			}),
		];

		for (let localY = 0; localY < this._grid.length; localY++) {
			const row = this._grid[localY];
			const padding = 12;
			const rowSpacing = 24;
			const columnSpacing = 24;

			for (let localX = 0; localX < row.length; localX++) {
				const character = row[localX];

				if (!character) {
					continue;
				}

				this.objects.push(
					new TextBox({
						context,
						scale: 1,
						x: columnSpacing * localX + this.x + padding,
						y: rowSpacing * localY + this.y + padding,
						string: character,
						color: 0xffffff,
					})
				);
			}
		}

		this._selectionBracket = new SelectionBracket({
			context,
			x: this.x + 14,
			y: this.y + 15,
		});

		this._userInputTextBox = new TextBox({
			context,
			scale: 1,
			x: this.x + 4,
			y: this.y - 16,
			color: 0xffffff,
		});

		this._userInput = [];
	}

	_handleInput() {
		const inputMap = this._context.keyboard.inputMap;

		const { row, column } = this._cursor;

		// Set input
		if (inputMap.Enter) {
			const character = this._grid[row][column];

			if (character === "\0") {
				this.destroy();
			} else if (character === "\b") {
				this._userInput.pop();
			} else if (this._userInput.length < 6) {
				this._userInput.push(character);
			}
		}

		if (
			this._cursor.row === 3 &&
			inputMap.ArrowDown &&
			this._cursor.column === 8
		) {
			this._cursor.column = 8;
			this._cursor.row = 4;
		} else if (this._cursor.row === 3 && inputMap.ArrowDown) {
			this._cursor.column = 7;
			this._cursor.row = 4;
		} else if (inputMap.ArrowUp && this._cursor.row > 0) {
			this._cursor.row -= 1;
		} else if (inputMap.ArrowDown && this._cursor.row < 3) {
			this._cursor.row += 1;
		} else if (
			inputMap.ArrowLeft &&
			this._cursor.column > 0 &&
			!(this._cursor.column === 7 && this._cursor.row === 4)
		) {
			this._cursor.column -= 1;
		} else if (inputMap.ArrowRight && this._cursor.column < 8) {
			this._cursor.column += 1;
		}

		this._selectionBracket.x = this._cursor.column * 24 + 14 + this.x;
		this._selectionBracket.y = this._cursor.row * 24 + 15 + this.y;
	}

	_draw() {
		this._userInputTextBox.setString(this._userInput.join(""));
		this.objects.forEach((o) => o.tick());

		this._selectionBracket.tick();
		this._userInputTextBox.tick();
	}

	_tick() {
		this._handleInput();
		this._draw();
	}
}

export default InputGrid;
