<?php
	session_start();
	if (empty($_SESSION['uid']) || empty($_SESSION['role'])) {
		$url = '../../login.php?redirect=./modules/combase/archive.php';
		header("Location: {$url}");
		exit;
	} else {
		session_on();
	}

	function session_on() {
		$tmp = $_SESSION;
		$_SESSION = array();
		session_destroy();
		session_id(md5(uniqid(rand(), 1)));
		session_start();
		$_SESSION = $tmp;
	}
?>
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
       	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0">
        <title>FFLearning</title>
		<meta name="description" content="Framework for Future Learning by FUJISOFT Inc.">
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<link rel="stylesheet" href="../../modules/combase/css/normalize.css">
		<link rel="stylesheet" href="../../modules/combase/css/fs_combase.css">
		<link rel="stylesheet" href="../../modules/combase/css/print.css">
		<link rel="stylesheet" href="../../modules/combase/css/turn.css">
	    <link rel="stylesheet" href="../../modules/combase/css/jquery-ui.css">
		<link rel="stylesheet" href="../../modules/combase/css/video-js.css">
		<link rel="stylesheet" href="../../modules/userColor/css/userColor.css">
	</head>
	<body class="refuseusel">
		<div id="content">
           <div id="wait_message"><img class="loading" src="../../modules/combase/img/loading.gif"/></div>
           <div id="frontPage">
               <div id="contFrontPage"></div>
           </div>
            <div id="leftFrame" class="fssb_sideFrame">
                <div id="leftMainBtns" class="fssb_mainBtns">
                   <div id="leftBtnsBase">
                    <div id="leftZoom" class="fssb_palette_zoom">
                        <div class="fssb_palette_zoom_drag_bt">
                            <img src="../../modules/combase/img/bt_zoom_drag_off.png" class="btnImg fssb_palette_zoom_drag_btimg">
                        </div>
                        <div class="fssb_palette_zoom_tools">
                        <div class="fssb_palette_zoom_in_bt">
                            <img src="../../modules/combase/img/fsisb_zoom_in.png" class="fssb_palette_zoom_btimg">
                        </div>
                        <div class="fssb_palette_zoom_guidebar">
                        </div>
                        <div class="fssb_palette_zoom_touchbar">
                        </div>
                        <div class="fssb_palette_zoom_bt">
                            <img src="../../modules/combase/img/btdrg.png" class="fssb_palette_zoom_slider_btimg">
                        </div>
                        <div class="fssb_palette_zoom_out_bt">
                            <img src="../../modules/combase/img/fsisb_zoom_out.png" class="fssb_palette_zoom_btimg">
                        </div>
                        </div>
                    </div>
                    <div id="leftPager" class="fssb_palette_pager">
                        <div class="fssb_palette_pager_next_bt">
                            <img src="" class="btChPageNext" />
                        </div>
                        <div id="pagetext_left" class="fssb_palette_pager_pagetext">
                            <div class="pagetext_tablecell"></div>
                        </div>
                        <div class="fssb_palette_pager_back_bt">
                            <img src="" class="btChPageBack" />
                        </div>
                    </div>
                    <div id="leftSimplePen" class="fssb_palette_simplePen">
                       <div id="leftPenBack" class="btimgSimplePenBack">
                       </div>
                       <div class="btSimplePen btimgSimplePenBlack">
                        <img src="../../modules/sidebar/img/fsisb_pen_black_n.png" class="btnImg"/>
                       </div>
                       <div class="btSimplePen btimgSimplePenRed">
                        <img src="../../modules/sidebar/img/fsisb_pen_red_n.png" class="btnImg"/>
                       </div>
                       <div class="btSimplePen btimgSimpleEraser">
                        <img src="../../modules/sidebar/img/fsisb_eraser_n.png" class="btnImg"/>
                       </div>
                    </div>
                    </div>
                   <div id="leftTabBase"></div>
                </div>
            </div>
            <div id="centerFrame">
                <div id="contBase">
                    <div id="contViewer">
                        <div id="contStage">
                            <div id="contScroll">
                                <div id="contScrlEx"></div>
                                <div id="contCanvasFusen">
                                    <canvas id="contFusenCanvas"></canvas>
                                </div>
                                <div id="contCanvas">
                                    <canvas id="contPageCanvas"></canvas>
                                    <canvas id="contPageCanvas_wk"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="video_wrapper">
                <video id="video" controlslist="nodownload" src="" alt="video error">
                </video>
            </div>
