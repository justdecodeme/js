var ohajiki = {};
ohajiki.canvas;
ohajiki.tool_panel;
ohajiki.ohajikis = [];
ohajiki.is_drag;
ohajiki.green_cnt = 0;
ohajiki.red_cnt = 0;
ohajiki.blue_cnt = 0;
ohajiki.touch_check = "";

ohajiki.initTool = function(){
};

ohajiki.startTool = function(){
	
	canvas_element = fs_com_bridge.to_base.moduleCanvasOn();
	ohajiki.canvas = $(canvas_element);
	
	ohajiki.setEvent();
	ohajiki.toolPanelOn();
    
    var cSize = fs_com_bridge.getCanvasSize();
	
	var module_div = $("<div></div>",{id:"ohajiki_div", css:{"position":"absolute",width:cSize.widthP,height:cSize.heightP,"z-index":2144460002}});
	
	$("#contScroll").prepend(module_div);
};


ohajiki.finishTool = function(){
	fs_com_bridge.to_base.moduleCanvasOff();
	ohajiki.toolPanelOff();
	$("#ohajiki_div").remove();
};


ohajiki.setEvent = function(){
	
	var is_touched;
	
	ohajiki.canvas.on("dragenter",function(e){
		//console.log("drag enter");
		return false;
	});
	
	ohajiki.canvas.on("dragover",function(e){
		//console.log("drag over");
		return false;
	});
	
	ohajiki.canvas.on("drop",function(e){
		//console.log("drop");
		return false;
	});
	
	ohajiki.canvas.on("mousedown touchstart pointerdown",function(e){
		//console.log("ohajiki/mouse down");
	});
};

ohajiki.toolPanelOn = function(){
	
	var panel_property = {
		width:215
		,height:80
		,id:"tool_panel"
		,addClass:"tool_panel"
		,on:{}
		,css:{
			position:"absolute"
			,"left":"100px"
			,"z-index":2144560003
			,"background-color":"#eee"
			,"padding-top":"10px"
			,"border-radius":"10px"
			,"border":"1px solid #666"
		}
	};
	
	ohajiki.tool_panel = $("<div>",panel_property);
	
	var green_img = $("<img>",{id:"green_img",width:70,height:70, class:"ohajiki_img"});
	green_img.attr("src","../../modules/ohajiki/img/green.png");
	//green_img.attr("draggable",true);
	ohajiki.tool_panel.append(green_img);
	
	
	//var red_img = new Image(70,70);
	var red_img = $("<img>",{id:"red_img",width:70,height:70, class:"ohajiki_img"});
	//red_img.src = "../../modules/ohajiki/img/red.png";
	red_img.attr("src","../../modules/ohajiki/img/red.png");
	ohajiki.tool_panel.append(red_img);
	
	var blue_img = $("<img>",{id:"blue_img",width:70,height:70, class:"ohajiki_img"});
	blue_img.attr("src","../../modules/ohajiki/img/blue.png");
	ohajiki.tool_panel.append(blue_img);
	
	
	$("#content").prepend(ohajiki.tool_panel);
	
	var dragStartEvent = function(e){
		//console.log("dragstart");
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		ohajiki.is_drag = true;
	};
	
	var dragOverEvent = function(e){
		//console.log("ohajiki/drag over");
		e.preventDefault();
		return false;
	};
	
	var dragEndEvent = function(e){
		//console.log("drag end");
		ohajiki.is_drag = false;
	};
    $(".ohajiki_img").css("cursor", "pointer");
    $(".ohajiki_img").css("pointer-events", "auto");
	
	green_img.on("dragstart",dragStartEvent);
	green_img.on("dragover",dragOverEvent);
	green_img.on("dragend",dragEndEvent);
	
	red_img.on("dragstart",dragStartEvent);
	red_img.on("dragover",dragOverEvent);
	red_img.on("dragend",dragEndEvent);
	
	blue_img.on("dragstart",dragStartEvent);
	blue_img.on("dragover",dragOverEvent);
	blue_img.on("dragend",dragEndEvent);
	
	var is_touched;
	
	var inside;
	
	var mouseDownEvent = function(e){
		if(is_touched){
			return;
		}
		//console.log("mouseDown");
		is_touched = true;
		
		var pos = {
			x: e.clientX == undefined ? e.touches[0].clientX : e.clientX,
			y: e.clientY == undefined ? e.touches[0].clientY : e.clientY
		};
		
		inside = {};
		inside.x = pos.x - $(this).offset().left;
		inside.y = pos.y - $(this).offset().top;
		//console.log(inside.x,inside.y);
	};
	
	var mouseMoveEvent = function(e){
		if(!is_touched){
			return;
		}
		
		//console.log("mouseMove");
	};
	
	var mouseUpEvent = function(e){
		if(!is_touched){
			return;
		}
		//e.preventDefault();
		//console.log("mouseUp");
		is_touched = false;
		
		var pos = {
			x: e.clientX == undefined ? e.touches[0].clientX : e.clientX,
			y: e.clientY == undefined ? e.touches[0].clientY : e.clientY
		};
		
		ohajiki.createOhajiki(e.currentTarget,pos,inside);
		////console.log(e.currentTarget,pos);
		
	};
	
	green_img.on("mousedown touchstart pointerdown",mouseDownEvent);
	green_img.on("touchmove mousemove pointermove",mouseMoveEvent);
	green_img.on("touchend touchcancel mouseup mouseleave mouseout pointerup pointerover pointerout",mouseUpEvent);
	
	red_img.on("mousedown touchstart pointerdown",mouseDownEvent);
	red_img.on("touchmove mousemove pointermove",mouseMoveEvent);
	red_img.on("touchend touchcancel mouseup mouseleave mouseout pointerup pointerover pointerout",mouseUpEvent);
	
	blue_img.on("mousedown touchstart pointerdown",mouseDownEvent);
	blue_img.on("touchmove mousemove pointermove",mouseMoveEvent);
	blue_img.on("touchend touchcancel mouseup mouseleave mouseout pointerup pointerover pointerout",mouseUpEvent);
};

