import Character from "./Character";

const B = 0x000000;
const W = 0xffffff;

// prettier-ignore
const cursor =  [
  [B,  ,  ,  ,  ,  ,  ],
  [B, B,  ,  ,  ,  ,  ],
  [B, W, B,  ,  ,  ,  ],
  [B, W, W, B,  ,  ,  ],
  [B, W, W, W, B,  ,  ],
  [B, W, W, W, W, B,  ],
  [B, W, W, W, W, W, B],
  [B, W, W, W, B, B, B],
  [B, W, B, W, B,  ,  ],
  [B, B,  , B, W, B,  ],
  [ ,  ,  , B, W, B,  ],
  [ ,  ,  ,  , B, B,  ],
];

const cursorInvert = cursor.map((r) =>
	r.map((p) => (p === B ? W : p === W ? B : p))
);

class Mouse extends Character {
	_draw() {
		if (
			this._context.mouse.mouseMap.x == null ||
			this._context.mouse.mouseMap.y == null
		) {
			return;
		}

		const { x: mouseX, y: mouseY, buttonDown } = this._context.mouse.mouseMap;

		this._context.video.setAoA(
			mouseX,
			mouseY,
			!buttonDown ? cursorInvert : cursor
		);
	}

	_tick() {
		this._draw();
	}
}

export default Mouse;
