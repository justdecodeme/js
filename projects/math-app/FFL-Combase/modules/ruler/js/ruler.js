
var ruler = {};
ruler.showFlag = false;
ruler.sx = 600;
ruler.sy = 400;
ruler.ex = 1000;
ruler.ey = 500;
ruler.width = 400;
ruler.height = 100;
ruler.angle = 0;
ruler.inside = false;
ruler.line_width = 30;
ruler.module_name = "ruler";
ruler.penInfo = {
    color: "#000000",
    size: 6,
    opacity: 1.0
};

// ツール初期化のためにコールされるファンクション
ruler.initTool = function(){
    var done = false;
    var head = document.getElementsByTagName('head')[0];
	var cssFile = '../../modules/ruler/css/ruler.css';
	var link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("href", cssFile);
	link.setAttribute("type", "text/css");
	head.appendChild(link);
    
    link.onload = link.onreadystatechange = function() {
        if ( !done && (!this.readyState ||
                this.readyState === "loaded" || this.readyState === "complete") ) {
            done = true;
            link.onload = link.onreadystatechange = null;

//            if ( head && link.parentNode ) {
//                head.removeChild( link );
//            }
        }
    };
    
};

// ツール起動時にコールされるファンクション
ruler.startTool = function(){
    
    ruler.showFlag = true;
	
    var rulerDiv = $("<div>", {id:"rulerCanvasDiv", class:"rulerTool"});
    var rulerImg = $("<img>", {width:"100%", height:"auto", src:"../../modules/ruler/img/ruler_sample.png"});
    var rulerMoveDiv = $("<div>", {id:"rulerMoveDiv"});
    var rulerDrawDiv = $("<div>", {id:"rulerDrawDiv"});
    var rulerShowDiv = $("<div>", {id:"rulerShowDiv"});
    
    var ww = $(window).width();
    var wh = $(window).height();
    var tmpW = ww * 0.2;
    var tmpH = tmpW * 0.25;
    var tmpL = (ww - tmpW) / 2;
    var tmpT = (wh - tmpH) / 2;
    
    ruler.sx = tmpL;
    ruler.sy = tmpT;
    ruler.width = tmpW;
    ruler.height = tmpH;
    
    rulerDiv.css("left", ruler.sx);
    rulerDiv.css("top", ruler.sy);
    rulerDiv.width(ruler.width);
    rulerDiv.height(ruler.height);
    rulerDiv.append(rulerImg);
    
    rulerMoveDiv.width(ruler.width);
    rulerMoveDiv.height(ruler.height * 0.8);
    rulerDiv.append(rulerMoveDiv);

    rulerDrawDiv.width(ruler.width);
    rulerDrawDiv.height(ruler.height * 0.2);
    rulerDiv.append(rulerDrawDiv);
    
    rulerShowDiv.width(ruler.width * 0.1);
    rulerShowDiv.height(ruler.height * 0.4);
    rulerDiv.append(rulerShowDiv);
    
    var rulerPenDiv = $("<div>", {id:"rulerPen", class:"rulerSubTool"});
    var rulerPenImg = $("<img>", {width:"auto", height:"100%", src:"../../modules/ruler/img/fsisb_pen_n.png"});
    rulerPenDiv.append(rulerPenImg);
    rulerDiv.append(rulerPenDiv);
    rulerPenDiv.css("height", ruler.height * 0.75);
    rulerPenDiv.css("width", ruler.height * 0.75);
    rulerPenDiv.css("float", "left");

    var rulerCallDiv = $("<div>", {id:"rulerCall", class:"rulerSubTool"});
    var rulerCallSelect = $("<select>", {id:"rulerCallSelect", width:ruler.width*0.4, height:ruler.height * 0.5});
    
    var rulerCallOptions = {
        0:"タッチ",
        1:"ペン",
        2:"図形",
        3:"付箋",
        4:"タイマー",
        5:"目次",
        6:"巻物",
        7:"めくり紙",
        },
        rulerCallSelect,
        $option,
        isSelected;

    $.each(rulerCallOptions, function (value, name) {
        isSelected = (value === 0);
        $option = $('<option>')
            .val(value)
            .text(name)
            .prop('selected', isSelected);
        rulerCallSelect.append($option);
    });    
    
    rulerCallSelect.val(0);
    
    var rulerCallBtn = $("<input>", {class:"rulerSubTool", type:"button", value:"call", width:ruler.width*0.2, height:ruler.height * 0.5});
    rulerCallDiv.append(rulerCallSelect);
    rulerCallDiv.append(rulerCallBtn);
    rulerDiv.append(rulerCallDiv);
    rulerCallDiv.css("height", ruler.height * 0.75);
    rulerCallDiv.css("padding-left", ruler.height * 1.5);

    $("body").append(rulerDiv);
    
    var touch_flg;
    var sx = 0;
    var sy = 0;
    var dx = 0;
    var dy = 0;
    
    var show_flg = false;
    $(".rulerSubTool").css("visibility", "hidden");
    rulerShowDiv.on("click",function(){
        if(show_flg){
            $(".rulerSubTool").css("visibility", "hidden");
            show_flg = false;
        }else{
            $(".rulerSubTool").css("visibility", "visible");
            show_flg = true;
            
        }
    });
    
    rulerMoveDiv.on("mousedown touchstart pointerdown",function(e){
        if(!touch_flg){
            touch_flg = true;
            e.preventDefault();

            var pos = {
                x: e.clientX == undefined ? e.touches[0].clientX : e.clientX,
                y: e.clientY == undefined ? e.touches[0].clientY : e.clientY
            };
            sx = pos.x;
            sy = pos.y;
            
        }
        
    });
    rulerMoveDiv.on("mousemove touchmove pointermove",function(e){
    	e.preventDefault();
    	if(!touch_flg){
    		return;
    	}
    	var pos = {
			x: e.clientX == undefined ? e.touches[0].clientX : e.clientX,
			y: e.clientY == undefined ? e.touches[0].clientY : e.clientY
		};
        dx = pos.x - sx;
        dy = pos.y - sy;
        
    	$("#rulerCanvasDiv").css("left", ruler.sx + dx);
        $("#rulerCanvasDiv").css("top", ruler.sy + dy);
    	
    });
    rulerMoveDiv.on("mouseup mouseout mouseleave touchend pointerup pointerout pointerleave",function(e){
    	e.preventDefault();
    	if(!touch_flg){
    		return;
    	}
    	
    	touch_flg = false;
        sx = 0;
        sy = 0;
        ruler.sx = ruler.sx + dx;
        ruler.sy = ruler.sy + dy;
        dx = 0;
        dy = 0;
        
    });
    
    
	$("#rulerDrawDiv").on("click",function(){
		//console.log("click");
		//クリックしたら直線を引いたことにするスクリプト
		
		//引いたことにした直線の描画情報を基盤側に渡すスクリプト
		//描画情報(push_data)にエレメントやファンクションは格納できない
		var push_data = {};
        
        ruler.penInfo = fs_com_bridge.to_base.getPenInfo();
        
		//ruler.test();
        if(ruler.penInfo == null){
            ruler.penInfo = {
                color: "#000000",
                size: 6,
                opacity: 1.0
            };
        }
        ruler.drawLine();
		//fs_com_bridge.test("ruler","action");
		
		//ruler.pushDrawLog();
	});
    
    
    rulerPenDiv.on("click", function(){
        fs_com_bridge.callSButton("fflcom_pen", true);
    });
    
    rulerCallBtn.on("click", function(){
        var select = parseInt($("#rulerCallSelect").val());
        switch(select){
            case 0:
                fs_com_bridge.callSButton("fflcom_finger");
                break;
            case 1:
                fs_com_bridge.callSButton("fflcom_pen");
                break;
            case 2:
                fs_com_bridge.callSButton("fflcom_figure");
                break;
            case 3:
                fs_com_bridge.callSButton("fflcom_fusen");
                break;
            case 4:
                fs_com_bridge.callSButton("fflcom_timer");
                break;
            case 5:
                fs_com_bridge.callSButton("fflcom_index");
                break;
            case 6:
                fs_com_bridge.callSButton("fflcom_scroll");
                break;
            case 7:
                fs_com_bridge.callSButton("fflcom_mekuri");
                break;
        }
    });
};