<!--            <div id="video_wrapper">
                <div id="video_player">
                    <div id="video_top">
                        <div class="video_button" id="close_btn"><img src="../../modules/combase/img/video_close.png" /></div>
                    </div>
                    <div id="video_div">
                        <video id="video" controlslist="nodownload" src="" alt="video error"></video>
                        <div id="video_div_setting">
                            <div class="video_setting_obj video_setting_radio video_button_pitch_low" id="video_setting_radio_low" value=0.5><img src="../../modules/combase/img/radio_off.png" /></div>
                            <div class="video_setting_obj video_setting_blank_label video_button_pitch_low" id="video_setting_blank_label_low"></div>
                            <div class="video_setting_obj video_setting_radio video_button_pitch_mid" id="video_setting_radio_mid" value=1.0><img src="../../modules/combase/img/radio_on.png" /></div>
                            <div class="video_setting_obj video_setting_blank_label video_button_pitch_mid" id="video_setting_blank_label_mid"></div>
                            <div class="video_setting_obj video_setting_radio video_button_pitch_high" id="video_setting_radio_high" value=1.5><img src="../../modules/combase/img/radio_off.png" /></div>
                            <div class="video_setting_obj video_setting_blank_label video_button_pitch_high" id="video_setting_blank_label_high"></div>
                        </div>
                    </div>
                    <div id="video_bottom">
                        <div id="video_close_btn_l" class="video_button video_close"><img src="../../modules/combase/img/video_close.png" /></div>
                        <div id="video_button_play" class="video_button"><img src="../../modules/combase/img/video_play.png" /></div>
                        <div id="video_div_time" class="video_bottom_conponent">
                            <span id="video_text_time"></span>
                        </div>
                        <div id="video_div_seek_bar" class="video_bottom_conponent">
                            <div id="video_seek_bar"></div>
                        </div>
                        <div id="video_button_sound" class="video_button"><img src="../../modules/combase/img/video_sound_on.png" /></div>
                        <div id="video_div_volume_bar" class="video_bottom_conponent">
                            <div id="video_volume_bar"></div>
                        </div>
                        <div id="video_fullscreen_btn" class="video_button"><img src="../../modules/combase/img/video_fullscreen_start.png" /></div>
                        <div id="video_button_setting" class="video_button"><img src="../../modules/combase/img/video_setting.png" /></div>
                        <div id="video_close_btn_r" class="video_button video_close"><img src="../../modules/combase/img/video_close.png" /></div>
                    </div>
                </div>
            </div>
-->
            <div id="reflowPane">
            </div>
            <!-- アプリペイン -->
            <div id="userAppPane"></div>
            <!--<iframe id="userAppPane"></iframe>-->
<!--
            <div id="appCanvas">
                <canvas id="appPageCanvas"></canvas>
                <canvas id="appPageCanvas_wk"></canvas>
            </div>
