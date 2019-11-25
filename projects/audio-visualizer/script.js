window.onload = function() {
  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("playPause");
  const seekBar = document.getElementById('seekBar');

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const cvW = canvas.width = window.innerWidth;
  const cvH = canvas.height = window.innerHeight;

  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


  // Visualization logic 
  const initVisualization = (e => {
    // Variables
    let context = new AudioContext();
    let src = context.createMediaElementSource(audio);
    let analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 256;

    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    let barWidth = (cvW / bufferLength) * 2.5;
    let barHeight;
    let myReq;


    // Functions
    var renderFrame = e => {
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
  
      initVisualization.myReq = requestAnimationFrame(renderFrame);
    }

    return {
      renderFrame,
      myReq
    };    
  })();

  // Player logic
  const initPlayer = (e => {
    const volEl = document.getElementById('volEl');
    const maxVol = 100;
    const minVol = 0;
    const stepVol = .05;

    volEl.innerHTML = parseInt(audio.volume * maxVol);

    // Functions
    const handleKeyPress = keyPressed => {
      if(keyPressed.code == 'Space') {
        keyPressed.preventDefault();
        togglePlay();
      }
    }
  
    const togglePlay = e => {
      if(audio.paused) {
        audio.play();
        initVisualization.myReq = requestAnimationFrame(initVisualization.renderFrame);
      } else {
        audio.pause();
        setTimeout(() => {
          cancelAnimationFrame(initVisualization.myReq);
        }, 1000);
      }
    }

    const updateVol = e => {
      let vol = parseInt(audio.volume * maxVol);
      // normalized to extract its sign, effectively converting it to +1/-1
      const delta = Math.sign(e.deltaY);

      // increase
      if(delta == 1) {
        if(vol < maxVol) {
          vol += (stepVol * maxVol);
          if(vol > maxVol) {
            vol = maxVol;
          }
        }
      } else { // decrease
        if(vol > minVol) {
          vol -= (stepVol * maxVol);
          if(vol < minVol) {
            vol = minVol;
          }
        }
      }

      volEl.innerHTML = vol;
      audio.volume = (vol / maxVol);
      // console.log(vol, vol / maxVol)
    }

    // Events
    document.body.addEventListener('keydown', handleKeyPress, false);
    playPauseBtn.addEventListener('click', togglePlay, false);
    window.addEventListener("wheel", updateVol, false);
  })();

  // Seekbar logic
  const initSeekbar = (e => {
    // Variables
    const progressBar = document.getElementById('progressBar')
    let duration = audio.duration;
    let x = 0;
    let isMouseDown = isMouseMove = isMouseDownAndMove = isMouseMoveAndUp = false;
  
    // Functions
    const updateProgressBar = pos => {
      x = pos / cvW;
      progressBar.style.width = x * 100 + '%';
      if(!isMouseMove) {
        audio.currentTime = x * duration;   
      }
    }
    const onMouseDown = e => {
      // console.log('mousedown');
      isMouseDown = true; isMouseMove = isMouseMoveAndUp = false;

      seekBar.addEventListener('mousemove', onMouseMove, false);
      seekBar.addEventListener('mouseup', onMouseUp, false);
      seekBar.addEventListener('click', onClick, false);      
    }
    const onMouseMove = e => {
      // if mouse down and then move
      if(isMouseDown && isMouseMove) {
        // console.log('mousemove');
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
        // console.log('mouseup');
        updateProgressBar(e.offsetX)    
      }
    }
    const onClick = e => {
      // iff mouse didn't moved at all
      if(!isMouseDownAndMove) {
        // console.log('click');
        updateProgressBar(e.offsetX)
      }
      isMouseDownAndMove = false;

      // remove listners
      seekBar.removeEventListener('mousemove', onMouseMove, false);
      seekBar.removeEventListener('click', onClick, false);      
      seekBar.removeEventListener('mouseup', onMouseUp, false);
    }

    // Events
    seekBar.addEventListener('mousedown', onMouseDown, false);
  })();

  // Drag and Drop logic
  const initDragDropAPI = (e => {
    // Variables
    const dropArea = seekBar;
    const fileElem = document.getElementById("fileElem");

    // Functions
    const handleDrop = files => {
      // Files selected using button
      if(files.target) {
        console.log('files selected');
        files = files.target.files
      } else { // Files drag and dropped
        console.log('files droppped');
      }
      audio.src = URL.createObjectURL(files[0]);
      audio.load();    
    }   
    const preventDefaults = e => {
      e.preventDefault()
      e.stopPropagation()
    }
  
    const onDragEnter = e => {
      e.preventDefault()
      // console.log('dragenter')
      dropArea.classList.add('active');    

      dropArea.addEventListener('dragover', onDragOver, false);
      dropArea.addEventListener('dragleave', onDragLeave, false);
      dropArea.addEventListener('drop', onDrop, false);      
    }
    const onDragOver = e => {
      e.preventDefault()
      // console.log('dragover')
    }
    const onDragLeave = e => {
      e.preventDefault()
      // console.log('dragleave')
      dropArea.classList.remove('active');
    }
    const onDrop = e => {
      e.preventDefault()
      // console.log('drop')
      dropArea.classList.remove('active');
  
      let dt = e.dataTransfer;
      let files = dt.files;
  
      handleDrop(files);

      dropArea.removeEventListener('dragover', onDragOver, false);
      dropArea.removeEventListener('dragleave', onDragLeave, false);
      dropArea.removeEventListener('drop', onDrop, false);       
    }
  
    // Events
    // ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    //   dropArea.addEventListener(eventName, preventDefaults, false)
    // })
  
    dropArea.addEventListener('dragenter', onDragEnter, false);
    fileElem.addEventListener('change', handleDrop, false);
  })();
};