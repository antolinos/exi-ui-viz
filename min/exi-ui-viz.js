function Gallery(args){

}

Gallery.prototype.addItem = function(name, description, targetId){
	var main = document.getElementById(targetId);
	var container = document.createElement("div");
	container.setAttribute("id", _.uniqueId());
	main.appendChild(container);
	return container.getAttribute("id");
	
};

Gallery.prototype.doUnipuck = function(targetId){
	var id = this.addItem("","", "main");
	var unipuck = new UnipuckLayout({
							width : 160,
							height : 160,
							fontSize: 10, 
							fill:"#2E2E2E",
							fontColor : '#FFFFFF'
						});
	unipuck.render(id);
	unipuck.load([{'name':'test', position:1, id:'id'},{'name':'test', position:8, id:'id'}]);
	unipuck.onClick.attach(function(sender, args){
		console.log(args);
	});
};

Gallery.prototype.doSpine = function(targetId){
	var id = this.addItem("","", "main");
	var spine = new SpineLayout({
							width : 160,
							height : 160,
							fontSize: 10, 
							fill:"#2E2E2E",
							fontColor : '#FFFFFF'
						});
	spine.render(id);
	spine.load([{'name':'test', position:1, id:'id'},{'name':'test', position:8, id:'id'}]);
	spine.onClick.attach(function(sender, args){
		console.log(args);
	});
};

Gallery.prototype.doSamplePlate = function(targetId){
	var id = this.addItem("","", "main");
	var samplePlateLayout = new SamplePlateLayout({
							width : 400,
							height : 200,
							fontSize: 10, 
							fill:"#2E2E2E",
							fontColor : '#FFFFFF'
						});
	samplePlateLayout.render(id);
	samplePlateLayout.load([{'name':'test', position:1, id:'id'},{'name':'test', position:8, id:'id'}]);
	samplePlateLayout.onClick.attach(function(sender, args){
		console.log(args);
	});
};

Gallery.prototype.init = function(targetId){
	var panel = document.getElementById(targetId);

	this.doUnipuck();
	this.doSpine();
	this.doSamplePlate();
	
	
		

	
	
};


/**
* Super class for sample layouts: unipuck, spines,etc..
*
* @class PuckLayout
* @constructor
*/
function PuckLayout(args) {
	this.id = _.uniqueId("unipuck_layout_");
	
	
	this.height = 200;
	this.width = this.height;
	
	/**
	* Font size of the label
	* 
	* @property fontSize
	* @type {String}
	* @default "7"
	*/
	this.fontSize = 7;
	/**
	* Font color of the label
	* 
	* @property fontColor
	* @type {String}
	* @default "FFFFFF"
	*/
	this.fontColor = '#FFFFFF';

	/**
	* Default Color when a well is empty
	* 
	* @property fontColor
	* @type {String}
	* @default "2E2E2E"
	*/
	this.fill = '#2E2E2E';
	
	/**
	* Default Color when a well is filled
	* 
	* @property fontColor
	* @type {String}
	* @default "2E2E2E"
	*/
	this.filledColor = '#D8D8D8';

	if (args !== null) {
		if (args.width !== null) {
			this.height = args.size;
			this.width = args.width;
		}
		if (args.height !== null) {
			this.height = args.height;
		}
		if (args.fontSize !== null) {
			this.fontSize = args.fontSize;
		}
		if (args.fontColor !== null) {
			this.fontColor = args.fontColor;
		}
		if (args.fill !== null) {
			this.fill = args.fill;
		}
	}
	
	/**
	* This event is triggered when a click event occurs on a well
	* 
	* @property onClick
	* @type {Event}
	*/
	this.onClick = new Event(this);
}



/**
* Load sample into the container
*
* @method load
* @param {String} samples [{'name':'test', position:'1', id:'id'}]
*/
PuckLayout.prototype.load = function(samples) {
	this.samples = samples;
	if (this.targetId !== null){
		this.render(this.targetId);
	}
};

/**
* It returns a svg node by id
*
* @method getSvgGroupById
* @param {String} id Identifier of the SVG node
*/
PuckLayout.prototype.getSvgGroupById = function(id) {
	var svgNode = Snap.select('#' + this.id);
	return svgNode.select("#" + id);
};

/**
* It renders a plate, attach the events to the wells afterwards and display the samples
*
* @method render
* @param {String} targetId node id
*/
PuckLayout.prototype.render = function(targetId) {
	var _this = this;
	this.targetId = targetId;
	document.getElementById(targetId).innerHTML = "";
	document.getElementById(targetId).setAttribute("width", this.width);
	document.getElementById(targetId).setAttribute("height", this.height);
	
	/** Filling template and rendering on the target container **/
	var configuration = this.getConfiguration();
	dust.render(this.template, configuration, function(err, out){
        	document.getElementById(targetId).innerHTML = (out);
     	});

	/** Attach events **/
	var svgNode = Snap.select('#' + this.id);
	if(svgNode !== null){
		var click = function(sender){
			var well = _.find(configuration.wells, {id : sender.currentTarget.id});
			_this.onClick.notify({
									well 	: well,
									sample  : _.find(_this.samples, {position:well.position})
			});
		};
		
		var mouseover = function(sender){
			_this.getSvgGroupById(sender.currentTarget.id).select(_this.wellType).attr({
			    stroke: "#FFFFFF",
			    style: "cursor:pointer"
			});
		};
		
		var mouseout = function(sender){
			_this.getSvgGroupById(sender.currentTarget.id).select(_this.wellType).attr({
			    stroke: "#000000"
			});
		};
		
		
		for (var i =0; i < configuration.wells.length; i++){
			var svgGroup = this.getSvgGroupById(configuration.wells[i].id);
			svgGroup.click(click);
			svgGroup.mouseover(mouseover);
			svgGroup.mouseout(mouseout);
		}
	}
	
	/** Render samples **/
	if (this.samples != null){
		for (var x = 0; x < this.samples.length; x++) {
			var well = _.find(configuration.wells, {position:this.samples[x].position});
			_this.getSvgGroupById(well.id).select(_this.wellType).attr({
			    fill: this.filledColor
			});
		}
	}
	
};
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




