# Swake

Browser-based remake of the classic Snake game. Written in JavaScript using jQuery, HTML5, and CSS

### [Play now!](http://swake.herokuapp.com/)

## How-to
* Use arrow keys to move in corresponding directions

## Code Highlight from [snake.js]
```
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
		this.directions.push(this.dir);
		this.directions.shift();

	};

	Snake.prototype.turn = function (direction) {
		//this.dir is current direction
		this.dir = direction;
	};
```	

[snake.js]: ./js/snake.js
