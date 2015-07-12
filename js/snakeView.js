(function () {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	}

	var SnakeView = SnakeGame.SnakeView = function ($el) {
		this.$el = $el;
		this.board = new SnakeGame.Board(this.$el);

		this.$el.keydown(function (event) {
			this.handleKeyEvent(event);
		}.bind(this));

		window.setInterval(this.step.bind(this), 500);
	};

	SnakeView.prototype.handleKeyEvent = function (event) {
		switch(event.keyCode) {
			case 38: //up
				if (this.board.snake.dir !== "S") {
					this.board.snake.turn("N");
				}
				break;
			case 39: //right
				if (this.board.snake.dir !== "W") {
					this.board.snake.turn("E");
				}
				break;
			case 40: //down
				if (this.board.snake.dir !== "N") {
					this.board.snake.turn("S");
				}
				break;
			case 37: //left
				if (this.board.snake.dir !== "E") {
					this.board.snake.turn("W");
				}
				break;
		}
	};

	SnakeView.prototype.isOutOfBounds = function () {
		var head = this.board.snake.segments[this.board.snake.segments.length - 1];
		if (head[0] < 0 || head[0] >= this.board.dimX) {
			return true;
		} else if (head[1] < 0 || head[1] >= this.board.dimY) {
			return true;
		}
		return false;
	};

	SnakeView.prototype.onTopOfItem = function () {
		var head = this.board.snake.segments[this.board.snake.segments.length - 1];
		for(var i = 0; i < this.board.items.length; i++) {
			if(head[0] === this.board.items[i][0] && head[1] === this.board.items[i][1]) {
				return true;
			}
		}
		return false;
	};

	SnakeView.prototype.step = function () {
		this.board.snake.move();
		if (this.onTopOfItem()) {
			this.board.snake.addTail();
		}
		this.board.render();
		//check colision and bounds
	};

})();