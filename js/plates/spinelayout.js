/**
* Unipuck is a container with 16 wells
*
* @class UnipuckLayout
* @constructor
*/
function SpineLayout(args) {
	PuckLayout.call(this, args);
	this.template = "spine.platelayout";
	this.wellType = 'circle';
}

SpineLayout.prototype.render = PuckLayout.prototype.render;
SpineLayout.prototype.getSvgGroupById = PuckLayout.prototype.getSvgGroupById;
SpineLayout.prototype.load = PuckLayout.prototype.load;

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
SpineLayout.prototype.getConfiguration = function() {
	var coordinates = [];
	var centerX = (this.width/2) - 2;
	var centerY = (this.width/2) - 2;
	var radius = ((this.width/2) - this.width/8);
	var xLabel = 0;
	var labels = [9,8,7,6,5,4,3,2,1,10];
	for(var i = 0; i < 10; i ++) {
			var cx = centerX + radius * Math.cos(2 * Math.PI * i / 10);
			var cy = centerY + radius * Math.sin(2 * Math.PI * i / 10);
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