ohajiki.toolPanelOff = function(){
	if( typeof ohajiki.tool_panel === "undefined" ){
		return;
	}
	
	ohajiki.tool_panel.remove();
};

ohajiki.createOhajiki = function(image,pos,inside){
	
    var objColor = image.id.replace("_img","");
    var cnt = 0;
    switch(objColor){
        case "green":
            ohajiki.green_cnt++;
            cnt = ohajiki.green_cnt;
            break;
        case "red":
            ohajiki.red_cnt++;
            cnt = ohajiki.red_cnt;
            break;
        case "blue":
            ohajiki.blue_cnt++;
            cnt = ohajiki.blue_cnt;
            break;
    }
	var ohajiki_obj = $("<div>", {id:objColor+"_ohajiki_"+cnt});
	var ohajiki_image = $("<img>", {src:image.src, width:"100%", height:"100%"});
	
	ohajiki_obj.css("position","absolute");
	ohajiki_obj.css("cursor","pointer");
	ohajiki_obj.width(image.width);
	ohajiki_obj.height(image.height);
	
	var adjust_x = pos.x - inside.x - $("#ohajiki_div").offset().left;
	var adjust_y = pos.y - inside.y - $("#ohajiki_div").offset().top;
	
	ohajiki_obj.css("left",adjust_x+"px");
	ohajiki_obj.css("top",adjust_y+"px");
	
	var is_touch;
    
    var sl = 0;
    var st = 0;
    var sx = 0;
    var sy = 0;
    var dx = 0;
    var dy = 0;
	
	ohajiki_obj.on("mousedown touchstart pointerdown",function(e){
		is_touch = true;
		
		var pos = {
			x: e.clientX == undefined ? e.touches[0].clientX : e.clientX,
			y: e.clientY == undefined ? e.touches[0].clientY : e.clientY
		};
		sx = pos.x;
		sy = pos.y;
        
		sl = $(this).position().left;
		st = $(this).position().top;
        

//        if(!is_touch){
//            is_touch = true;
//            if(ohajiki.touch_check === $(this).attr("id")){
//                $(this).remove();
//                ohajiki.touch_check = "";
//            }
//            ohajiki.touch_check = $(this).attr("id");
//            
//        }
	});
	
	ohajiki_obj.on("touchmove mousemove pointermove",function(e){
		if(!is_touch){
			return;
		}
		var pos = {
			x: e.clientX == undefined ? e.touches[0].clientX : e.clientX,
			y: e.clientY == undefined ? e.touches[0].clientY : e.clientY
		};
		
		dx = pos.x - sx;
		dy = pos.y - sy;
		
		$(this).css("left", sl + dx);
		$(this).css("top", st + dy);
        
	});
	
	ohajiki_obj.on("touchend touchcancel mouseup mouseleave mouseout pointerup pointerover pointerout",function(e){
//		if(!is_touch){
//			return;
//		}
//		is_touch = false;
//		
//		var pos = {
//			x: e.clientX == undefined ? e.touches[0].clientX : e.clientX,
//			y: e.clientY == undefined ? e.touches[0].clientY : e.clientY
//		};
		
		//console.log("up");
        
        sl = 0;
        st = 0;
        sx = 0;
        sy = 0;
        dx = 0;
        dy = 0;
		is_touch = false;
	});
	//ohajiki_obj.on("dragstart",function(){return false;});
	
	
	ohajiki_obj.append(ohajiki_image);
	$("#ohajiki_div").append(ohajiki_obj);
	//$("#content").append(ohajiki);
	//console.log(pos);
};
