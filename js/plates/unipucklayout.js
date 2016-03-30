/**
* Unipuck is a container with 16 wells
*
* @class UnipuckLayout
* @constructor
*/
function UnipuckLayout(args) {
	PuckLayout.call(this, args);
	this.template = "unipuck.platelayout";
	this.wellType = 'circle';
}

UnipuckLayout.prototype.render = PuckLayout.prototype.render;
UnipuckLayout.prototype.getSvgGroupById = PuckLayout.prototype.getSvgGroupById;
UnipuckLayout.prototype.load = PuckLayout.prototype.load;

/**
* Gets the configuration of the layout
*
* @method getConfiguration
* @return {JSON} Returns {
			width 	: this.width,<br />
			height	: this.height,<br />
			r 		: this.width/2,<br />
			cx 		: this.width/2,<br />
			cy 		: this.height/2,<br />
			id		: this.id,<br />
			wells 	: [<br />{<br />
					cx			: cx,
					cy 			: cy,
					label   	: labels[xLabel],<br />
					r  			: this.width/11,<br />
					fill		: this.fill,<br />
					fontColor 	: this.fontColor,<br />
					fontSize	: this.fontSize,<br />
					id			: this.id + "_" + labels[xLabel]<br />
			}]
	}
*/
UnipuckLayout.prototype.getConfiguration = function() {
	var coordinates = [];
	var centerX = (this.width/2) - 2;
	var centerY = (this.width/2) - 2;
	var radius = ((this.width/2) - this.width/8);
	var xLabel = 0;
	var labels = [14,13,12,11,10,9,8,7,6,16, 15];
	for(var i = 0; i < 55; i ++) {
		if (i%5 == 1){
			var cx = centerX + radius * Math.cos(2 * Math.PI * i / 55);
			var cy = centerY + radius * Math.sin(2 * Math.PI * i / 55);
			var r = this.width/11;
			coordinates.push({
					cx			: cx,
					cy 			: cy,
					labelcx		: cx - (r/2.5),
					labelcy		: cy + (r/2.5),
					label   	: labels[xLabel],
					position   	: labels[xLabel],
					r  			: this.width/11,
					fill		: this.fill,
					fontColor 	: this.fontColor,
					fontSize	: this.fontSize,
					id			: this.id + "_" + labels[xLabel]
			});  
			xLabel = xLabel + 1;
		}

	}
	radius =  (this.width/2) - this.width/3;
	
	xLabel = 0;
	labels = [4,3,2,1,5];	
	for( i = 0; i < 20; i ++) {
		if (i%4 == 3){
			var cx2 = centerX + radius * Math.cos(2 * Math.PI * i / 20);
			var cy2 = centerY + radius * Math.sin(2 * Math.PI * i / 20);
			var r2 = this.width/11;
			coordinates.push({
					cx			: cx2,
					cy 			: cy2,
					labelcx		: cx2 - (r2/2.5),
					labelcy		: cy2 + (r2/2.5),
					label   	: labels[xLabel],
					position   	: labels[xLabel],
					r  			: r2,
					fill		: this.fill,
					fontColor 	: this.fontColor,
					fontSize	: this.fontSize,
					id			: this.id + "_" + labels[xLabel]
			});  
			xLabel = xLabel + 1;
		}
	}

	return {
			width 	: this.width,
			height	: this.height,
			r 		: this.width/2,
			cx 		: this.width/2,
			cy 		: this.height/2,
			id		: this.id,
			wells 	: coordinates
	};
};




