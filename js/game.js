(function () {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	}

	var Game = SnakeGame.Game = function (htmlElement) {
		this.$el = $(htmlElement);
		this.start();
	};

	Game.prototype.start = function () {
		new SnakeGame.SnakeView(this.$el);

	};

	

})();