function Gallery(args){

};

Gallery.prototype.addItem = function(name, description, targetId){
	var main = document.getElementById(targetId);
	var container = document.createElement("div");
	container.setAttribute("id", _.uniqueId());
	main.appendChild(container);
	return container.getAttribute("id");
	
};
Gallery.prototype.init = function(targetId){
	var panel = document.getElementById(targetId);
	panel.innerHTML = "test";

	var puck = {};
	puck.sampleVOs = [];
	for(var i = 0; i<4; i++){
		var id = this.addItem("","", "main");
		new UnipuckLayout({
								size : i*40 + 60, 
								fontSize: i+6, 
								fill:"#2E2E2E",
								fontColor : '#FFFFFF'
							}).render(id, puck);
	}

};

