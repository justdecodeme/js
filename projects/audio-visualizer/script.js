window.onload = function() {
  let fileElem = document.getElementById("fileElem");
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

  // functions
  const renderFrame = () => {
    // console.log('renderFrame');
    let x = 0;

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
  const handleDrop = files => {
    if(files.target) {
      console.log('files selected');
      files = files.target.files
    } else {
      console.log('files droppped');
    }
    audio.src = URL.createObjectURL(files[1]);
    audio.load();    
  }
  const handleKeyPress = keyPressed => {
    if(keyPressed.code == 'Space') {
      keyPressed.preventDefault();
      togglePlay();
    }
  }

  const togglePlay = state => {
    if(audio.paused) {
      audio.play();
      myReq = requestAnimationFrame(renderFrame);
    } else {
      audio.pause();
      setTimeout(() => {
        cancelAnimationFrame(myReq);
      }, 1000);
    }
  }

  // event handlers
  fileElem.addEventListener('change', handleDrop, false); 
  document.body.addEventListener('keydown', handleKeyPress, false);  
  playPauseBtn.addEventListener('click', togglePlay, false);  

  // Drag and Drop logic
  const dropArea = canvas;

  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
  })
  
  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  
  dropArea.addEventListener('dragenter', () => {
    // console.log('dragenter')
    dropArea.classList.add('active');
  }, false);
  dropArea.addEventListener('dragleave', () => {
    // console.log('dragleave')
    dropArea.classList.remove('active');
  }, false);
  dropArea.addEventListener('dragover', () => {
    // console.log('dragover')
  }, false);
  dropArea.addEventListener('drop', (e) => {
    // console.log('drop')
    dropArea.classList.remove('active');

    let dt = e.dataTransfer;
    let files = dt.files;

    handleDrop(files);
  }, false);

  // 
  let dragArea = (e) => {
    const seekBar = canvas;
    let x = 0;
    let isMouseDown = isMouseMove = isMouseDownAndMove = false;
  
    seekBar.addEventListener('mousedown', (e) => {
      // console.log('mousedown');
      isMouseDown = true; isMouseMove = false;
  
      x = Math.round(e.offsetX * 100 / cvW);
      // console.log(x)
    }, false);
    seekBar.addEventListener('mousemove', (e) => {
      if(isMouseDown && isMouseMove) {
        console.log('mousemove');
        isMouseDownAndMove = true;

        x = Math.round(e.offsetX * 100 / cvW);
        // console.log(x)
        }
      isMouseMove = true;
    }, false);
    seekBar.addEventListener('mouseup', () => {
      // console.log('mouseup');
      isMouseDown = isMouseMove = false;
    }, false);
    seekBar.addEventListener('click', () => {
      // run iff mouse didn't moved
      if(!isMouseDownAndMove) {
        console.log('click');
      }
      isMouseDownAndMove = false;
    }, false);
  };
  dragArea();
};