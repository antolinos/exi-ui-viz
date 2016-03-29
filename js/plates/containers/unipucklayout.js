function UnipuckLayout(args) {
	this.id = _.uniqueId("unipuck_layout_");
	this.height = 200;
	this.width = this.height;
	this.fontSize = 7;
	this.fontColor = 'gray';

	this.fill = 'gray';

	if (args != null) {
		if (args.size != null) {
			this.height = args.size;
			this.width = args.size;
		}
		if (args.fontSize != null) {
			this.fontSize = args.fontSize;
		}
		if (args.fontColor != null) {
			this.fontColor = args.fontColor;
		}
		if (args.fill != null) {
			this.fill = args.fill;
		}
	}
}

UnipuckLayout.prototype.getConfiguration = function() {
	var coordinates = [];
	var centerX = (this.width/2) - 2;
	var centerY = (this.width/2) - 2;
	var radius = ((this.width/2) - this.width/8);
	var xLabel = 0;
	var labels = [14,13,12,11,10,9,8,7,6,16, 15];
	for(var i = 0; i < 55; i ++) {
		if (i%5 == 1){
			coordinates.push({
					cx		: centerX + radius * Math.cos(2 * Math.PI * i / 55),
					cy 		: centerY + radius * Math.sin(2 * Math.PI * i / 55),
					label   	: labels[xLabel],
					r  		: this.width/11,
					fill		: this.fill,
					fontColor 	: this.fontColor,
					fontSize	: this.fontSize,
					id		: this.id + "_" + labels[xLabel]
			});  
			xLabel = xLabel + 1;
		}

	}
	radius =  (this.width/2) - this.width/3;
	
	xLabel = 0;
	labels = [4,3,2,1,5];	
	for(var i = 0; i < 20; i ++) {
		if (i%4 == 3){
			coordinates.push({
					cx		: centerX + radius * Math.cos(2 * Math.PI * i / 20),
					cy 		: centerY + radius * Math.sin(2 * Math.PI * i / 20),
					label   	: labels[xLabel],
					r  		: this.width/11,
					fill		: this.fill,
					fontColor 	: this.fontColor,
					fontSize	: this.fontSize,
					id		: this.id + "_" + labels[xLabel]
			});  
			xLabel = xLabel + 1;
		}
	}

	return {
			width 	: this.width,
			height	: this.height,
			r 	: this.width/2,
			cx 	: this.width/2,
			cy 	: this.height/2,
			wells : coordinates
	}
};

UnipuckLayout.prototype.render = function(targetId) {
	document.getElementById(targetId).innerHTML = "";
	document.getElementById(targetId).setAttribute("width", this.width);
	document.getElementById(targetId).setAttribute("height", this.height);
	
	/** Filling template and rendering on the target container **/
	var configuration = this.getConfiguration();
	dust.render("unipuck.platelayout", configuration, function(err, out){
        	document.getElementById(targetId).innerHTML = (out);
     	});

	/** Attach events **/
	for (var i =0; i < configuration.wells.length; i++){
		document.getElementById(configuration.wells[i].id).onclick = function(event, obj){console.log(event);}
	}

	return;
};



