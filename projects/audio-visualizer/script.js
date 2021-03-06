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

    let barWidth = (cvW / bufferLength) * 1;
    // let barWidth = (cvW) / 100;
    let barHeight;
    let myReq;
    let barGap = 2;
    let barExtraHeight = 200;

    // Functions
    var renderFrame = e => {
      // console.log('renderFrame');

      let x = 0;
  
      analyser.getByteFrequencyData(dataArray);

      // to clear the canvas every frame
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cvW, cvH);
  
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] + barExtraHeight;
        
        let r = barHeight + (25 * (i/bufferLength));
        let g = 250 * (i/bufferLength);
        let b = 50;
        // let y = cvH - barHeight;
        let y = (cvH - barHeight) / 2;
  
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, y, barWidth, barHeight);
  
        x += barWidth + barGap;
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
    // Variables
    const volEl = document.getElementById('volEl');
    let duration = audio.duration;
    const maxVol = 100;
    const minVol = 0;
    const stepVol = .05;
    let onPlayInterval;

    // Initialization
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
        cancelAnimationFrame(initVisualization.myReq);
        setTimeout(() => {
        }, 100);
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
    const onPlay = e => {
      // console.log('onPlay');
      
      onPlayInterval = setInterval(() => {
        let currentTime = audio.currentTime;
        let progress = currentTime / duration;
        let pos = progress * cvW + '%';
        initSeekbar.updateProgressBar(pos);
      }, 100);

      audio.addEventListener('pause', onPause, false);
    }
    const onPause = e => {
      // console.log('onPause');

      clearInterval(onPlayInterval)

      audio.removeEventListener('pause', onPause, false);
    }

    // Events
    document.body.addEventListener('keydown', handleKeyPress, false);
    playPauseBtn.addEventListener('click', togglePlay, false);
    window.addEventListener("wheel", updateVol, false);
    audio.addEventListener('play', onPlay, false);
  })();

  // Seekbar logic
  const initSeekbar = (e => {
    // Variables
    const progressBar = document.getElementById('progressBar')
    let x = 0;
    let isMouseDown = isMouseMove = isMouseDownAndMove = isMouseMoveAndUp = false;
    let isPlaying = false;
    let currentTimeEl = document.querySelector('#time .current');
    let totalTimeEl = document.querySelector('#time .total');
    let duration = audio.duration;
    let currentTime = audio.currentTime;

    let minutes = Math.floor(duration / 60);
    let seconds = Math.round(duration - minutes * 60);    
    totalTimeEl.innerHTML = minutes + ':' + seconds;

    minutes = Math.floor(currentTime / 60);
    seconds = Math.round(currentTime - minutes * 60);
    currentTimeEl.innerHTML = minutes + ':' + seconds;    
  
    // Functions
    const updateProgressBar = pos => {
      let isMouseActivity = true;
      
      if(pos[pos.length-1] == "%") {
        isMouseActivity = false;
        pos = pos.substring(0, pos.length - 1);
      }

      // console.log(pos, isMouseActivity)
      
      x = pos / cvW;
      progressBar.style.width = x * 100 + '%';
      currentTime = x * duration;

      let minutes = Math.floor(currentTime / 60);
      let seconds = Math.round(currentTime - minutes * 60);
      currentTimeEl.innerHTML = minutes + ':' + seconds;

      if(!isMouseMove && isMouseActivity) {
        audio.currentTime = currentTime;
      }
    }
    const onMouseDown = e => {
      // console.log('mousedown');
      isMouseDown = true; isMouseMove = isMouseMoveAndUp = false;
      
      if(!audio.paused) {
        isPlaying = true;
        audio.pause();
      }

      updateProgressBar(e.offsetX);

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
      // console.log('mouseup');
      
      isMouseDown = isMouseMove = false;
      // iff mouse is moved and then up
      if(isMouseMoveAndUp) {
        // updateProgressBar(e.offsetX)    
      }
    }
    const onClick = e => {
      // console.log('click');

      // iff mouse didn't moved at all
      // if(!isMouseDownAndMove) {
        updateProgressBar(e.offsetX)
        if(isPlaying) {
          isPlaying = false;
          audio.play();
        }
      // }
      isMouseDownAndMove = false;

      // remove listners
      seekBar.removeEventListener('mousemove', onMouseMove, false);
      seekBar.removeEventListener('click', onClick, false);      
      seekBar.removeEventListener('mouseup', onMouseUp, false);
    }

    // Events
    seekBar.addEventListener('mousedown', onMouseDown, false);

    return {
      updateProgressBar
    }
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