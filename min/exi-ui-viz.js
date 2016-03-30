function DygraphWidget(a,b){this.width=1e3,this.height=600,this.labelsWidth=100,this.targetId=a,this.customBars=!1,this.ylabel="",this.xlabel="",this.id=BUI.id(),this.showRangeSelector=!1,this.interactionModel=null,this.labelsDivStyles=null,this.ranges=[],null!=b&&(null!=b.width&&(this.width=b.width),null!=b.height&&(this.height=b.height),null!=b.labelsWidth&&(this.labelsWidth=b.labelsWidth),null!=b.labelsDivStyles&&(this.labelsDivStyles=b.labelsDivStyles),null!=b.customBars&&(this.customBars=b.customBars),null!=b.ylabel&&(this.ylabel=b.ylabel),null!=b.xlabel&&(this.xlabel=b.xlabel),null!=b.showRangeSelector&&(this.showRangeSelector=b.showRangeSelector),null!=b.interactionModel&&(this.interactionModel=b.interactionModel),null!=b.scaled&&(this.scaled=b.scaled),null!=b.ranges&&(this.ranges=b.ranges)),this.onZoomX=new Event(this),this.onResetZoom=new Event(this),this.dblclick=new Event(this)}function StdDevDyGraph(a,b){this.scaled=!1,null==b&&(b={}),b.customBars=!0,DygraphWidget.prototype.constructor.call(this,a,b)}function Event(a){this._sender=a,this._listeners=[]}function ProgressBar(){}BUI={interval:4e4,rainbow:function(a,b){var c,d,e,f=b/a,g=~~(6*f),h=6*f-g,i=1-h;switch(g%6){case 0:c=1,d=h,e=0;break;case 1:c=i,d=1,e=0;break;case 2:c=0,d=1,e=h;break;case 3:c=0,d=i,e=1;break;case 4:c=h,d=0,e=1;break;case 5:c=1,d=0,e=i}var j="#"+("00"+(~~(255*c)).toString(16)).slice(-2)+("00"+(~~(255*d)).toString(16)).slice(-2)+("00"+(~~(255*e)).toString(16)).slice(-2);return j},groupBy:function(a,b){var c={};return a.forEach(function(a){var d=JSON.stringify(b(a));c[d]=c[d]||[],c[d].push(a)}),Object.keys(c).map(function(a){return c[a]})},getFileNameByPath:function(a){if(null!=a){var b=a.split("/");if(b.length>0)return b[b.length-1]}return"Not file"},getUpdateInterval:function(){return this.interval=this.interval+2e3,this.interval},getRadiationDamageThreshold:function(){return.7},getQualityThreshold:function(){return.7},getCreateShipmentURL:function(){return"/ispyb/user/viewProjectList.do?reqCode=display&menu=create_shipment"},getCreateShipmentList:function(){return"/ispyb/user/viewProjectList.do?reqCode=display&menu=list_shipment"},getShippingURL:function(a){return"/ispyb/user/viewProjectList.do?reqCode=display&menu=shipment&shippingId="+a},getMacromoleculeResultsURLByMultipleSearch:function(a){return"/ispyb/user/viewProjectList.do?reqCode=display&menu=macromolecule&search="+JSON.stringify(a).replace(new RegExp('"',"g"),"'")},getMacromoleculeResultsURL:function(a){return"/ispyb/user/viewProjectList.do?reqCode=display&menu=macromolecule&macromoleculeId="+a},getMacromoleculeBufferResultsURL:function(a,b){return"/ispyb/user/viewProjectList.do?reqCode=display&menu=macromolecule&bufferId="+b+"&macromoleculeId="+a},getMacromoleculeHeader:function(a){function b(a){if(null!=a){var b=BUI.createFormLabel("Name :",BIOSAXS.proposal.getMacromoleculeById(a).name,75,400);return b+=BUI.createFormLabel("Acronym :",BIOSAXS.proposal.getMacromoleculeById(a).acronym,75,400),null!=BIOSAXS.proposal.getMacromoleculeById(a).comments&&(b+=BUI.createFormLabel("Comments :",BIOSAXS.proposal.getMacromoleculeById(a).comments,75,400)),b}}return Ext.create("Ext.container.Container",{frame:!1,layout:"hbox",title:"Macromolecule",bodyPadding:"5",width:890,margin:"0 0 10 0",height:100,style:{borderColor:"#BDBDBD",borderStyle:"solid",borderWidth:"1px"},fieldDefaults:{msgTarget:"side",labelWidth:100},items:[{margin:"10 0 0 10",width:475,border:0,html:b(a)},{margin:"10 0 0 10",width:475,border:0,html:BUI.getZipHTMLByMacromoleculeId(a)}]})},getZipHTMLByMacromoleculeId:function(a){if(null!=a){var b=BIOSAXS.proposal.getMacromoleculeById(a).acronym;return"<div><a style='color:blue;' href='/ispyb/user/dataadapter.do?reqCode=getZipFileByMacromoleculeId&fileName="+b+"&macromoleculeId="+a+"'><img src='../images/download.png' /> Download</a></div>"}},getZipHTMLByExperimentId:function(a,b){return null==b&&(b="experiment"),"<div><a style='color:blue;' href='/ispyb/user/dataadapter.do?reqCode=getZipFileByExperimentId&fileName="+b+"&experimentId="+a+"'><img src='../images/download.png' /> Download</a></div>"},getZipURLByAverageId:function(a,b){return null==b&&(b="experiment"),"/ispyb/user/dataadapter.do?reqCode=getZipFileByAverageListId&f&mergeIdsList="+a+"&fileName="+b},getZipURLBySubtractionId:function(a,b){return null==b&&(b="experiment"),"/ispyb/user/dataadapter.do?reqCode=getZipFileByAverageListId&f&subtractionIdList="+a+"&fileName="+b},getZipHTMLByFrameRangeId:function(a,b,c){return"<div><a style='color:blue;' href='/ispyb/user/dataadapter.do?reqCode=getZipFileH5ByFramesRange&f&experimentId="+a+"&start="+Number(b)+"&end="+Number(c)+"'><img src='../images/download.png' /> Download</a></div>"},getZipFrameHPLCUrl:function(a,b,c){return"/ispyb/user/dataadapter.do?reqCode=getZipFileH5ByFramesRange&f&experimentId="+a+"&start="+Number(b)+"&end="+Number(c)},getQueueUrl:function(){return"/ispyb/user/dataadapter.do?reqCode=getPagingCompactAnalysisByProposalId"},getQueueUrlByExperiment:function(a){return"/ispyb/user/dataadapter.do?reqCode=getPagingCompactAnalysisByExperimentId&f&experimentId="+a},getStandardDeviation:function(a){for(var b=0,c=0,d=null,e=[],f=0;f<a.length;f++){var g=a[f];null!=g&&(isNaN(g)||(c+=1,b+=Number(g),e.push(Number(g))))}d=c>0?b/c:b;var h=0;for(f=0;f<e.length;f++)h+=Math.pow(e[f]-d,2);var i=Math.sqrt(h/c);return{std:i,sum:b,avg:d,validNumber:c,totalNumber:a.length,values:a}},getHTMLTableForFrameAveraged:function(a,b,c,d,e,f,g,h,i){function j(a,b){return"<td style='font:normal 9px tahoma,arial,verdana,sans-serif;color:black'>("+a+" of "+b+")</td>"}function k(a,b){return.5>a/b?"#FA5858":a/b>=.5&&.8>a/b?"#FF9900":"white"}function l(a,b,c,d){return"<tr style='background-color:"+k(c,d)+";height:12px;padding:1px;'><td style=' width:10px; height:10px;'> "+BUI.getRectangleColorDIV(a,10,10)+"</td> <td style='padding:5px;'> "+b+"</td>"+j(c,d)+"</tr>"}var m="<table style='margin: 1,1,1,1;width:100%;font:normal 10px tahoma,arial,verdana,sans-serif;'>";return null!=a&&null!=c&&(color=BIOSAXS.proposal.bufferColors[g],m+=l(color,a,c,f)),null!=b&&null!=d&&(null==i?color=BIOSAXS.proposal.macromoleculeColors[h]:color=i,m+=l(color,b,d,f)),null!=a&&null!=e&&(color=BIOSAXS.proposal.bufferColors[g],m+=l(color,a,e,f)),m+"</table>"},isWebGLEnabled:function(a){if(window.WebGLRenderingContext){var b=document.createElement("canvas");names=["webgl","experimental-webgl","moz-webgl","webkit-3d"],context=!1;for(var c=0;4>c;c++)try{if(context=b.getContext(names[c]),context&&"function"==typeof context.getParameter)return a?{name:names[c],gl:context}:!0}catch(d){}return!1}return!1},getHTMLTableForPrefixes:function(a,b,c){function d(a){file=a;try{file=a.split("/")[a.split("/").length-1]}catch(b){file="NA"}return"<tr><td  style='height:12px;padding:5px;'>"+file+"</td></tr>"}var e="<table style='margin: 1,1,1,1;width:100%;font:normal 10px tahoma,arial,verdana,sans-serif;'>";return null!=a&&(e+=d(a)),null!=b&&(e+=d(b)),null!=c&&(e+=d(c)),e+"</table>"},getBaseURL:function(){return"/ispyb/user/dataadapter.do"},getPrintcomponentURL:function(a){return"/ispyb/user/viewDewarAction.do?reqCode=generateLabels&dewarId="+a},getPDBVisualizerURL:function(a,b,c){return"/ispyb/user/viewProjectList.do?reqCode=display&menu=PDBVisualizer&modelId="+a+"&experimentId="+c+"&subtractionId="+b},getURL:function(){return this.getBaseURL()+"?reqCode=getImage"},getAbinitioImageURL:function(){return this.getBaseURL()+"?reqCode=getAbinitioImage"},getNSDImageURL:function(a){return BUI.getAbinitioImageURL()+"&type=NSD&modelListId="+a},getCHI2ImageURL:function(a){return BUI.getAbinitioImageURL()+"&type=CHI2&modelListId="+a},getModelFile:function(a,b,c){return this.getBaseURL()+"?reqCode=getModelFile&type="+a+"&modelId="+b+"&format="+c},getPdbURL:function(){return this.getBaseURL()+"?reqCode=getPdbFiles"},getStvArray:function(a,b){return a=Number(a),b=Number(b),[a-b,a,a+b]},getPointArrayForDygraph:function(a,b,c){return[a,BUI.getStvArray(b,c)]},createDIV:function(a,b,c,d){var e=document.createElement("div"),f=document.createElement("span");return null!=c&&f.setAttribute("class",c),null!=d?f.setAttribute("style","float:left;width:"+b+"px;height:18px;background-color:"+d):f.setAttribute("style","float:left;width:"+b+"px;height:18px;"),f.appendChild(document.createTextNode(a)),e.appendChild(f),e},createFormLabel:function(a,b,c,d,e){var f=document.createElement("div");return f.appendChild(BUI.createDIV(a,c,"bLabel",e)),f.appendChild(BUI.createDIV(b,d,"btext",e)),f.innerHTML},createTextArea:function(a,b,c,d,e){var f=document.createElement("div");f.appendChild(BUI.createDIV(a,c,"bLabel"));var g=document.createElement("textarea");return g.setAttribute("rows",d),g.setAttribute("cols",e),g.appendChild(document.createTextNode(b)),f.appendChild(g),f.innerHTML},showBetaWarning:function(){alert("ISPyB for Biosaxs version Beta has not this functionality enabled")},formatValuesErrorUnitsScientificFormat:function(a,b,c,d){var e=14,f=2,g=10,h=!1;if(null!=d&&(null!=d.fontSize&&(e=d.fontSize),null!=d.decimals&&(f=d.decimals),null!=d.errorFontSize&&(g=d.errorFontSize),null!=d.lineBreak&&(h=d.lineBreak)),""==a)return"";if(null==b)return"<span style='font-size:"+e+"px'>"+Number(a).toFixed(f)+"</span>";var i="<span style='font-size:"+e+"px'>"+Number(a).toFixed(f)+"<span style='font-size:"+g+"px;color:gray'>  "+c+"</span></span>";return h&&(i+="<br/>"),i+"<span style='font-size:"+g+"px'> &#177; "+Number(Number(b).toFixed(3)).toExponential()+"</span></span>"},formatValuesErrorUnits:function(a,b,c,d){var e=16,f=2,g=10,h=!0;if(null!=d&&(null!=d.fontSize&&(e=d.fontSize),null!=d.decimals&&(f=d.decimals),null!=d.errorFontSize&&(g=d.errorFontSize),null!=d.lineBreak&&(h=d.lineBreak)),""==a)return"";if(null==b)return"<span style='font-size:"+e+"px'>"+Number(a).toFixed(f)+"</span>";var i="<span style='font-size:"+e+"px'>"+Number(a).toFixed(f)+"<span style='font-size:"+g+"px;color:gray'>  "+c+"</span></span>";return h&&(i+="<br/>"),i+"<span style='font-size:"+g+"px'> &#177; "+Number(Number(b).toFixed(8)).toExponential()+"</span></span>"},formatValuesUnits:function(a,b,c){var d=12,e=2,f=10;return null!=c&&(null!=c.fontSize&&(d=c.fontSize),null!=c.decimals&&(e=c.decimals),null!=c.unitsFontSize&&(f=c.unitsFontSize)),""==a?"":null==b?"<span style='font-size:"+d+"px'>"+Number(a).toFixed(e)+"</span>":"<span style='font-size:"+d+"px'>"+Number(a).toFixed(e)+" </span><span style='font-size:"+f+"px;color:gray'>  "+b+"</span></span>"},getGreenButton:function(a,b){var c=70,d=20;return null!=b&&(null!=b.width&&(c=b.width),null!=b.height&&(d=b.height)),'<input type="button" name="btn" style= "font-size:9px;width:'+c+"px; height:"+d+'px" class="btn-green" value="'+a+'"/>'},getBlueButton:function(a,b){var c=70,d=20;return null!=b&&(null!=b.width&&(c=b.width),null!=b.height&&(d=b.height)),'<input type="button" name="btn" style= "font-size:9px;width:'+c+"px; height:"+d+'px" class="btn-blue" value="'+a+'"/>'},getSubmitGreenButton:function(a){return'<input type="submit" type="button" name="btn" class="btn-green" value="'+a+'"/>'},getRedButton:function(a){return'<input type="button"  name="btn" class="btn-red" value="'+a+'" />'},getRectangleColorDIV:function(a,b,c){return'<div style="border: 1px solid gray;background-color: '+a+"; height:"+b+"px;width:"+c+'px" ></div>'},openBufferWindow:function(a){var b=new BufferWindow;b.draw(tabs.experiment.getBufferById(a),tabs.experiment)},safetyRenderer:function(a,b,c){var d=a;return"YELLOW"==a&&(d="#E9AB17"),'<span style="color:'+d+';">'+a+"</span>"},getSampleColor:function(){return"#CB181D"},getLightSampleColor:function(){return"#FCBBA1"},getBufferColor:function(){return"#6A51A3"},getLightBufferColor:function(){return"#BCBDDC"},formatConcentration:function(a){return null!=a?"<span style='font-size:16px'>"+Number(a).toFixed(2)+"</span><span style='font-size:9px'> mg/ml </span>":a},formatVolume:function(a,b){return Number(a.data.volumeToLoad)>Number(a.data.volume)?"<span style='color:red;font-weight:bold;'>"+b+"</span><span style='font-size:9;color:red;'> ï¿½l</span>":Number(a.data.volumeToLoad)==Number(a.data.volume)?"<span style='color:orange;font-weight:bold;'>"+b+"</span><span style='font-size:9;color:orange;'> ï¿½l</span>":"<span>"+b+"</span><span style='font-size:9'> ï¿½l</span>"},getProposal:function(){return new Proposal},getSampleNameRenderer:function(a,b,c){var d=c.data;return null==c.raw.macromolecule3VO?'<span style="color:blue;">'+d.code+"</span>":'<span style="color:green;">'+d.code+"</span>"},getSafetyLevels:function(){var a=[];return a.push({safetyLevelId:"",name:"UNKNOWN"}),a.push({safetyLevelId:1,name:"GREEN"}),a.push({safetyLevelId:2,name:"YELLOW"}),a.push({safetyLevelId:3,name:"RED"}),a},getErrorColor:function(){return"#F6CED8"},getWarningColor:function(){return"#F5DA81"},getValidColor:function(){return"#E0F8E0"},getSamplePlateLetters:function(){return["A","B","C","D","E","F","G","H"]},getSamplePositionHTML:function(a,b){var c="",d="",e="",f=this.getSamplePlateLetters();if(null!=a.sampleplateposition3VO){var g=b.getSamplePlateById(a.sampleplateposition3VO.samplePlateId);if(null!=g){c=g.slotPositionColumn,d=a.sampleplateposition3VO.rowNumber,e=a.sampleplateposition3VO.columnNumber;var h="<span style='font-weight:italic'>Plate: </span><span style='font-weight:bold'>"+c+"</span>-<span style='font-weight:bold'>"+f[d-1]+"</span><span style='font-weight:bold'>"+e+"</span>";return h}}return""},getSafetyLabelName:function(a){for(var b=BUI.getSafetyLevels(),c=0;c<b.length;c++)if(b[c].safetyLevelId==a)return b[c].name;return"UNKNOWN"},id:function(){for(var a="",b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=0;5>c;c++)a+=b.charAt(Math.floor(Math.random()*b.length));return"ExiSAXS"+a},showWarning:function(a){Ext.Msg.show({title:"Warning",msg:a,icon:Ext.Msg.WARNING,animEl:"elId"})},showError:function(a){Ext.Msg.show({title:"Warning",msg:a,icon:Ext.Msg.ERROR,animEl:"elId"})},getTipHTML:function(a){return"<div  class='panelMacro' ><table class='tipMacro'><colgroup span='1'><col span='1' width='24'><col span='1'></colgroup><tbody><tr><td colspan='1' rowspan='1' valign='top'></td><td colspan='1' rowspan='1'><b>Tip</b><br clear='none'>"+a+"</td></tr></tbody></table></div>"},getWarningHTML:function(a){return"<div class='panelMacro' ><table class='warningMacro'><colgroup span='1'><col span='1' width='24'><col span='1'></colgroup><tbody><tr><td colspan='1' rowspan='1' valign='top'></td><td colspan='1' rowspan='1'><b>Warning</b><br clear='none'>"+a+"</td></tr></tbody></table></div>"},getErrorHTML:function(a){return"<div class='panelMacro' ><table class='errorMacro'><colgroup span='1'><col span='1' width='24'><col span='1'></colgroup><tbody><tr><td colspan='1' rowspan='1' valign='top'><img align='middle' src='https://cwiki.apache.org/confluence/images/emoticons/forbidden.gif' width='16' height='16' alt='' border='0'></td><td colspan='1' rowspan='1'><b>Error</b><br clear='none'>"+a+"</td></tr></tbody></table></div>"},getProgessBar:function(a,b){var c="#0a0";c="#99CC00",a>100&&(c="yellow",a=100),isNaN(a)&&(c="white",a=0);var d=a+"%";return null!=b&&(d=b),"<div class='meter-wrap'><div class='meter-value' style='background-color: "+c+" ; width: "+a+"%;'><div class='meter-text'>"+d+"</div></div></div>"},getFileName:function(a){return null!=a?a.split("/")[a.split("/").length-1]:""}};var BIOSAXS_COMBOMANAGER={getComboProposal:function(a){var b=null,c=400,d="proposalIdCombo";null!=a&&(null!=a.labelWidth&&(b=a.labelWidth),null!=a.width&&(c=a.width),null!=a.id&&(d=a.id));var e=Ext.create("Ext.data.Store",{fields:["code","number","title","proposalId","proposal"],data:EXI.proposalManager.getProposals()});return Ext.create("Ext.form.ComboBox",{fieldLabel:"Proposal",id:d,width:c,store:e,labelWidth:b,queryMode:"local",displayField:"proposal",valueField:"proposalId"})},getComboMacromoleculeByMacromolecules:function(a,b){var c=150,d="0 0 5 0",e=300;null!=b&&(null!=b.labelWidth&&(c=b.labelWidth),null!=b.margin&&(d=b.margin),null!=b.width&&(e=b.width));var f=Ext.create("Ext.data.Store",{fields:["macromoleculeId","acronym"],data:a,sorters:["acronym"]});return Ext.create("Ext.form.ComboBox",{fieldLabel:"Macromolecules",labelWidth:c,width:e,margin:d,store:f,editable:!1,queryMode:"local",displayField:"acronym",valueField:"macromoleculeId"})},getComboBuffers:function(a,b){var c=150,d="0 0 5 0",e=300,f="Buffer";null!=b&&(null!=b.labelWidth&&(c=b.labelWidth),null!=b.margin&&(d=b.margin),null!=b.width&&(e=b.width),null!=b.noLabel&&(f=null));var g=Ext.create("Ext.data.Store",{fields:["bufferId","acronym"],data:a,sorters:["acronym"]});return Ext.create("Ext.form.ComboBox",{fieldLabel:f,labelWidth:c,width:e,margin:d,editable:!1,store:g,queryMode:"local",displayField:"acronym",valueField:"bufferId"})},getComboSessions:function(a,b){var c=150,d="0 0 5 0",e=300;null!=b&&(null!=b.labelWidth&&(c=b.labelWidth),null!=b.margin&&(d=b.margin),null!=b.width&&(e=b.width));for(var f=0;f<a.length;f++)a[f].startDateFormatted=moment(a[f].startDate).format("DD/MM/YYYY"),a[f].sorter=moment(a[f].startDate).format("YYYYMMDD");var g=Ext.create("Ext.data.Store",{fields:["sessionId","startDateFormatted","beamlineName","startDate","endDate","beamlineOperator"],data:a,sorters:["sorter"]});return Ext.create("Ext.form.ComboBox",{fieldLabel:"Session",labelWidth:c,width:e,margin:d,store:g,queryMode:"local",valueField:"sessionId",tpl:Ext.create("Ext.XTemplate",'<tpl for=".">','<div class="x-boundlist-item">{startDateFormatted}<span style="font-weight:bold"> {beamlineName}</span></div>',"</tpl>"),displayTpl:Ext.create("Ext.XTemplate",'<tpl for=".">',"{startDateFormatted} {beamlineName}","</tpl>")})},getComboStorageTemperature:function(a){var b=200,c=500;null!=a&&(null!=a.labelWidth&&(b=a.labelWidth),null!=a.width&&(c=a.width));var d=Ext.create("Ext.data.Store",{fields:["value","name"],data:[{value:"N/A",name:"N/A"},{value:"-80",name:"-80"},{value:"-20",name:"-20"},{value:"+4",name:"+4"},{value:"Room Temperature",name:"Room Temperature"}]});return this.storageLocationComboBox=Ext.create("Ext.form.ComboBox",{fieldLabel:"Storage Condition",store:d,queryMode:"local",labelWidth:b,width:c,displayField:"name",valueField:"value",value:"Not set"}),this.storageLocationComboBox},getComboPuckType:function(a){var b=200,c=500,d=null;null!=a&&(null!=a.labelWidth&&(b=a.labelWidth),null!=a.width&&(c=a.width),null!=a.margin&&(d=a.margin));var e=Ext.create("Ext.data.Store",{fields:["value","name"],data:[{value:10,name:"SPINE"},{value:16,name:"UNIPUCK"},{value:96,name:"PLATE"}]});return this.storageLocationComboBox=Ext.create("Ext.form.ComboBox",{fieldLabel:"Type",store:e,queryMode:"local",labelWidth:b,width:c,margin:d,displayField:"name",valueField:"value",value:"Not set"}),this.storageLocationComboBox}},MX_COMBOMANAGER={getComboProteins:function(a,b){var c=150,d="10 10 10 40",e=300;null!=b&&(null!=b.labelWidth&&(c=b.labelWidth),null!=b.margin&&(d=b.margin),null!=b.width&&(e=b.width));var f=Ext.create("Ext.data.Store",{fields:["name","acronym"],data:a,sorters:["acronym"]});return Ext.create("Ext.form.ComboBox",{fieldLabel:"Proteins",labelWidth:c,width:e,margin:d,store:f,editable:!1,queryMode:"local",displayField:"acronym",valueField:"proteinId"})}};DygraphWidget.prototype.dblclick=function(a,b,c){b.widget.dblclick.notify({x:b.lastx_})},DygraphWidget.prototype._createHTLMWrapper=function(a,b,c){if(null!=document.getElementById(this.targetId)){document.getElementById(this.targetId).innerHTML="";var d=document.createElement("table"),e=document.createElement("tr"),f=document.createElement("td");this.canvasDiv=document.createElement("div"),this.canvasDiv.setAttribute("id","dygraph_canvas_"+this.id),this.canvasDiv.setAttribute("style","width:"+this.width+"px;height:"+this.height+"px"),f.appendChild(this.canvasDiv),this.legendDiv=document.createElement("div"),e.appendChild(f),d.appendChild(e),document.getElementById(this.targetId).appendChild(d)}},DygraphWidget.prototype.draw=function(a,b,c){var d=this;this._createHTLMWrapper(a,b,c),this.dygraph=new Dygraph(this.canvasDiv,a,{labels:c,labelsDiv:this.legendDiv,labelsSeparateLines:!0,highlightCircleSize:3,strokeWidth:1,customBars:this.customBars,colors:b,xlabel:this.xlabel,ylabel:this.ylabel,showRangeSelector:this.showRangeSelector,rangeSelectorPlotStrokeColor:"rgba(50,50,50,0.3)",rangeSelectorPlotFillColor:"rgba(50,50,50,0.1)",labelsDivStyles:this.labelsDivStyles,interactionModel:this.interactionModel,underlayCallback:function(a,b,c){if(null!=d.ranges)for(var e in d.ranges){var f=c.toDomCoords(d.ranges[e].start,-20),g=c.toDomCoords(d.ranges[e].end,20),h=f[0],i=g[0];a.fillStyle=d.ranges[e].color,a.fillRect(h,b.y,i-h,b.h)}}})},StdDevDyGraph.prototype.dblclick=DygraphWidget.prototype.dblclick,StdDevDyGraph.prototype._createHTLMWrapper=DygraphWidget.prototype._createHTLMWrapper,StdDevDyGraph.prototype.draw=DygraphWidget.prototype.draw,StdDevDyGraph.prototype.input=function(){return{data:[[1,[2,3,3.5],[4,4.2,5]],[2,[5,5.5,5.7],[4,4.2,5]]],colors:["blue","red"],labels:["","data1","data2"]}},StdDevDyGraph.prototype.test=function(a){var b=new StdDevDyGraph(a,{width:500,height:400,xlabel:"xLabel",showRangeSelector:!1});b.draw(b.input().data,b.input().colors,b.input().labels)},Event.prototype={attach:function(a){this._listeners.push(a)},notify:function(a){for(var b=0;b<this._listeners.length;b++)this._listeners[b](this._sender,a)}},ProgressBar.prototype.getPanel=function(a,b){var c=parseFloat(a)/parseFloat(b)*100,d="#337ab7";return 100==c&&(d="green"),50>c&&(d="orange"),"<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='10' aria-valuemin='0' aria-valuemax='100' style='background-color:"+d+";width:"+c+"%'></div></div>"},String.prototype.format=function(a){var b=this;return b.replace(String.prototype.format.regex,function(b){var c,d=parseInt(b.substring(1,b.length-1));return c=d>=0?a[d]:-1===d?"{":-2===d?"}":""})},String.prototype.format.regex=new RegExp("{-?[0-9]+}","g");
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




