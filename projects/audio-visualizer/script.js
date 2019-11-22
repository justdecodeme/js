window.onload = function() {
  let file = document.getElementById("thefile");
  let audio = document.getElementById("audio");
  let playPauseBtn = document.getElementById("playPause");

  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  let myReq;

  let context = new AudioContext();
  let src = context.createMediaElementSource(audio);
  let analyser = context.createAnalyser();
  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 256;
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);

  let cvW = canvas.width;
  let cvH = canvas.height;
  let barWidth = (cvW / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  let renderFrame = () => {
    // console.log('renderFrame');
    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cvW, cvH);

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      
      let r = barHeight + (25 * (i/bufferLength));
      let g = 250 * (i/bufferLength);
      let b = 50;

      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, cvH - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }

    myReq = requestAnimationFrame(renderFrame);
  }

  playPauseBtn.addEventListener('click', () => {
    if(audio.paused) {
      audio.play();
      myReq = requestAnimationFrame(renderFrame);
    } else {
      audio.pause();
      setTimeout(() => {
        cancelAnimationFrame(myReq);
      }, 1000);
    }
  })

  file.addEventListener('change', function() {
    let files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
  });  

};