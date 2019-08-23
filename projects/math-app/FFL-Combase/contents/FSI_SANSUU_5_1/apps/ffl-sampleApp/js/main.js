/*
    file name:  main.js
    author:     FSI Yudai ISHII
*/

var CONTENT_W = 1200;
var CONTENT_H = 675;

var old_X, old_Y, new_X, new_Y;

var toolInfo = {
    tool: 0,
    color: -1,
    width: -1,
    opacity: -1
};

var TOOL_FINGER = 0x0;
var TOOL_PEN = 0x1;
var TOOL_MARKER = 0x2;
var TOOL_ERASER = 0x4;

var bDraw = false;
var cEle, cCtx;
var locusLog = [];
var locusCnt = 0;

cEle = document.getElementById("Mycanvas");
cCtx = cEle.getContext('2d');

cCtx.lineJoin = 'round';
cCtx.lineCap = 'round';

(function(global, $) {
	"use strict";

	var init = {
        ctrls: function() {
            fsi_adjustStageSize(CONTENT_W, CONTENT_H);
			$("#Mycanvas").attr("width", $("#Canvas").width());
			$("#Mycanvas").attr("height", $("#Canvas").height());
        },
		handler: function() {
            $(window).resize(function() {
	           fsi_adjustStageSize(CONTENT_W, CONTENT_H);
				$("#Mycanvas").attr("width", $("#Canvas").width());
				$("#Mycanvas").attr("height", $("#Canvas").height());
            });
            
            $(window).on('message', function(_evt) {          // 親フレームからのツールバー選択状態情報の受信
                var arParam = _evt.originalEvent.data.split("[,]");
                var msg = "";
                if (arParam[0] === "FFLCOM_CHANGE_TOOL"){
                    msg += "ツール変更ボタンが押されました。"  + "\r\n";
                    for(var p=1;p<arParam.length;p++){
                        if(typeof arParam[p] !== "undefined"){
                            msg += arParam[p] + "\r\n";
                        }
                    }
                    $("#txtTestText").val(msg);
                    setCurrentToolInfo(arParam[1], arParam[2], arParam[3], arParam[4]);
                }else if (arParam[0] === "FFLCOM_CLEAR"){
                    $("#txtTestText").val("全消去ボタンが押されました。");
                    canvasClear();
                }else if (arParam[0] === "FFLCOM_SET_MODE_FINGER"){
                    $("#txtTestText").val("タッチボタンが押されました。");
                    setModeFinger();
                }else if (arParam[0] === "FFLCOM_ORIGINAL"){
                    msg += "オリジナルボタンが押されました。"  + "\r\n";
                    for(var p=1;p<arParam.length;p++){
                        if(typeof arParam[p] !== "undefined"){
                            msg += arParam[p] + "\r\n";
                        }
                    }
                    $("#txtTestText").val(msg);
                }else if (arParam[0] === "FFLCOM_UNDO"){
                    $("#txtTestText").val("アンドゥボタンが押されました。");
                }else if (arParam[0] === "FFLCOM_REDO"){
                    $("#txtTestText").val("リドゥボタンが押されました。");
                }else if (arParam[0] === "FFLCOM_MEKURI"){
                    $("#txtTestText").val("めくりボタンが押されました。" + "\r\n" + arParam[1]);
                }
            });
            
            $("#Mycanvas").on({
            'mousedown touchstart pointerdown':function(_evt) {
                if (toolInfo.tool) {
                    bDraw = true;
                }
				//タッチ操作用
				var isTouch = ('ontouchstart' in window);
				if (isTouch == true && event.changedTouches == undefined)
				   isTouch = false;
				if (isTouch) {
				   if (event.changedTouches.length > 1)
					  return;
				}
                var posP = {
                    x: isTouch ? event.changedTouches[0].pageX : _evt.clientX,
                    y: isTouch ? event.changedTouches[0].pageY : _evt.clientY
                };
				var pos = cnvPosLog2Phys(posP.x - $("#stage_1").offset().left, posP.y - $("#stage_1").offset().top);
				old_X = pos.x;
				old_Y = pos.y;
                
                
				
            },'mouseup mouseout mouseleave touchend touchcancel pointerup':function(_evt) {
                bDraw = false;
                locusCnt++;

            },'mousemove touchmove pointermove':function(_evt) {
                if (toolInfo.tool && bDraw == true) {
                    //タッチ操作用
                    var isTouch = ('ontouchstart' in window);
                    if (isTouch == true && event.changedTouches == undefined)
                       isTouch = false;
                    if (isTouch) {
                       if (event.changedTouches.length > 1)
                          return;
                    }
                    var posP = {
                        x: isTouch ? event.changedTouches[0].pageX : _evt.clientX,
                        y: isTouch ? event.changedTouches[0].pageY : _evt.clientY
                    };
					var pos = cnvPosLog2Phys(posP.x - $("#stage_1").offset().left, posP.y - $("#stage_1").offset().top);
					new_X = pos.x;
					new_Y = pos.y;
                    
                    if(toolInfo.tool == TOOL_MARKER){
                        if(Math.abs(pos.x - old_X) >= Math.abs(pos.y - old_Y)){
                            new_X = pos.x;
                            new_Y = old_Y;
                        }else{
                            new_X = old_X;
                            new_Y = pos.y;
                        }
                    }
                    
                    
                    if(!locusLog[locusCnt]){
                        locusLog[locusCnt] = [];
                    }

                    locusLog[locusCnt].push({sx:old_X, sy:old_Y, ex:new_X, ey:new_Y, color:toolInfo.color, opacity:toolInfo.opacity, width:toolInfo.width});

	                var canvas = $('#Mycanvas').get(0);
                    cCtx.clearRect(0, 0, canvas.width, canvas.height);

                    locusLog.forEach(function(locus){
                        cCtx.beginPath();
                        locus.forEach(function(l){
                            cCtx.moveTo(l.sx, l.sy);
                            cCtx.lineTo(l.ex, l.ey);
                            cCtx.strokeStyle = l.color;
                            cCtx.globalAlpha = l.opacity;
                            cCtx.lineWidth = l.width;
                        });
                        cCtx.lineJoin = "round";
                        cCtx.lineCap = "round";
                        cCtx.closePath();
                        cCtx.stroke();
                    });

                    if(toolInfo.tool != TOOL_MARKER){
                        old_X = new_X;
                        old_Y = new_Y;
                    }
                }
				
            }
            });
        }
	};

	$(function() {
        init.ctrls();
		init.handler();
	});
}(this, jQuery));

