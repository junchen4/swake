(function () {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	}

	var Game = SnakeGame.Game = function (boardDOM) {
		this.$el = $(boardDOM);

		this.$el.keydown(function (event) {			
			this.handleKeyEvent(event);
		}.bind(this));
	};

	Game.prototype.handleKeyEvent = function (event) {
		if (event.keyCode === 13) {
			this.$el.find(".start").addClass("hidden");
			this.start();
		}
	}

	Game.prototype.start = function () {
		new SnakeGame.SnakeView(this.$el);

	};

	

})();