ruler.pushDrawLog = function(){
	//console.log("pushDrawLog");
	var div_ruler = $("#rulerCanvasDiv");
	var div_ruler_top = div_ruler.offset().top;
	var div_ruler_left = div_ruler.offset().left;
	var div_ruler_w = div_ruler.width();
	var div_ruler_h = div_ruler.height();
	
	var line_s = {};
	var line_e = {};
	line_s.x = div_ruler_left;
	line_e.x = div_ruler_left + div_ruler_w;
	
	line_s.y = div_ruler_top + div_ruler_h
	line_e.y = line_s.y;
	
	var line_s_convert = fs_com_bridge.chg2PhysicalPos(line_s);
	var line_e_convert = fs_com_bridge.chg2PhysicalPos(line_e);
	
	var push_data = {};
	push_data.action = "draw";
	push_data.line_s = line_s_convert;
	push_data.line_e = line_e_convert;
	push_data.color = ruler.penInfo.color;
	push_data.size = ruler.penInfo.size;
	push_data.opacity = ruler.penInfo.opacity;
	
	fs_com_bridge.to_base.pushLearningRec(ruler.module_name,push_data);
	
	fs_com_bridge.to_base.reDraw();
};

ruler.drawLine = function(){
	var div_ruler = $("#rulerCanvasDiv");
	var div_ruler_top = div_ruler.offset().top;
	var div_ruler_left = div_ruler.offset().left;
	var div_ruler_w = div_ruler.width();
	var div_ruler_h = div_ruler.height();
	
	var line_s = {};
	var line_e = {};
	line_s.x = div_ruler_left;
	line_e.x = div_ruler_left + div_ruler_w;
	
	line_s.y = div_ruler_top + div_ruler_h
	line_e.y = line_s.y;
	
	var line_s_convert = fs_com_bridge.chg2PhysicalPos(line_s);
	var line_e_convert = fs_com_bridge.chg2PhysicalPos(line_e);
	
	var draw_data = {};
	draw_data.line_s = JSON.parse(JSON.stringify(line_s_convert));
	draw_data.line_e = JSON.parse(JSON.stringify(line_e_convert));
	draw_data.color = ruler.penInfo.color;
	draw_data.size = ruler.penInfo.size;
	draw_data.opacity = ruler.penInfo.opacity;
	
	var count = 0;
	
	var drawTemp = function(){
		
		draw_data.line_e.x = draw_data.line_s.x + count;
		
		fs_com_bridge.to_base.drawLocus(ruler.module_name,draw_data);
		
		if( line_s_convert.x + count >= line_e_convert.x ){
			clearInterval(interval);
			ruler.pushDrawLog();
		}
		
		count += 10;
	};
	
	var interval = setInterval(drawTemp,10);
	
};


