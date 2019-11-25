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
  let initDrag = (e) => {
    const seekBar = document.getElementById('seekBar');
    const progressBar = document.getElementById('progressBar')
    let duration = audio.duration;
    let x = 0;
    let isMouseDown = isMouseMove = isMouseDownAndMove = isMouseMoveAndUp = false;
  
    const updateProgressBar = pos => {
      x = pos / cvW;
      progressBar.style.width = x * 100 + '%';
      if(!isMouseMove) {
        audio.currentTime = x * duration;   
      }
    }
    const onMouseDown = e => {
      console.log('mousedown');
      isMouseDown = true; isMouseMove = isMouseMoveAndUp = false;

      seekBar.addEventListener('mousemove', onMouseMove, false);
      seekBar.addEventListener('mouseup', onMouseUp, false);
      seekBar.addEventListener('click', onClick, false);      
    }
    const onMouseMove = e => {
      // if mouse down and then move
      if(isMouseDown && isMouseMove) {
        console.log('mousemove');
        isMouseDownAndMove = true;
        isMouseMoveAndUp = true;

        updateProgressBar(e.offsetX);
      }
      isMouseMove = true;
    }
    const onMouseUp = e => {
      isMouseDown = isMouseMove = false;
      // iff mouse is moved and then up
      if(isMouseMoveAndUp) {
        console.log('mouseup');
        updateProgressBar(e.offsetX)    
      }
    }
    const onClick = e => {
      // iff mouse didn't moved at all
      if(!isMouseDownAndMove) {
        console.log('click');
        updateProgressBar(e.offsetX)
      }
      isMouseDownAndMove = false;

      // remove listners
      seekBar.removeEventListener('mousemove', onMouseMove, false);
      seekBar.removeEventListener('click', onClick, false);      
      seekBar.removeEventListener('mouseup', onMouseUp, false);
    }

    seekBar.addEventListener('mousedown', onMouseDown, false);
  };
  initDrag();
};