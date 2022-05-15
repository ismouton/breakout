import Paddle from "../../Paddle";
import Ball from "../../Ball";
import Block from "../../Block";

const blockColors = [
	0xff0000,
	0x00ff00,
	0x0000ff,
	0xff00ff,
	0xffff00,
	0x00ffff,
];

const loadLevel = (context, number) => {
  const { width, height } = context.video;

  const paddle0 = new Paddle({
    context,
    width: 48,
    // width: 10,

    x: (320 - 48) / 2,
    y: 220,
    rightBounds: width,
    height: 12,
  });

  const blocks = [];
  for (let y = 0; y < 9; y++) {
    const width = 32;
    const height = 10;
    for (let x = 0; x < 10; x++) {
      const block = new Block({
        context,
        width,
        height,
        y: y * height + 16,
        x: x * width,
        color: blockColors[y % (blockColors.length - 1)],
        borderColor: 0x000000,
        onReap: () => context.state.blocksDestroyed++,
      });

      blocks.push(block);
    }
  }

  const collisionObjects = [
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
    context,
    x: 154,
    y: 200,
    width: 16,
    collisionObjects,
  });
  // const ball1 = new Ball({
  // 	context,
  // 	xVelocity: 1,
  // 	x: 154,
  // 	y: 10,
  // 	width: 16,
  // 	collisionObjects: this.collisionObjects,
  // });

  const balls = [
    ball,
    // ball1,
  ];

  const objects = [
    paddle0,
    ...blocks,
    // ball1,
    ball,
    // paddle1,
  ];

  return {
    balls,
    blocks,
    objects,
    collisionObjects,
  };
};

export default loadLevel;
