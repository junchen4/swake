(function () {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	}

	var Snake = SnakeGame.Snake = function () {
		this.dir; //"N", "E", "S", "W" for north, east, south, west
		this.segments = [[5,5]];
	};

	Snake.prototype.move = function () {
		//shift off "tail" segment 
		var newHead = this.segments[this.segments.length - 1].slice(0);
		this.segments.shift();
		switch(this.dir) {
			case "N":
				newHead[1]--;
				break;
			case "E":
				newHead[0]++;
				break;
			case "S":
				newHead[1]++;
				break;
			case "W":
				newHead[0]--;
				break;
		}

		//push on the new head to give appearance of moving
		this.segments.push(newHead);
	};

	Snake.prototype.turn = function (direction) {
		this.dir = direction;
	};

	Snake.prototype.addTail = function () {
		this.segments.unshift(this.segments[0]);
	};

	Snake.prototype.isCollided = function () {
		var head = this.segments[this.segments.length - 1];
		for(var i = 0; i < this.segments.length - 1; i++) {
			if (head[0] === this.segments[i][0] && head[1] === this.segments[i][1]) {
				return true;
			}
		}
		return false;
	};

})();