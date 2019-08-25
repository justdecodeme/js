var fs_reflow_sidebar_config = {
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
            {id:"fflcom_blank",img:[]},
            {id:"fflcom_blank",img:[]},
            {id:"fflcom_blank",img:[]},
            {id:"fflcom_secretSideBar", secret:"fflcom_speech", img:[]},
            {id:"fflcom_secretSideBar", secret:"fflcom_tools", img:[]},
            {id:"fflcom_secretSideBar", secret:"fflcom_shows", img:[]}
        ]
        },
        {
        barName:"表示設定",
        secret:"fflcom_shows",
        items: [
            {id:"fflcom_fullscreen",img:[]}
        ]
        },
        {
        barName:"どうぐ",
        secret:"fflcom_tools",
        items: [
            {id:"fflcom_timer",img:[]}
        ]
        },
        {
        barName:"よみあげ",
        secret:"fflcom_speech",
        items: [
            {id:"fflcom_speech_play",img:[]},
            {id:"fflcom_speech_next",img:[]},
            {id:"fflcom_speech_back",img:[]},
            {id:"fflcom_speech_reset",img:[]},
            {id:"fflcom_speech_auto",img:[]},
            {id:"fflcom_speech_setting",img:[]}
        ]
        }
    ]
};