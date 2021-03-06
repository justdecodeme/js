var userApp_sidebar_config = {
    imgBaseL:"",
    imgBaseR:"",
    barTabL:[],
    barTabR:[],
    bars: [
        {
        barName:"アプリ",
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
            {id:"fflcom_secretSideBar", secret:"fflcom_shows", img:[]}
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
            {id:"fflcom_scroll",img:[]}
        ]
        },
        {
        barName:"どうぐ",
        secret:"fflcom_tools",
        items: [
            {id:"fflcom_timer",img:[]},
            {id:"fflcom_mekuri",img:[]},
            {id:"fflcom_blank",img:[]},
            {id:"fflcom_fusen",img:[]},
            {id:"fflcom_secretSideBar", secret:"fflcom_others", img:[]}
        ]
        },
        {
        barName:"その他",
        secret:"fflcom_others",
        items: [
            {id:"fflcom_original", tool:"fflcom_whiteboard", param:{type:0, msg:"白板を使いたい"}, img:[]},
            {id:"fflcom_original", tool:"fflcom_ruler", param:{type:1, flag:true, sx:50, sy:100, ex:150, ey:100}, img:[]},
            {id:"fflcom_original", tool:"fflcom_hogehoge", param:{type:2, flag:false, msg:"こんにちは"}, img:[]},
            {id:"fflcom_secretSideBar", secret:"fflcom_tools", img:["./icons/img_fflcom_back.png"]}
        ]
        }
    ]
};