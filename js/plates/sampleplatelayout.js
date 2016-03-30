/**
* Unipuck is a container with 16 wells
*
* @class UnipuckLayout
* @constructor
*/
function SamplePlateLayout(args) {
	PuckLayout.call(this, args);
	this.template = "sampleplate.platelayout";
	this.wellType = 'rect';
}

SamplePlateLayout.prototype.render = PuckLayout.prototype.render;
SamplePlateLayout.prototype.getSvgGroupById = PuckLayout.prototype.getSvgGroupById;
SamplePlateLayout.prototype.load = PuckLayout.prototype.load;

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
SamplePlateLayout.prototype.getConfiguration = function() {
	var coordinates = [];
	var rows = 4;
	var columns = 12;
	for(var i = 0; i < rows; i ++) {
		for(var j = 0; j < columns; j ++) {
			var cx = j*(this.width/(columns+1)) + (this.width/columns)/2;
			var cy = i*(this.height/(rows+1)) + (this.height/rows)/2;
			var r = this.width/(columns + 2);
			var label = i*12 + j;
			coordinates.push({
					cx			: cx,
					cy 			: cy,
					labelcx		: cx + r/2,
					labelcy		: cy + r/2,
					label   	: label,
					position   	: label,
					r  			: r,
					fill		: this.fill,
					fontColor 	: this.fontColor,
					fontSize	: this.fontSize,
					id			: this.id + "_" + label
			});  
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