-->
            <div id="rightFrame" class="fssb_sideFrame">
                <div id="rightMainBtns" class="fssb_mainBtns">
                   <div id="rightBtnsBase">
                    <div id="rightZoom" class="fssb_palette_zoom">
                        <div class="fssb_palette_zoom_drag_bt">
                            <img src="../../modules/combase/img/bt_zoom_drag_off.png" class="btnImg fssb_palette_zoom_drag_btimg">
                        </div>
                        <div class="fssb_palette_zoom_tools">
                        <div class="fssb_palette_zoom_in_bt">
                            <img src="../../modules/combase/img/fsisb_zoom_in.png" class="fssb_palette_zoom_btimg">
                        </div>
                        <div class="fssb_palette_zoom_guidebar">
                        </div>
                        <div class="fssb_palette_zoom_touchbar">
                        </div>
                        <div class="fssb_palette_zoom_bt">
                            <img src="../../modules/combase/img/btdrg.png" class="fssb_palette_zoom_slider_btimg">
                        </div>
                        <div class="fssb_palette_zoom_out_bt">
                            <img src="../../modules/combase/img/fsisb_zoom_out.png" class="fssb_palette_zoom_btimg">
                        </div>
                        </div>
                    </div>
                    <div id="rightPager" class="fssb_palette_pager">
                        <div class="fssb_palette_pager_next_bt">
                            <img src="" class="btChPageNext" />
                        </div>
                        <div id="pagetext_right" class="fssb_palette_pager_pagetext">
                            <div class="pagetext_tablecell"></div>
                        </div>
                        <div class="fssb_palette_pager_back_bt">
                            <img src="" class="btChPageBack" />
                        </div>
                    </div>
                    <div id="rightSimplePen" class="fssb_palette_simplePen">
                       <div id="rightPenBack" class="btimgSimplePenBack">
                       </div>
                       <div class="btimgSimplePenBlack">
                        <img src="../../modules/sidebar/img/fsisb_pen_black_n.png" class="btnImg" />
                       </div>
                       <div class="btimgSimplePenRed">
                        <img src="../../modules/sidebar/img/fsisb_pen_red_n.png" class="btnImg"/>
                       </div>
                       <div class="btimgSimpleEraser">
                        <img src="../../modules/sidebar/img/fsisb_eraser_n.png" class="btnImg"/>
                       </div>
                    </div>
                    </div>
                   <div id="rightTabBase"></div>
                </div>
            </div>
            <div id="bottomFrame">
                <div id="bottomLeftPane">
                    <div id="sysMenu">
                        <img id="btSysMenu" src="../../modules/combase/img/bt_setting_menu.png" />
                    </div>
                    <div id="btBottomScrlLeft">
                    </div>
                    <div id="btBottomScrlRight">
                    </div>
                    <div id="bottomLeftTabPane">
                        <div id="bottomLeftScrollPane">
                            <div id="bottomLeftTabCont0" class="bottomTabCont">
                                <div class="btmtabiconD">
                                    <img class="btmtabicon" src="../../modules/combase/img/tab_mpage.png" />
                                </div>
                                <span>紙面</span>
                            </div>
                            <div id="bottomLeftTabCont1" class="bottomTabCont">
                                <div class="btmtabiconD">
                                    <img class="btmtabicon" src="../../modules/combase/img/tab_rfpage.png" />
                                </div>
                                <span>学習者支援</span>
                            </div>
                            <div id="bottomLeftTabCont2" class="bottomTabCont">
                                <div class="btmtabiconD">
                                    <img class="btmtabicon" src="../../modules/combase/img/tab_app.png" />
                                </div>
                                <span>リソース</span>
                            </div>
                            <div id="bottomLeftTabSubPageCont"></div>
                            <div id="bottomLeftTabAppCont"></div>
                        </div>
                    </div>
                </div>
                <div id="bottomRightPane">
                    <div id="bottomRightTabPane">
                        <div id="bottomRightScrollPane">
                            <div id="bottomRightTabCont0" class="bottomTabCont">
                                <img class="btmtabicon" src="../../modules/combase/img/tab_mpage.png" />
                                <span id="btmRightTabText0">紙面</span>
                            </div>
                            <div id="bottomRightTabCont1" class="bottomTabCont">
                                <img class="btmtabicon" src="../../modules/combase/img/tab_rfpage.png" />
                                <span id="btmRightTabText1">学習者支援</span>
                            </div>
                            <div id="bottomRightTabCont2" class="bottomTabCont">
                                <img class="btmtabicon" src="../../modules/combase/img/tab_app.png" />
                                <span id="btmRightTabText2">リソース</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="audio_wrapper">
                    <div id="audio_player">
                        <div id="audio_div_setting">
                            <div class="audio_setting_obj audio_setting_radio audio_button_pitch_low" id="audio_setting_radio_low" value=0.5><img src="../../modules/combase/img/radio_off.png" /></div>
                            <div class="audio_setting_obj audio_setting_blank_label audio_button_pitch_low" id="audio_setting_blank_label_low"></div>
                            <div class="audio_setting_obj audio_setting_radio audio_button_pitch_mid" id="audio_setting_radio_mid" value=1.0><img src="../../modules/combase/img/radio_on.png" /></div>
                            <div class="audio_setting_obj audio_setting_blank_label audio_button_pitch_mid" id="audio_setting_blank_label_mid"></div>
                            <div class="audio_setting_obj audio_setting_radio audio_button_pitch_high" id="audio_setting_radio_high" value=2.0><img src="../../modules/combase/img/radio_off.png" /></div>
                            <div class="audio_setting_obj audio_setting_blank_label audio_button_pitch_high" id="audio_setting_blank_label_high"></div>
                        </div>
                        <audio id="audio"></audio>
                        <div class="audio_conponent" id="audio_play"><img src="../../modules/combase/img/audio_play.png" /></div>
                        <div id="audio_div_time" class="audio_conponent">
                            <span id="audio_text_time"></span>
                        </div>
                        <div class="audio_conponent" id="audio_prev"><img src="../../modules/combase/img/audio_prev.png" /></div>
                        <div class="audio_conponent" id="audio_next"><img src="../../modules/combase/img/audio_next.png" /></div>
                        <div class="audio_conponent" id="audio_button_sound"><img src="../../modules/combase/img/audio_sound_on.png" /></div>

                        <div id="audio_div_volume_bar" class="audio_conponent"><div id="audio_volume_bar"></div></div>


                        <div id="audio_button_setting" class="audio_conponent audio_button"><img src="../../modules/combase/img/audio_setting_btn.png" /></div>
                        <div id="audio_button_close" class="audio_conponent audio_button"><img src="../../modules/combase/img/audio_close.png" /></div>
                    </div>

                </div>
            </div>
		</div>
            <div id="sysMenuBase" style="background-image:url('../../modules/combase/img/sysmenu_base.png')">
                <div id="btCloseSysMenu">
                    <img class="imgCloseSysMenu" src="../../modules/combase/img/bt_closemenu.png" />
                </div>
                <div id="sysMenuCtrl01">
                    <div id="sysMenuCtrl01_n" class="sysMenuCtrl">
                        <img class="sysMenuCtrlImg" src="../../modules/combase/img/fflcom_img_nasi_a.png" />
                    </div>
                    <div id="sysMenuCtrl01_a" class="sysMenuCtrl">
                        <img class="sysMenuCtrlImg" src="../../modules/combase/img/fflcom_img_ari_n.png" />
                    </div>
                </div>
                <div id="sysMenuCtrl02">
                    <div id="sysMenuCtrl02_n" class="sysMenuCtrl">
                        <img class="sysMenuCtrlImg" src="../../modules/combase/img/fflcom_img_nasi_a.png" />
                    </div>
                    <div id="sysMenuCtrl02_a" class="sysMenuCtrl">
                        <img class="sysMenuCtrlImg" src="../../modules/combase/img/fflcom_img_ari_n.png" />
                    </div>
                </div>
                <div id="versionInfo"></div>
            </div>
            <div id="shield"></div>
	</body>
	<script>
	if( typeof require !== "undefined" ){
		window.jQuery = window.$ = require('../../modules/combase/js/jquery-3.2.1.min');
	}
	</script>
    <script src="../../modules/combase/js/jquery-3.2.1.min.js" defer="defer"></script>
    <script src="../../modules/combase/js/jquery-ui-1.12.1.js" defer="defer"></script>
    <script src="../../modules/combase/js/jquery-ui-touch-punch-0.2.3.js" defer="defer"></script>
    <script src="../../modules/combase/js/hammer.min.js" defer="defer"></script>
    <script src="../../modules/combase/js/ios-orientationchange-fix.js" defer="defer"></script>
    <script src="../../modules/combase/js/hls.min.js" defer="defer"></script>
    <script src="../../modules/combase/js/aes.js"></script>
    <script src="../../modules/combase/js/pbkdf2.js"></script>
    <script src="../../modules/bridge/js/fs_com_bridge.js" defer="defer"></script>
    <script src="../../modules/drawing/js/BSpline.js" defer="defer"></script>
    <script src="../../modules/drawing/js/fs_com_drawing.js" defer="defer"></script>
    <script src="../../modules/reflow/js/reflow.js" defer="defer"></script>
    <script src="../../modules/sidebar/js/fs_com_sidebar.js" defer="defer"></script>
    <script src="../../modules/timer/js/fs_com_timer.js" defer="defer"></script>
    <script src="../../modules/tenkey/js/fs_com_tenkey.js" defer="defer"></script>
    <script src="../../modules/dialog/js/fs_com_dialog.js" defer="defer"></script>
    <script src="../../modules/fusen/js/fs_com_fusen.js" defer="defer"></script>
    <script src="../../modules/userColor/js/fs_com_userColor.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_fontCheck.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_electron.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_blank.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_original.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_bookshelf.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_close.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_index.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_link.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_timer.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_spread.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_scroll.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_fullscreen.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_clickable.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_hidden.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_saveImage.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_print.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_mekuri.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_zoom.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_simplePen.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_fusen.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_reading.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_load.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_save.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_secretSideBar.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_speech_play.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_speech_next.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_speech_back.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_speech_reset.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_speech_auto.js" defer="defer"></script>
    <script src="../../modules/combase/js/fflcom_speech_setting.js" defer="defer"></script>
    <script src="./configs/fs_com_sidebar_config.js" defer="defer"></script>
    <script src="./configs/fs_reflow_sidebar_config.js" defer="defer"></script>
    <script src="./configs/ffl-book-config.js" defer="defer"></script>
    <script src="./configs/fflcom_chapters.js" defer="defer"></script>
    <script src="./pages/fflcom_pages.js" defer="defer"></script>
    <script src="./audios/fflcom_audios.js" defer="defer"></script>
    <script src="../../modules/combase/js/fs_combase.js" defer="defer"></script>
    <script src="../../modules/combase/js/turn.js" defer="defer"></script>
    <script src="../../modules/combase/js/video.js" defer="defer"></script>
    <script src="../../modules/combase/js/videojs-contrib-hls.js" defer="defer"></script>
    <script src="../../modules/combase/js/videojs-flash.js" defer="defer"></script>
</html>