var canvasClear = function(){
	var canvas = $('#Mycanvas').get(0);
	var cc_l = canvas.getContext('2d');
	cc_l.beginPath();
    cc_l.clearRect(0, 0, canvas.width, canvas.height);
    cc_l.closePath();
    locusLog = [];
    locusCnt = 0;
    
};

var setModeFinger = function(){
    toolInfo.tool = TOOL_FINGER;
    $("#Mycanvas").css("pointer-events","none");
};


var setCurrentToolInfo = function(_tool, _color, _width, _opacity) {
    if (_tool === "FFLCOM_TOOL_PEN") {
        toolInfo.tool = TOOL_PEN;
    }else if ( _tool === "FFLCOM_TOOL_MARKER"){
        toolInfo.tool = TOOL_MARKER;
    }else{
        toolInfo.tool = TOOL_FINGER;
    }
    toolInfo.color = _color;
    toolInfo.width = _width;
    toolInfo.opacity = _opacity;
    $("#Mycanvas").css("pointer-events","auto");
};

var cnvPosLog2Phys = function(_x, _y) {
    var w = ($("#stage_1").width() * $("#stage_0").height()) / $("#stage_1").height();
    return {
        x: (_x * CONTENT_W) / w,
        y: (_y * CONTENT_H) / $("#stage_0").height()
    };
};