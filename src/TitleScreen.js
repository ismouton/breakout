class TitleScreen {
        constructor() {
                this._tickCount = 0;
        }

        _draw() {

        }

        _handleInput() {
                /* Should use menu component */
        }

        _tick() {
             this._handleInput();
             this._draw();

             this._tickCount++;
        }
}