class Video {
  constructor(el) {
    const { tagName } = el;

    if (tagName !== "canvas") {
      throw Error(
        "Video constructor must be passed canvas element as argument 1!"
      );
    }

    this.canvasElement = el;
    this.context = el.getContext("2d");
  }
}
