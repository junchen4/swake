(function () {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	}

	var SnakeView = SnakeGame.SnakeView = function ($el) {
		this.$el = $el;
		this.board = new SnakeGame.Board(this.$el);
		this.score = 0;

		this.$el.keydown(function (event) {
			this.handleKeyEvent(event);
		}.bind(this));

		this.scoreInterval = window.setInterval(this.boostScore.bind(this, 50), 2000);
		this.stepInterval = window.setInterval(this.step.bind(this), 250);
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
		if (head[0] <= 0 || head[0] > this.board.dimX) {
			return true;
		} else if (head[1] < 0 || head[1] >= this.board.dimY) {
			return true;
		}
		return false;
	};

	SnakeView.prototype.onTopOfItem = function () {
		var head = this.board.snake.segments[this.board.snake.segments.length - 1];
		if (this.$el.find(".snake.item").length !== 0) {
			return true;
		}
		return false;
	};

	SnakeView.prototype.boostScore = function (amount) {
		this.score += amount;
		this.$el.find(".score").html("Score: "+this.score);
	};

	SnakeView.prototype.step = function () {
		this.board.snake.move();
		if (this.onTopOfItem()) {
			this.board.snake.addTail();
			this.boostScore(200);
		}
		if (this.board.snake.isCollided() || this.isOutOfBounds()) {
			clearInterval(this.stepInterval);
			clearInterval(this.scoreInterval);
			clearInterval(this.board.itemsInterval);
			this.$el.append("<div class=end>Game over! <br><br> Can you beat "+this.score+" points?<br><br> Press enter to play again. </div>");
		} else {
			this.board.render();
		}
	};

})();