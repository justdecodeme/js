var gkt_mathtools = {};

function replace_path(text) {
    return text.replace(/\/_assets/g, '.\/..\/modules\/gkt_mathtools\/_assets');
}

function read_data (url, body){
    $.ajax({	
		type: 'GET',
        url: url,
        dataType: 'text',
        success: function(data) {
            var replaced = replace_path(data);
            // console.log(replaced);
            var mathtools_script =  document.createElement("script");
            mathtools_script.innerHTML = replaced;
            body.appendChild(mathtools_script);
        }
    });
}

// ツール初期化のためにコールされるファンクション
gkt_mathtools.initTool = () => {
    var body = document.getElementsByTagName('body')[0];
    $.ajax({	
		type: 'GET',
        url: '../../modules/gkt_mathtools/index.html',
        dataType: 'text',
        success: function(data) {
            var mathtools_css =  document.createElement("link");
            mathtools_css.setAttribute("rel", "stylesheet");
            mathtools_css.setAttribute("href", "../../modules/gkt_mathtools/_assets/css/style.min.css");
            body.appendChild(mathtools_css);

            var replaced = replace_path(data);
            // console.log(replaced);
            var $dataObj = $(replaced).filter('#cvOuter');
            $dataObj.css("display", "none");
            $dataObj.css("z-index", "2144450000");
            // console.log($dataObj);
            body.appendChild($dataObj[0]);
            //
            read_data("../../modules/gkt_mathtools/_assets/config/settings.json", body);
            read_data("../../modules/gkt_mathtools/_assets/js/script.min.js", body);
        }
    });
};



// ツール起動時にコールされるファンクション
gkt_mathtools.startTool = () => {
    alert("It's called");
    var mathtools = document.getElementById("cvOuter");
    mathtools.style.display = "block";
};

gkt_mathtools.finishTool = () =>{

};
