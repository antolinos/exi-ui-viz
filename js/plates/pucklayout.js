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