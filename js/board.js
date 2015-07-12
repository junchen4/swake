(function () {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	}

	var Board = SnakeGame.Board = function ($el) {
		this.$el = $el;
		this.dimX = 20;
		this.dimY = 20;
		this.itemTiming = 0;
		this.items = [];
		this.snake = new SnakeGame.Snake();

		this.setupGrid();
	};

	Board.prototype.placeItem = function(coordinates) {
	    this.$el.find("div").eq(coordinates[1]*this.dimY + coordinates[0]).addClass("item"); 
	};

	Board.prototype.setupGrid = function () {
		var html = "";
		for(var y = 0; y < this.dimY; y++){
		    for(var x = 0; x < this.dimX; x++){  
		    	if (x === this.dimX - 1) {
		        	html += "<div></div><br>";   
		    	} else {
		        	html += "<div></div>";    		    		
		    	}
		    }    
		}
		this.$el.html(html);	
	};

	Board.prototype.updateBoard = function() {
		this.$el.find("div .snake,div .item").removeClass(); //"Clear" all classes to redraw snake + items
		this.$el.find(".snake").removeClass(); //"Clear" all classes to redraw snake + items

		for(var i = 0; i < this.snake.segments.length; i++) {
			var x = this.snake.segments[i][0];
			var y = this.snake.segments[i][1];
	    	this.$el.find("div").eq(y*this.dimY + x).addClass("snake");
		}

		if (this.itemTiming % 4 == 0) {
			var x = Math.floor(Math.random()*this.dimX);
			var y = Math.floor(Math.random()*this.dimY);
			this.items.push([x,y]);
	    	this.$el.find("div").not(".snake").eq(y*this.dimY + x).addClass("item"); 
		}
	};

	Board.prototype.removeCollidedItem = function () {
		var head = this.snake.segments[this.snake.segments.length - 1];
		this.$el.find("div").eq(head[1]*this.dimY + head[0]).removeClass("item");
	};

	Board.prototype.render = function () {
		this.itemTiming++;
		this.updateBoard.call(this);
		return this.$el;
	};



})();