(function () {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	}

	var Board = SnakeGame.Board = function ($el) {
		this.$el = $el;
		this.dimX = 20;
		this.dimY = 20;
		this.items = [];
		this.snake = new SnakeGame.Snake();
		this.updaterLocals = [];

		this.setupGrid();
		setInterval(this.addItems.bind(this), 4000);
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
		this.clearIntervals();
		this.$el.find(".snake.item").removeClass(); //"Clear" all classes to redraw snake + items
		this.$el.find(".snake").removeClass(); //"Clear" all classes to redraw snake + items
		this.$el.find(".trooper").removeClass(); //"Clear" all classes to redraw snake + items

		for(var i = 0; i < this.snake.segments.length; i++) {
			var x = this.snake.segments[i][0];
			var y = this.snake.segments[i][1];
			var direction = this.snake.directions[i];
			var $divSegment = this.$el.find("div").eq(y*this.dimY + x);

			if (i === this.snake.segments.length - 1) {
		    	$divSegment.addClass("snake");
			} else {
		    	$divSegment.addClass("trooper");
		    	$divSegment.addClass(direction + "0");
		    	this.beginWalking($divSegment, direction + "0", direction + "1");
			}
		}
	};

	Board.prototype.clearIntervals = function () {
		while(this.updaterLocals.length > 0) {
			clearInterval(this.updaterLocals[0]);
			this.updaterLocals.shift();
		}
	};

	//alternatve between classes to give appearance of walking
	Board.prototype.beginWalking = function ($divSegment, dir0, dir1) { 
		var interval = setInterval(function () {
			if ($divSegment.hasClass(dir0)) {
				$divSegment.removeClass(dir0);
				$divSegment.addClass(dir1);
			} else {
				$divSegment.removeClass(dir1);
				$divSegment.addClass(dir0);			
			}
		}.bind(this), 80);

		this.updaterLocals.push(interval);
	};

	Board.prototype.addItems = function () {
		var x = Math.floor(Math.random()*this.dimX);
		var y = Math.floor(Math.random()*this.dimY);
		this.items.push([x,y]);
    	this.$el.find("div").not(".snake").eq(y*this.dimY + x).addClass("item"); 
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