// 接触しているかの判定時（消しゴム等）にコールされるファンクション
ruler.hitTest = function(touch_pos,draw_data){
	
	var line_s = draw_data.data.line_s;
	var line_e = draw_data.data.line_e;
	var size = ruler.line_width;
	
	if(line_s.x <= touch_pos.x && touch_pos.x <= line_e.x && line_e.y <= touch_pos.y && touch_pos.y <= line_e.y + size ){
		//console.log("hit");
		return true;
	}
	else{
		return false;
	}
	//return true;
}


//外部ツール独自のアクションを規定し、処理したdraw_dataを返す。
//data
//data.id
//data.z_index
//data.data //FS_Com_Drawing.pushLogFromOuter()でログに記録したデータ
//action()は定義しなくても動作する。
ruler.action = function(base_log,action_log){
	//draw_data.actionはouter
	
	//draw_data.module_actionをpushLogFromModleのpush_dataに追加しておいて、それによりアクションを規定・処理する。
	var action = action_log.data.module_action;
	switch(action){
		case "move":
			
			break;
		default:
			break;
	}
	return base_data;
};


//外部ツール独自の描画を行う
//_context:描画を行うコンテキスト
//data
//data.id
//data.z_index
//data.data //fs_com_bridge.to_base.pushLearningRec()でログに記録し、その後にactionで変更を行ったデータ
ruler.drawData = function(_context,draw_data){
	var ct = _context;
	
	var line_s = draw_data.data.line_s;
	var line_e = draw_data.data.line_e;
	
	var canvas_id = FS_Com_Drawing.draw_target.nCanvasId;
	var canvas = $('#' + canvas_id).get(0);
	var ct = canvas.getContext('2d');
	
    var size = draw_data.data.size;
	
	ct.fillStyle = "rgba("+ruler.getRGB(draw_data.data.color)+","+draw_data.data.opacity+")";
	
	ct.beginPath();
	ct.fillRect( line_s.x, line_s.y, line_e.x - line_s.x, size );
	ct.closePath();
	
};

ruler.getRGB = function(_color) {

	switch (_color) {
		case "red":		return "255, 40, 0";     //#ff2800
		case "yellow":	return "255, 245, 0";    //#fff500
		case "green":	return "53, 161, 107";   //#35a16b
		case "blue":	return "0, 65, 255";     //#0041ff
		case "black":	return "0, 0, 0";        //#000000
		case "white":	return "255, 255, 255";  //"ffffff
		default:  break;
	}
    if(_color.indexOf("#")<0){
        return "0, 0, 0";
    }
    var r = "00";
    var g = "00";
    var b = "00";
    var code = "";
    code = _color.replace("#","");
    r = code.substring(0,2);
    g = code.substring(2,4);
    b = code.substring(4,6);

    r = parseInt(r,16);
    g = parseInt(g,16);
    b = parseInt(b,16);
    
	return r+","+g+","+b;
};




// ツールで描いたものを再描画時にコールされるファンクション
//ログに追加したactionをruler.actionで処理し終わったものを描画する
//Redo,Undo時や新しい描画の度に呼び出される
ruler.reDrawTool = function(draw_data){
	
};

// 接触しているかの判定時（消しゴム等）にコールされるファンクション
ruler.checkHitTool = function(draw_data){
	//console.log("ruler.checkHitTool");
	
	return true;
	//return false;
};

// ツール終了時にコールされるファンクション
ruler.finishTool = function(){
    $("#rulerCanvasDiv").remove();
    ruler.showFlag = false;
};
