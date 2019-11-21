
window.onload = function() {
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  var playPauseBtn = document.getElementById("playPause");
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var renderFrame = null;
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  var myReq;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();

    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
    // console.log(src, analyser)

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount; // 128

    var dataArray = new Uint8Array(bufferLength);
    // console.log(bufferLength, dataArray)

    var cvW = canvas.width;
    var cvH = canvas.height;

    var barWidth = (cvW / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    renderFrame = () => {
      // console.log('renderFrame');
      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cvW, cvH);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        
        var r = barHeight + (25 * (i/bufferLength));
        var g = 250 * (i/bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, cvH - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      myReq = requestAnimationFrame(renderFrame);
    }
  };

  playPauseBtn.addEventListener('click', () => {
    if(audio.paused) {
      audio.play();
      myReq = requestAnimationFrame(renderFrame);
    } else {
      audio.pause();
      cancelAnimationFrame(myReq);
    }
  })
};