var fs_com_sidebar_config = {
    imgBaseL:"",
    imgBaseR:"",
    barTabL:[],
    barTabR:[],
    bars: [
        {
        barName:"メニュー",
        items: [
            {id:"fflcom_close",img:[]},
            {id:"fflcom_bookshelf",img:[]},
            {id:"fflcom_index",img:[]},
            {id:"fflcom_finger",img:[]},
            {id:"fflcom_pen",img:[
                    [ "/img/fsisb_pen_red_n.png", "/img/fsisb_pen_red_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [ "/img/fsisb_pen_yellow_n.png", "/img/fsisb_pen_yellow_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [ "/img/fsisb_pen_green_n.png", "/img/fsisb_pen_green_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [ "/img/fsisb_pen_blue_n.png", "/img/fsisb_pen_blue_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [ "/img/fsisb_pen_black_n.png", "/img/fsisb_pen_black_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [ "/img/fsisb_pen_white_n.png", "/img/fsisb_pen_white_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [],
                    [],
                    [],
                    [],
                    [ "/img/fsisb_marker_red_n.png", "/img/fsisb_marker_red_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [ "/img/fsisb_marker_yellow_n.png", "/img/fsisb_marker_yellow_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [ "/img/fsisb_marker_green_n.png", "/img/fsisb_marker_green_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [ "/img/fsisb_marker_blue_n.png", "/img/fsisb_marker_blue_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [ "/img/fsisb_marker_black_n.png", "/img/fsisb_marker_black_a.png", "/img/fsisb_pen_marker_d.png" ],
                    [ "/img/fsisb_marker_white_n.png", "/img/fsisb_marker_white_a.png", "/img/fsisb_pen_marker_d.png" ]
                ]
            },
            {id:"fflcom_figure",img:[]},
            {id:"fflcom_secretSideBar", secret:"fflcom_erases", img:[]},
            {id:"fflcom_secretSideBar", secret:"fflcom_tools", img:[]},
            {id:"fflcom_secretSideBar", secret:"fflcom_saveload", img:[]},
            {id:"fflcom_secretSideBar", secret:"fflcom_shows", img:[]},
            {id:"fflcom_original", tool:"gkt_mathtools", mode: 0, param: {}, img:[
                "./icons/gkt_mathtools_n.png",
                "./icons/gkt_mathtools_a.png",
                "./icons/gkt_mathtools_d.png"
            ]}
        ]
        },
        {
        barName:"きろく",
        secret:"fflcom_saveload",
        items: [
            {id:"fflcom_save",img:[]},
            {id:"fflcom_load",img:[]},
            {id:"fflcom_saveImage",img:[]},
            {id:"fflcom_print",img:[]},
        ]
        },
        {
        barName:"けす",
        secret:"fflcom_erases",
        items: [
            {id:"fflcom_eraser",img:[]},
            {id:"fflcom_clear",img:[]},
            {id:"fflcom_undo",img:[]},
            {id:"fflcom_redo",img:[]}
        ]
        },
        {
        barName:"表示設定",
        secret:"fflcom_shows",
        items: [
            {id:"fflcom_fullscreen",img:[]},
            {id:"fflcom_clickable",img:[]},
            {id:"fflcom_spread",img:[]},
            {id:"fflcom_scroll",img:[]},
            {id:"fflcom_simplePen",img:[]},
            {id:"fflcom_zoom",img:[]},
            {id:"fflcom_hidden",img:[]}
        ]
        },
        {
        barName:"どうぐ",
        secret:"fflcom_tools",
        items: [
            {id:"fflcom_timer",img:[]},
            {id:"fflcom_mekuri",img:[]},
            {id:"fflcom_reading",img:[]},
            {id:"fflcom_fusen",img:[]},
            {id:"fflcom_pointer",img:[]},
            {id:"fflcom_secretSideBar", secret:"fflcom_others", img:[]}
        ]
        },
        {
        barName:"その他",
        secret:"fflcom_others",
        items: [
            {id:"fflcom_link", linkId:"whiteboard", link:{bookId:"", chapter:2, type:3, pageIdx:1, appId:"appTest_1"}, img:["./icons/img_fflcom_whiteboard_n.png"]},
            {id:"fflcom_link", linkId:"whiteboard2", link:{bookId:"FSI_KOKUGO_3_1", chapter:111, type:5, pageIdx:1, appId:""}, img:["./icons/img_fflcom_whiteboard2_n.png"]},
            {id:"fflcom_original", tool:"ruler", mode: 0, param:{}, img:["../../modules/ruler/img/icon_ruler_n.png", "../../modules/ruler/img/icon_ruler_a.png","../../modules/ruler/img/icon_ruler_d.png"]},
            {id:"fflcom_original", tool:"ohajiki", mode: 1, param:{}, img:["../../modules/ohajiki/img/icon_ohajiki_n.png", "../../modules/ohajiki/img/icon_ohajiki_a.png","../../modules/ohajiki/img/icon_ohajiki_d.png"]},
            {id:"fflcom_secretSideBar", secret:"fflcom_tools", img:["./icons/img_fflcom_back.png"]}
        ]
        }
    ]
};
