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

