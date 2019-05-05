var cnt = 1;
function answer(){
    cnt = cnt + 1;
    if(cnt > 5){
       cnt = 1;
    }
    var src = "./img/img_s0" + cnt + ".png";
    $("#page").attr("src", src);
}
