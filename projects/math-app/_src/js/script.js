/*******************************/
//     HTML elements
/*******************************/
var cv = document.getElementById('cv');
var cvOuter = document.getElementById('cvOuter');


/*******************************/
//     functions - helping
/*******************************/
// returns object length
Object.size = function (obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function whichTransitionEvent() {
  var t,
    el = document.createElement("fakeelement");

  var transitions = {
    "transition": "transitionend",
    "OTransition": "oTransitionEnd",
    "MozTransition": "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

// returns 'left' and 'right' position of given element
function getElPosition(el) {
  var pos = { left: el.getBoundingClientRect().left, right: el.getBoundingClientRect().top };
  return pos;
}

// returns the mouse position w.r.t given element
function getMousePosition(e, el) {
  var pos = getElPosition(el);
  var point = { x: 0, y: 0 };
  point.x = parseFloat((((e.type == 'touchstart' || e.type == 'touchmove') ? e.touches[0].clientX : e.clientX) - pos.left).toFixed(2));
  point.y = parseFloat((((e.type == 'touchstart' || e.type == 'touchmove') ? e.touches[0].clientY : e.clientY) - pos.right).toFixed(2));
  return point;
}


/*******************************/
//     functions - specific
/*******************************/
// init tools satellite UI and and tool events
var initTools = (function () {
  // console.log('init')
  var toolsUniverse = document.getElementById('toolsUniverse');
  var toolsPlanets = toolsUniverse.querySelectorAll('.tools-planet');
  var toolsPlanetSets = document.getElementById('toolsPlanetSets');
  var toolsPlanetPens = document.getElementById('toolsPlanetPens');
  var toolsUniverseWidth = toolsUniverse.offsetWidth;

  var minimizeToggleBtn = document.getElementById('minimizeToggleBtn');
  var toolsPlanetSetsBtn = document.getElementById('toolsPlanetSetsBtn');
  var toolsPlanetPensBtn = document.getElementById('toolsPlanetPensBtn');

  var currToolType = currSetType = null;
  
  // draw satellite circles
  toolsPlanets.forEach(function (toolsPlanet) {
    var toolsSatellites = toolsPlanet.querySelectorAll('#' + toolsPlanet.id + '>.tools-satellite.primary');
    var toolsSatellitesWidth = toolsPlanet.querySelector('.tools-satellite:first-child').offsetWidth;
    var toolsPlanetWidth = toolsPlanet.offsetWidth;
    var totaltoolsSatellites = toolsSatellites.length;
    // var rotation = 360 / totaltoolsSatellites;
    var rotation = 30;
    var radius = (toolsUniverseWidth - toolsSatellitesWidth) / 2;
    // var radius = 130;
    var totalOffset = (toolsPlanetWidth - toolsSatellitesWidth) / 2;
    // var totalOffset = 60;

    toolsSatellites.forEach(function (toolsSatellite, i) {
      // place primary tools
      var n = i - 3; // to start from top side instead of rigth side
      var x = Math.round(Math.cos((rotation * n) * (Math.PI / 180)) * radius);
      var y = Math.round(Math.sin((rotation * n) * (Math.PI / 180)) * radius);
      var left = Math.round(x + totalOffset);
      var top = Math.round(y + totalOffset);
      toolsSatellite.style.left = left + "px";
      toolsSatellite.style.top = top + "px";

      // place secondary tools if any
      if (toolsSatellite.classList.contains('has-child')) {
        let toolGroupType = toolsSatellite.dataset.toolGroupType;
        let toolsSatellites = toolsPlanet.querySelectorAll('[data-tool-group-type="' + toolGroupType + '"].secondary');
        let rotation = 16;
        let radius = 178;

        toolsSatellites.forEach(function (toolsSatellite, i) {
          let n = i - 4.5;

          switch (toolGroupType) {
            case "pastel1": n = i + 1; 
              break;
            case "pastel2": n = i + 2.7; 
              break;
            case "stroke": n = i + 4.7;
              break;
            case "opacity": n = i + 6.5; 
              break;
            case "scale": n = i + 6; 
              break;
          }

          let y = Math.sin((rotation * n) * (Math.PI / 180)) * radius;
          let x = Math.cos((rotation * n) * (Math.PI / 180)) * radius;
          toolsSatellite.style.top = (y + totalOffset).toString() + "px";
          toolsSatellite.style.left = (x + totalOffset).toString() + "px";
        })
      }
    });
  });
  // add 'active' class to one of the 'tools-planet'
  toolsPlanetSets.classList.add('active');
  toolsPlanetSetsBtn.classList.add('active');
  toolsPlanetSetsBtn.classList.add('temp-active');

  var clickHandler = function(e) {
    // console.log(e.target.dataset);

    var target = e.target;
    var id = target.id;
    var toolType1 = target.dataset.toolType1; // pen, marker, eraser
    var toolType2 = target.dataset.toolType2; // pastels 1-4
    var toolGroupType = target.dataset.toolGroupType;
    var isPrimary = target.classList.contains('primary');
    var isSecondary = target.classList.contains('secondary');
    var ispanelBtn = target.dataset.panelBtn;

    if (id == "minimizeToggleBtn") {
      if (document.querySelector('.tools-planet.active')) {
        minimizeToggleBtn.classList.add('active');
        toolsUniverse.classList.remove('active');
        toolsPlanetSetsBtn.classList.remove('active');
        toolsPlanetPensBtn.classList.remove('active');
        document.querySelector('.tools-planet.active').classList.add('temp-active');
        document.querySelector('.tools-planet.active').classList.remove('active');
      } else {
        toolsUniverse.classList.add('active');
        minimizeToggleBtn.classList.remove('active');
        document.querySelector('.tools-toggle .temp-active').classList.add('active');
        document.querySelector('.tools-planet.temp-active').classList.add('active');
        document.querySelector('.tools-planet.temp-active').classList.remove('temp-active');
      }
    } else if (id == "toolsPlanetPensBtn") {
      toolsPlanetSetsBtn.classList.remove('active');
      toolsPlanetSetsBtn.classList.remove('temp-active');
      toolsPlanetSets.classList.remove('active');

      toolsPlanetPensBtn.classList.add('active');
      toolsPlanetPensBtn.classList.add('temp-active');
      toolsPlanetPens.classList.add('active');
      toolsUniverse.classList.add('active');
      
      minimizeToggleBtn.classList.remove('active');
    } else if (id == "toolsPlanetSetsBtn") {
      toolsPlanetPensBtn.classList.remove('active');
      toolsPlanetPensBtn.classList.remove('temp-active');
      toolsPlanetPens.classList.remove('active');

      toolsPlanetSetsBtn.classList.add('active');
      toolsPlanetSetsBtn.classList.add('temp-active');
      toolsPlanetSets.classList.add('active');
      toolsUniverse.classList.add('active');
      
      minimizeToggleBtn.classList.remove('active');
    } else if (id == 'undo') {
      initDraw.undo();
    } else if (id == 'redo') {
      initDraw.redo();
    } else if (id == 'clear') {
      initDraw.clear();
    } else if(toolType1) {
      updateToolType1(target);
    } else if(toolType2) {
      updateToolType2(target);
    } else if(ispanelBtn) {
      initPanel.toggle(target);
    }
    if(toolGroupType) {
      updateToolsGroup(toolGroupType, target, isPrimary, isSecondary);
    }
  }

  // // pen, marker, eraser
  var updateToolType1 = function(target) {
    // console.log('updateToolType1');

    // remove 'active' class from previous 'active' button
    // and make 'currToolType' null
    var oldToolBtn = document.querySelector('#toolsPlanetPens [data-tool-type1].active');
    if (oldToolBtn) {
      oldToolBtn.classList.remove('active');
      initTools.currToolType = null;
      cv.removeEventListener('mousedown', initDraw.drawStart, false);
    }
    // add 'active' class to current 'clicked' button if it is not the 'active' button already
    // and update 'currToolType' value
    if(oldToolBtn != target) {
      target.classList.add('active');
      initTools.currToolType = target.dataset.toolType1;
      cv.addEventListener('mousedown', initDraw.drawStart, false);
    }
  }  

  // four pastels buttons
  var updateToolType2 = function(target) {
      // console.log('updateToolType2')
      
      // remove 'active' class from previous 'active' button
      var oldToolBtn = document.querySelector('#toolsPlanetPens [data-tool-type2].active');
      if (oldToolBtn && oldToolBtn != target) {
        oldToolBtn.classList.remove('active');
        target.classList.add('active');
      }

      initDraw.strokeColor = target.dataset.value;
  }

  // handling of satellite buttons which has childrens
  var updateToolsGroup = function(toolGroupType, target, isPrimary, isSecondary) {
    // console.log('updateToolsGroup');

    if(isPrimary) { 
      // console.log('isPrimary')

      // remove 'show-child' class if present
      if(target.classList.contains('show-child')) {
        target.classList.remove('show-child')
      } else { // add 'show-child' on clicked element before that remove from other element if present
        if(document.querySelector('.has-child.show-child')) {
          document.querySelector('.has-child.show-child').classList.remove('show-child');
        }        
        target.classList.add('show-child');
      }  
    } else if(isSecondary) {
      // console.log('isSecondary');

      var parent = document.querySelector('[data-tool-group-type="' + toolGroupType + '"].primary');
      var oldToolBtn = document.querySelector('[data-tool-group-type="' + toolGroupType + '"].secondary.active');

      // make pastel group behave like first two pastel buttons
      if(toolGroupType.substr(0, 6) == 'pastel') {
        document.querySelector('[data-tool-type2].primary.active').classList.remove('active');
        parent.setAttribute('data-tool-type2', 'pastel');
        toolGroupType = "pastel";
      }        

      // remove 'active' class from old child having 'active' class
      if(oldToolBtn) {
        oldToolBtn.classList.remove('active');
      }
      
      target.classList.add('active');
      parent.classList.add('active');
      parent.classList.remove('show-child');
      
      switch(toolGroupType) {
        case "opacity": initDraw.strokeOpacity = parseFloat(target.dataset.value);
        break;
        case "stroke": initDraw.strokeWidth = parseFloat(target.dataset.value);
        break;
        case "pastel": 
          var src = target.querySelector('img').getAttribute('src');
          parent.querySelector('img').setAttribute('src', src);
          parent.setAttribute('data-value', target.dataset.value)
          initDraw.strokeColor = target.dataset.value;
        break;
      }
    }
  }
  
  // click listener on tools
  toolsUniverse.addEventListener('click', clickHandler, false);  

  return {
    currToolType: currToolType,
    currSetType: currSetType
  }
})();

// draw, undo, redo, clear functions
var initDraw = (function () {
  // console.log('initDraw');

  // initial stroke properties from HTML elements
  var strokeOpacityEl = document.querySelector('[data-tool-group-type="opacity"].secondary.active');
  var strokeOpacity = parseFloat(strokeOpacityEl.dataset.value);

  var strokeWidthEl = document.querySelector('[data-tool-group-type="stroke"].secondary.active');
  var strokeWidth = parseFloat(strokeWidthEl.dataset.value);

  var strokeColorEl = document.querySelector('[data-tool-type2="pastel"].primary.active');
  var strokeColor = strokeColorEl.dataset.value;

  var currId = null;
  var index = 0;
  var startPoint;
  var currPoint;
  var undoStack = [];
  var redoStack = [];  

  // Undo last action
  var Undo = function() {
    // console.log('undo');
    if (undoStack.length > 0) {
      var lastAction = undoStack.pop();
      var ele, clearedEles;
      switch (lastAction.Action) {
        case 'draw':
          ele = document.getElementById(lastAction.Id);
          lastAction.Elements.push(ele);
          ele.parentNode.removeChild(ele);
          break;
        case 'erase':
          cv.appendChild(lastAction.Elements[0]);
          break;
        case 'clear':
          clearedEles = lastAction.Elements;
          clearedEles.forEach(function (shape) {
            cv.appendChild(shape);
            index++;
          });
          break;
      }
      redoStack.push(lastAction);
    }
  }

  // Redo last undoed action 
  var Redo = function() {
    // console.log('redo');
    if (redoStack.length > 0) {
      var lastAction = redoStack.pop();
      var ele;
      switch (lastAction.Action) {
        case 'draw':
          ele = lastAction.Elements[0];
          cv.appendChild(ele);
          break;
        case 'erase':
          ele = lastAction.Elements[0];
          ele.parentNode.removeChild(ele);
          break;
        case 'clear':
          lastAction.Elements.forEach(function (ele) {
            ele.parentNode.removeChild(ele);
          });
          break;
      }
      undoStack.push(lastAction);
    }
  }

  // clears everything
  var Clear = function() {
    // console.log('clear')
    index = 0;
    var clearedEles = document.querySelectorAll('.drawing');
    redoStack = [];
    undoStack.push({
      Elements: clearedEles,
      Id: null,
      Action: 'clear'
    });
    cv.innerHTML = "";
  }

  // start drawing or erasing
  var drawStart = function(e) {
    // console.log('drawStart')
    e.preventDefault();

    var strokeOpacity = initDraw.strokeOpacity;

    var strokeColorPen = initDraw.strokeColor;
    var strokeWidthPen = initDraw.strokeWidth;

    var strokeColorMarker = 'rgba(0, 255, 0, .5)';
    var strokeWidthMarker = initDraw.strokeWidth + 10;

    var polylineTag;    
    var currToolType = initTools.currToolType;
  
    var currPoint = getMousePosition(e, cv);
    currId = 'shape' + index;


    if(currToolType == "pen" || currToolType == "marker") {
      if(currToolType == "pen") {
        polylineTag = '<polyline class="drawing" id="' + currId + '" style="opacity:'+strokeOpacity+';fill:none;stroke-linecap:round;stroke:' + strokeColorPen + ';stroke-width:' + strokeWidthPen + '" points="' + currPoint.x + ',' + currPoint.y + '" />';;
      } else if(currToolType == "marker") {
        polylineTag = '<polyline class="drawing" id="' + currId + '" style="fill:none;stroke-linecap:round;stroke:' + strokeColorMarker + ';stroke-width:' + strokeWidthMarker + '" points="' + currPoint.x + ',' + currPoint.y + '" />';;
      }
      cv.innerHTML += polylineTag;
    }

    cv.addEventListener('mousemove', draw, false);
    cv.addEventListener('mouseup', drawEnd, false);

    index++;
    startPoint = currPoint;
  }

  // keep drawing or erasing
  var draw = function (e) {
    // console.log('draw')
    e.preventDefault();

    var currToolType = initTools.currToolType;
    var currPoint = getMousePosition(e, cv);
    var polyline, points;

    if (currToolType == "pen" || currToolType == "marker") {
      polyline = document.getElementById(currId);
      points = polyline.getAttribute('points');

      if (currToolType == "pen") {
        points += ' ' + currPoint.x + ',' + currPoint.y;
      } else if (currToolType == "marker") {
        points = startPoint.x + ',' + startPoint.y + ' ' + currPoint.x + ',' + currPoint.y;
      }

      polyline.setAttribute('points', points);
    } else if (currToolType == "eraser") {
      var target = e.target;
      if (target.classList.contains('drawing')) {
        redoStack = [];
        undoStack.push({
          Elements: [target],
          Id: target.id,
          Action: 'erase'
        });
        target.remove();
      }
    }

    cv.addEventListener('mouseleave', drawEnd, false);
  }

  // stop drawing or erasing
  var drawEnd = function() {
    // console.log('drawEnd')

    if (currId !== null && document.getElementById(currId) != null) {
      undoStack.push({
        Elements: [],
        Id: currId,
        Action: 'draw'
      });
    }

    cv.removeEventListener('mousemove', draw, false);
    cv.removeEventListener('mouseup', drawEnd, false);
    cv.removeEventListener('mouseleave', drawEnd, false);
  }

  return {
    undo: Undo,
    redo: Redo,
    clear: Clear,
    strokeOpacity: strokeOpacity,
    strokeWidth: strokeWidth,
    strokeColor: strokeColor,
    drawStart: drawStart
  }  
})();

// drag behaviour of elements - tools/panels/sets
var initElDrag = (function() {
  var startX = 0, startY = 0, endX = 0, endY = 0;
  var dragParentzIndex = 0; // update only if drag parent is different each dragging time
  var dragParent = dropParent = oldDragParent = null;

  var init = function(draggable, listener) {
    // console.log('init drag')

    var dragAreas = draggable.querySelectorAll('.drag-area');
    
    if(listener == "add") { // ADD EVENT LISTENERS
      // console.log('adding')
      if (dragAreas.length > 0) { // if `dragArea` is available, use that to drag
        dragAreas.forEach(function (dragArea) {
          dragArea.addEventListener('mousedown', dragStart, false);
        })
      } else { // otherwise move the element anywhere from with in element
        draggable.addEventListener('mousedown', dragStart, false);
      }    
    } else if(listener == "remove") { // REMOVE EVENT LISTENERS
      // console.log('removing')
      if (dragAreas.length > 0) {
        dragAreas.forEach(function (dragArea) {
          dragArea.removeEventListener('mousedown', dragStart, false);
        })
      } else {
        draggable.removeEventListener('mousedown', dragStart, false);
      }    
    }
  }

  var dragStart = function(e) {
    // console.log('dragStart');

    var currPoint = getMousePosition(e, cv);
    initElDrag.dragParent = e.target.closest('.draggable');
    var dragParent = initElDrag.dragParent;
    // var oldDragParent = initElDrag.oldDragParent;
    
    // drag only if current element has class 'drag-area'
    if (e.target.classList.contains('drag-area')) {
      // if(e.target.closest('.drag-area')) {

      cvOuter.classList.add('dragging');
      
      startX = currPoint.x;
      startY = currPoint.y;
        
      if(dragParent != initElDrag.oldDragParent) {
        dragParent.style.zIndex = ++initElDrag.dragParentzIndex;
      } 
      initElDrag.oldDragParent = initElDrag.dragParent;

      // get coordinates of nearby draggable cubes
      if (dragParent.classList.contains('draggable-cubes')) {
        initCubes.getCoords();
      }

      cvOuter.addEventListener('mousemove', drag, false);
      cvOuter.addEventListener('mouseup', dragEnd, false);
    }
  }

  var drag = function(e) {
    // console.log('drag')
    e.preventDefault();

    var currPoint = getMousePosition(e, cv);
    var dragParent = initElDrag.dragParent;

    // calculate the new cursor position:
    endX = startX - currPoint.x;
    endY = startY - currPoint.y;
    startX = currPoint.x;
    startY = currPoint.y;

    // set the element's new position:
    dragParent.style.left = (dragParent.offsetLeft - endX) + "px";
    if(dragParent == toolsUniverse) {
      var H = cvOuter.getBoundingClientRect().height;
      var h = dragParent.getBoundingClientRect().height;
      var o = dragParent.offsetTop;
      var offsetBottom = H - h - o;
      dragParent.style.bottom = (offsetBottom + endY) + "px";
    } else {
      dragParent.style.top = (dragParent.offsetTop - endY) + "px";
    }

    // highligh if 'draggable-cube' is in range
    if (dragParent.classList.contains('draggable-cubes')) {
      // initCubes.isSnapping = true;
      initCubes.getShortestDist();
      // highlight groups accordingly
      if (initCubes.shortestDist != null) {
        if (initCubes.shortestDist < initCubes.snapDist) {
          initCubes.highlight(true);
        } else {
          initCubes.highlight(false);
        }
      }
    }
  }

  var dragEnd = function(e) {
    // console.log('dragEnd')
    e.preventDefault();

    var dragParent = initElDrag.dragParent;

    cvOuter.classList.remove('dragging');

    // snap cubes if in range
    if (dragParent.classList.contains('draggable-cubes')) {
      if (initCubes.shortestDist != null && initCubes.shortestDist < initCubes.snapDist) {
        initCubes.snap();
        initCubes.shortestDist = null;
      }
    }
    // initCubes.isSnapping = false;

    cvOuter.removeEventListener('mousemove', drag, false);
    cvOuter.removeEventListener('mouseup', dragEnd, false);
  }

  init(toolsUniverse, 'add');

  return {
    dragParentzIndex: dragParentzIndex,
    dragParent: dragParent,
    dropParent: dropParent,
    oldDragParent: oldDragParent,
    init: init
  }
})();

// drag behaviour of seals - cubes/money/numbers/flowers
var initSealsDrag = (function () {
  var dragEloffsetX, dragEloffsetY;
  var draggablesId = 0;
  var dropElHeight = 0;

  var dragStart = function(e) {
    // console.log('dragStart');

    dragEloffsetX = e.offsetX;
    dragEloffsetY = e.offsetY;
    e.dataTransfer.setData("src", e.target.src);
    e.dataTransfer.setData("width", e.target.getBoundingClientRect().width);
    e.dataTransfer.setData("height", e.target.getBoundingClientRect().height);
    e.dataTransfer.setData("sealType", e.target.dataset.sealType);
    
    cvOuter.addEventListener('dragenter', dragEnter, false);
    cvOuter.addEventListener('dragleave', dragLeave, false);
    cvOuter.addEventListener('dragover', dragOver, false);
    cvOuter.addEventListener('drop', drop, false);
  }
  var dragEnter = function(e) { e.preventDefault(); }
  var dragLeave = function(e) { e.preventDefault(); }
  var dragOver = function(e) {
    e.preventDefault();
    cvOuter.classList.add('dropping');
  }
  var drop = function(e) {
    // console.log('drop');
    e.preventDefault();

    var sealType = e.dataTransfer.getData('sealType');
    var src = e.dataTransfer.getData('src');
    var width = e.dataTransfer.getData('width');
    var height = e.dataTransfer.getData('height');

    cvOuter.classList.remove('dropping');

    var totalSealsAllowed = sealTypes[sealType]['max'];
    var totalSealsPlaced = document.querySelectorAll('[data-seal-type="' + sealType + '"].dropped-seal').length;

    if (totalSealsPlaced < totalSealsAllowed) {
      var draggable;
      if (sealType == "cubes") { // generate new draggable group
        draggable = document.createElement('div');
        // <div class="cube"><img src="${src}" style="width: ${width-50}px; height: ${height-50}px;"></div>
        draggable.innerHTML = `
          <div class="cube-outer drag-area" data-index="0" data-seal-type="${sealType}">
            <div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
          </div>
          <div class="dot dot-top"></div>
          <div class="dot dot-bottom"></div>
          <div class="dot dot-left"></div>
          <div class="dot dot-right"></div>
        `;
      } else { // generate a seal
        draggable = document.createElement('img');
        draggable.src = src;
        draggable.width = width;
        draggable.height = height;
        draggable.classList.add('dropped-seal');
        draggable.classList.add('drag-area');
        draggable.setAttribute('data-seal-type', sealType);
        // draggable.innerHTML = `
        //   <img class="dropped-seal drag-aread" src="${src} data-seal-type=${sealType}";
        // `;
      }

      draggable.classList.add('draggable-cubes');
      draggable.setAttribute('data-id', ++initSealsDrag.draggablesId);
      draggable.style.zIndex = ++initElDrag.dragParentzIndex;
      draggable.style.left = e.offsetX - dragEloffsetX + 'px';
      draggable.style.top = e.offsetY - dragEloffsetY + 'px';
      draggable.classList.add('draggable');
      
      cvOuter.appendChild(draggable);

      initSealsDrag.dropElHeight = draggable.getBoundingClientRect().height;

      // draggable.addEventListener('dblclick', (e) => { draggable.remove(); }, false);
      draggable.addEventListener('dblclick', initCubes.detach, false);

      initElDrag.init(draggable, 'add');

      cvOuter.removeEventListener('dragenter', dragEnter)
      cvOuter.removeEventListener('dragleave', dragLeave)
      cvOuter.removeEventListener('dragover', dragOver)
      cvOuter.removeEventListener('drop', drop)
    } else {
      alert('You can only place max ' + totalSealsAllowed + ' of ' + sealType + ' seal type.');
    }
  }

  return {
    dragStart: dragStart,
    draggablesId: draggablesId,
    dropElHeight: dropElHeight
  }
})();

// fetch seals from 'settings.json' file
var fetchSeals = (function () {
  // console.log('fetching seals');

  for (var sealType in sealTypes) {
    var sealPanelContent = document.querySelector('[data-panel="' + sealType + '"] .content');
    if (sealTypes.hasOwnProperty(sealType)) {
      var values = sealTypes[sealType].values;
      values.forEach(value => {
        var el = document.createElement('img');
        el.classList.add('draggable-seal');
        el.setAttribute('data-seal-type', sealType);
        el.src = './_assets/img/' + value;
        sealPanelContent.appendChild(el);
      });
    }
  }
})();

// init panel functions - open/close/drag-panel/drag-seals
var initPanel = (function (e) {
  var toggle = function(target) {
    var panelType = target.dataset.panelBtn;
    
    // open panel
    if (!target.classList.contains('active')) {
      // console.log('open panel');

      var panel = document.querySelector('[data-panel="' + panelType + '"]');
      var panelCloseBtn = panel.querySelector('.close-btn');
      var draggableSeals = panel.getElementsByClassName('draggable-seal');
      
      target.classList.add('active');
      panel.classList.add('active');
      panel.style.zIndex = ++initElDrag.dragParentzIndex;

      initElDrag.dragParent = panel;
      initElDrag.oldDragParent = panel;

      // ADD EVENT LISTENERS
      panelCloseBtn.addEventListener('click', close, false);
      initElDrag.init(panel, 'add');
      for (var i = 0; i < draggableSeals.length; i++) {
        draggableSeals[i].addEventListener('dragstart', initSealsDrag.dragStart, false);
      }

      // update current geometry set type
      if (panel.dataset.panelSet) {
        currSetType = panel.dataset.panelSet;
      }
    } else { // close panel if already open
      close(panelType);
    }
  }
  var close = function(e) {
    // console.log('close panel')
    var panel = panelBtn = panelCloseBtn = draggableSeals = null;

    // clicked on closed button and 'type' property exist
    if(e.type) {
      panel = this.closest('.draggable');
      var panelType = panel.dataset.panel;
      panelBtn = document.querySelector('[data-panel-btn="' + panelType + '"]');
      panelCloseBtn = this;
    } else { // clicked on panel btn itself and called 'closePanel' function so 'e.type' not defined
      var panelType = e;
      panel = document.querySelector('[data-panel="' + panelType + '"]');;
      panelBtn = document.querySelector('[data-panel-btn="' + panelType + '"]');
      panelCloseBtn = panel.querySelector('.close-btn');
    }
    
    draggableSeals = panel.getElementsByClassName('draggable-seal');
    panel.classList.remove('active');
    panelBtn.classList.remove('active');

    // REMOVE EVENT LISTENERS
    panelCloseBtn.removeEventListener('click', close, false);
    initElDrag.init(panel, 'remove');
    for (var i = 0; i < draggableSeals.length; i++) {
      draggableSeals[i].removeEventListener('dragstart', initSealsDrag.dragStart, false);
    }

    // update current geometry set type to null
    if (panel.dataset.panelSet) {
      currSetType = null;
    }    
  }
  return {
    toggle: toggle
  }
})();

// cubes - highlighting/snapping/detaching
var initCubes = (function (e) {
  var dropCoords = {};
  var isSnapping = false; // REMOVE LATER IF NOT REQUIRED
  var snapDist = 40;
  var snapInfo = { i: 0, j: 0, id: '' };
  var row = 3;
  var col = 3; 
  var dragParentLeft = dragParentTop = shortestDist = snapType = dragParent = dropParent = cubeLimit = cubeOuter = null;
  var detachType = null;

  // wrt dragParent
  // 0 == top | 1 == bottom
  // 0 == left | 1 == right
  var getCoords = function() {
    // console.log('geting Coordingates');

    dragParent = initElDrag.dragParent;

    snapType = (dragParent.classList.contains('vertical')) ? 'horizontal' : 'vertical';
    detachType = (dragParent.classList.contains('horizontal')) ? 'horizontal' : 'vertical';
    dropCoords = {};
    var dropDotCoord_0 = dropDotCoord_1 = null;

    var draggableCubes = document.querySelectorAll('.draggable-cubes');


    for (let i = 0; i < draggableCubes.length; i++) {
      if (draggableCubes[i] == dragParent) { continue; }

      if (snapType == 'vertical') {
        // console.log('vertical snapping')
        dropDotCoord_0 = draggableCubes[i].querySelector('.dot-top').getBoundingClientRect();
        dropDotCoord_1 = draggableCubes[i].querySelector('.dot-bottom').getBoundingClientRect();
      } else {
        // console.log('horizontal snapping')
        dropDotCoord_0 = draggableCubes[i].querySelector('.dot-left').getBoundingClientRect();
        dropDotCoord_1 = draggableCubes[i].querySelector('.dot-right').getBoundingClientRect();
      }
      var id = draggableCubes[i].dataset.id;

      var dropCoord = {
        0: {
          x: dropDotCoord_0.x,
          y: dropDotCoord_0.y
        },
        1: {
          x: dropDotCoord_1.x,
          y: dropDotCoord_1.y
        }
      }
      dropCoords[id] = dropCoord;
    }

    dragParentLeft = dragParent.style.left;
    dragParentTop = dragParent.style.top;
  }
  var getShortestDist = function() {
    // console.log('geting shortest dist');
    
    var shortestDist = null;

    snapInfo = { i: 0, j: 0, id: '' };

    if (snapType == 'vertical') {
      dropDotCoord_0 = dragParent.querySelector('.dot-top').getBoundingClientRect();
      dropDotCoord_1 = dragParent.querySelector('.dot-bottom').getBoundingClientRect();
    } else {
      dropDotCoord_0 = dragParent.querySelector('.dot-left').getBoundingClientRect();
      dropDotCoord_1 = dragParent.querySelector('.dot-right').getBoundingClientRect();
    }

    var dragCoord = {
      0: {
        x: dropDotCoord_0.x,
        y: dropDotCoord_0.y
      },
      1: {
        x: dropDotCoord_1.x,
        y: dropDotCoord_1.y
      }
    }

    // wrt dragParent
    // 0 == top | 1 == bottom
    // 0 == left | 1 == right
    // for(var i = 0; i < 2; i++) { // 0,1 -> snap using BOTH sides (top and botton || left and right)
    // for(var i = 1; i < 2; i++) {  // 1 -> snap using only one side (bottom || right)
    for (var i = 0; i < 1; i++) {  // 0 -> snap using only one side (top || left)
      for (var dropCoord in dropCoords) {
        // if drag is 'top' || 'left compare with 'bottom' || 'right' dots of drop respectivily
        var j = (i == 0) ? 1 : 0;
        if (dropCoords.hasOwnProperty(dropCoord)) {

          // gettting coordinates to calcualte dist
          var x1 = dragCoord[i].x;
          var y1 = dragCoord[i].y;
          var x2 = dropCoords[dropCoord][j].x;
          var y2 = dropCoords[dropCoord][j].y;

          // calculating dist btw points
          var x = x1 - x2;
          var y = y1 - y2;
          var d = parseFloat((Math.sqrt(x * x + y * y)).toFixed(2));

          // if shortest dist is not defined, make it equal to first calculated dist
          if (shortestDist == null || shortestDist > d) {
            shortestDist = d;
            snapInfo = {
              i: (i == 0) ? 0 : 1, // to save if it was top or bottom of dragged element
              j: (j == 0) ? 0 : 1, // to save if it was top or bottom of dropped element
              id: dropCoord // id of element who's j value is saved
            }

            initCubes.shortestDist = shortestDist;
            dropParent = initElDrag.dropParent = document.querySelector('[data-id="' + dropCoord + '"');

            // no highlighting if element has already enought cubes in column
            if(snapType == 'vertical') {
              if (dropParent.classList.contains('vertical')) {
                // initCubes.shortestDist = null
              }
            }
            if(snapType == 'horizontal') {
              if (!dragParent.classList.contains('vertical') || !dropParent.classList.contains('vertical')) {
                initCubes.shortestDist = null
              }
            }
          };
        }
      }
    }
  }
  var highlight = function(flag) {
    if (flag) {
      // console.log('highlighting')
      dragParent.classList.add('highlight');
      dropParent.classList.add('highlight');
    } else {
      dragParent.classList.remove('highlight');
      dropParent.classList.remove('highlight');
    }
  }
  var snap = function() {
    // console.log('snapping');

    var transitionEvent = whichTransitionEvent();

    cubeLimit = (snapType == "vertical") ? row : col;

    var sealType = dragParent.querySelector('[data-seal-type]').dataset.sealType;
    var src = dragParent.querySelector('img').src;
    var width = dragParent.querySelector('img').width;
    var height = dragParent.querySelector('img').height;

    if(snapType == "vertical") {
      var dropParentCubeCount = dropParent.querySelectorAll('.drag-area').length;
      var dragParentCubeCount = dragParent.querySelectorAll('.drag-area').length;
    } else {
      var dropParentCubeCount = dropParent.querySelectorAll('.cube-outer').length;
      var dragParentCubeCount = dragParent.querySelectorAll('.cube-outer').length;
    }
    var totalCubes = dropParentCubeCount + dragParentCubeCount;

    // console.log('snapType: ', snapType);
    // console.log('dropParentCubeCount: ', dropParentCubeCount);
    // console.log('dragParentCubeCount: ', dragParentCubeCount);
    // console.log('totalCubes: ', totalCubes);
    // console.log('cubeLimit: ', cubeLimit);

    // if possible to add more cubes (both vertical and horizontal)
    if (totalCubes <= cubeLimit) {
      // console.log('totalCubes <= cubeLimit');

      cubeOuter = '';
      if (snapType == "vertical") {
        for (var r = 0; r < dragParentCubeCount; r++) {
          cubeOuter += `
            <div class="cube-outer drag-area" data-index="${dropParentCubeCount + r}" data-seal-type="${sealType}">
              <div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
            </div>        
          `;
        }
        initElDrag.dropParent.innerHTML += cubeOuter;
        dropParent = initElDrag.dropParent;
      } else if (snapType == "horizontal") {
        cubeOuter = '';
        for (var c = 0; c < totalCubes; c++) {
          cubeOuter += `<div class="cube-outer drag-area" data-index="${c}" data-seal-type="${sealType}">`;
          for (var r = 0; r < row; r++) {
            cubeOuter += `<div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
          }
          cubeOuter += '</div>';
        }
        cubeOuter += `
          </div>
          <div class="dot dot-top"></div>
          <div class="dot dot-bottom"></div>
          <div class="dot dot-left"></div>
          <div class="dot dot-right"></div>     
        `;        
        initElDrag.dropParent.innerHTML = cubeOuter;  
        dropParent = initElDrag.dropParent;
        initElDrag.init(dropParent, 'add');
      }
      
      if (snapType == "horizontal") dropParent.classList.add('horizontal');

      totalCubes = dropParent.querySelectorAll('.cube-outer').length;
      
      // if vertical limit reached
      if (totalCubes == cubeLimit) {
        // console.log('totalCubes == cubeLimit');

        if(snapType == "vertical") {
          // make vertical complete group (layout needs to update)
          cubeOuter = `<div class="cube-outer">`;
          for(var r = 0; r < row; r++) {
            cubeOuter += `<div class="cube drag-area" data-index="${r}" data-seal-type="${sealType}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
          }
          cubeOuter += `
            </div>
            <div class="dot dot-top"></div>
            <div class="dot dot-bottom"></div>
            <div class="dot dot-left"></div>
            <div class="dot dot-right"></div>     
          `;

          initElDrag.dropParent.innerHTML = cubeOuter;
          dropParent = initElDrag.dropParent;
          dropParent.classList.add('vertical');
        } else if(snapType == "horizontal") {
          dropParent = initElDrag.dropParent;
        }
        
        console.log('limit reached!!!!!!!!!!');
      }
      // console.log(dropParent);
      initElDrag.init(dropParent, 'add');
      dragParent.remove();
    } else if(totalCubes > cubeLimit) {
      // console.log('totalCubes > cubeLimit');

      var canBeAddedCubes = cubeLimit - dropParentCubeCount;
      var remainingCubes = dragParentCubeCount - canBeAddedCubes;

      if(snapType == "vertical") {
        // make vertical complete group (layout needs to update)
        cubeOuter = `<div class="cube-outer">`;
        for(var r = 0; r < row; r++) {
          cubeOuter += `<div class="cube drag-area" data-index="${r}" data-seal-type="${sealType}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
        }
        cubeOuter += `
          </div>
          <div class="dot dot-top"></div>
          <div class="dot dot-bottom"></div>
          <div class="dot dot-left"></div>
          <div class="dot dot-right"></div>     
        `;
        
        initElDrag.dropParent.innerHTML = cubeOuter;
        dropParent = initElDrag.dropParent;
        dropParent.classList.add('vertical');

        // remove cubes from dragParent
        for (var i = 0; i < canBeAddedCubes; i++) {
          dragParent.querySelector('[data-index="' + (dragParentCubeCount - 1 - i) + '"].cube-outer').remove();
        }

      } else if(snapType == "horizontal") {
        // make horizontal complete group 
        cubeOuter = "";
        for (var c = 0; c < canBeAddedCubes; c++) {
          cubeOuter += `<div class="cube-outer drag-area" data-index="${dropParentCubeCount + c}" data-seal-type="${sealType}">`;
          for (var r = 0; r < row; r++) {
            cubeOuter += `<div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
          }
          cubeOuter += '</div>';
        }
        initElDrag.dropParent.innerHTML += cubeOuter;
        dropParent = initElDrag.dropParent;
        // dropParent.classList.remove('vertical');

        if(remainingCubes == 1) {
          cubeOuter = `<div class="cube-outer">`;
          for (var r = 0; r < row; r++) {
            cubeOuter += `<div class="cube drag-area" data-index="${r}" data-seal-type="${sealType}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
          `;
          }
          cubeOuter += `
            </div> 
            <div class="dot dot-top"></div>
            <div class="dot dot-bottom"></div>
            <div class="dot dot-left"></div>
            <div class="dot dot-right"></div>     
          `;   
  
          initElDrag.dragParent.innerHTML = cubeOuter;
          dragParent = initElDrag.dragParent;
          initElDrag.init(dragParent, 'add');        
          dragParent.classList.remove('horizontal');
        } else {
          // remove cubes from dragParent
          for (var i = 0; i < canBeAddedCubes; i++) {
            dragParent.querySelector('[data-index="' + (dragParentCubeCount - 1 - i) + '"].cube-outer').remove();
          }
        }
      }
      
      initElDrag.init(dropParent, 'add');

      
      dragParent.style.left = dragParentLeft;
      dragParent.style.top = dragParentTop;
      initElDrag.init(dragParent, 'add');
      dragParent.classList.add('cant-snap');

      console.log('limit reached!!!!!!!!!!');
    }

    dragParent.addEventListener(transitionEvent, transitionEndCallback);
    function transitionEndCallback() {
      dragParent.removeEventListener(transitionEvent, transitionEndCallback);
      dragParent.classList.remove('cant-snap');
    }
    dragParent.classList.remove('highlight');
    dropParent.classList.remove('highlight');
  }
  var detach = function(e) {
    // console.log('detaching');

    if (detachType == 'vertical') {  // vertical detach
      var target = e.target;

      var index = parseInt(target.dataset.index);
      var totalCubes = dragParent.querySelectorAll('.drag-area').length;
      var detachCubes = totalCubes - index;   

      var sealType = dragParent.querySelector('[data-seal-type]').dataset.sealType;
      var src = dragParent.querySelector('img').src;
      var width = dragParent.querySelector('img').width;
      var height = dragParent.querySelector('img').height;

      dragParentLeft = dragParent.style.left;
      dragParentTop = dragParent.style.top;

      // console.log('target: ', target);
      // console.log('index: ', index);
      // console.log('detachCubes: ', detachCubes);
      // console.log('totalCubes: ', totalCubes);

      if (totalCubes == 1 && !dragParent.classList.contains('vertical')) {
        dragParent.remove();
      } else if(index) {
        // top
        if(!dragParent.classList.contains('vertical')) { // detaching vertical group when INCOMPLETE
          for (var r = index; r < totalCubes; r++) {
            dragParent.querySelector('[data-index="' + r + '"]').remove();
          }
        } else { // detaching vertical group when COMPLETE
          cubeOuter = '';
          for (var r = 0; r < index; r++) {
            cubeOuter += `
              <div class="cube-outer drag-area" data-index="${r}" data-seal-type="${sealType}">
                <div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
              </div>        
            `;
          }
          cubeOuter += `
            <div class="dot dot-top"></div>
            <div class="dot dot-bottom"></div>
            <div class="dot dot-left"></div>
            <div class="dot dot-right"></div>     
          `;   
          initElDrag.dragParent.innerHTML = cubeOuter;
          dragParent = initElDrag.dragParent;          
          dragParent.classList.remove('vertical');

          initElDrag.init(dragParent, 'add');
          dragParent.addEventListener('dblclick', detach, false);
        }

        var left = parseFloat(dragParentLeft);
        var top = parseFloat(dragParentTop) + dragParent.getBoundingClientRect().height + 30;
        // bottom
        var draggable = document.createElement('div');
        draggable.classList.add('draggable-cubes');
        draggable.classList.add('draggable');
        draggable.setAttribute('data-id', ++initSealsDrag.draggablesId);
        draggable.style.left = left + 'px';
        draggable.style.top = top + 'px';
        draggable.style.zIndex = ++initElDrag.dragParentzIndex;
  
        cubeOuter = '';
        for (var r = 0; r < detachCubes; r++) {
          cubeOuter += `
          <div class="cube-outer drag-area" data-index="${r}" data-seal-type="${sealType}">
            <div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
          </div>        
        `;
        }
        cubeOuter += `
          <div class="dot dot-top"></div>
          <div class="dot dot-bottom"></div>
          <div class="dot dot-left"></div>
          <div class="dot dot-right"></div>     
        `;          
  
        draggable.innerHTML = cubeOuter;
        cvOuter.appendChild(draggable);
  
        initElDrag.init(draggable, 'add');
        draggable.addEventListener('dblclick', detach, false);
      } else {
        console.warn("Can't remove from here!");
      }
    } else { // horizontal detach
      var target = e.target;

      var index = parseInt(target.dataset.index);
      var totalCubes = dragParent.querySelectorAll('.drag-area').length;
      var detachCubes = totalCubes - index;   

      var sealType = dragParent.querySelector('[data-seal-type]').dataset.sealType;
      var src = dragParent.querySelector('img').src;
      var width = dragParent.querySelector('img').width;
      var height = dragParent.querySelector('img').height;

      dragParentLeft = dragParent.style.left;
      dragParentTop = dragParent.style.top;

      // console.log('target: ', target);
      // console.log('index: ', index); // 1
      // console.log('detachCubes: ', detachCubes); // 2
      // console.log('totalCubes: ', totalCubes); // 3

      if(index) {
        // left
        if(index == 1) {
          cubeOuter = `<div class="cube-outer">`;
          for (var r = 0; r < row; r++) {
            cubeOuter += `<div class="cube drag-area" data-index="${r}" data-seal-type="${sealType}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
          `;
          }
          cubeOuter += `
            </div> 
            <div class="dot dot-top"></div>
            <div class="dot dot-bottom"></div>
            <div class="dot dot-left"></div>
            <div class="dot dot-right"></div>     
          `;   

          initElDrag.dragParent.innerHTML = cubeOuter;
          dragParent = initElDrag.dragParent;
          initElDrag.init(dragParent, 'add');
          dragParent.classList.remove('horizontal');
        } else {
          for (var r = index; r < totalCubes; r++) {
            dragParent.querySelector('[data-index="' + r + '"]').remove();
          }
        }

        var left = parseFloat(dragParentLeft) + dragParent.getBoundingClientRect().width + 30;
        var top = parseFloat(dragParentTop);

        // right
        var draggable = document.createElement('div');
        draggable.classList.add('draggable-cubes');
        draggable.classList.add('draggable');
        draggable.setAttribute('data-id', ++initSealsDrag.draggablesId);
        draggable.style.left = left + 'px';
        draggable.style.top = top + 'px';
        draggable.style.zIndex = ++initElDrag.dragParentzIndex;
  
        if(detachCubes == 1) { // detach partion is only 1
          cubeOuter = `<div class="cube-outer">`;
          for (var r = 0; r < row; r++) {
            cubeOuter += `<div class="cube drag-area" data-index="${r}" data-seal-type="${sealType}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
          `;
          }
          cubeOuter += `
            </div> 
            <div class="dot dot-top"></div>
            <div class="dot dot-bottom"></div>
            <div class="dot dot-left"></div>
            <div class="dot dot-right"></div>     
          `;    
                
        } else { // detach partion - more than 1
          cubeOuter = '';
          for(var c = 0; c < detachCubes; c++) {
            cubeOuter += `<div class="cube-outer drag-area" data-index="${c}" data-seal-type="${sealType}">`;
            for (var r = 0; r < row; r++) {
              cubeOuter += `<div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
            }
            cubeOuter += `</div>`;
          }
          cubeOuter += `
            <div class="dot dot-top"></div>
            <div class="dot dot-bottom"></div>
            <div class="dot dot-left"></div>
            <div class="dot dot-right"></div>     
          `;          
          draggable.classList.add('horizontal');
        }

        initElDrag.dropParent = draggable;
        // dropParent = initElDrag.dropParent;

        draggable.classList.add('vertical');
        draggable.innerHTML = cubeOuter;
        cvOuter.appendChild(draggable);
  
        initElDrag.init(draggable, 'add');
        draggable.addEventListener('dblclick', detach, false);
      } else {
        console.warn("Can't remove from here!");
      }      
    }
  }

  return {
    isSnapping: isSnapping,
    snapDist: snapDist,
    shortestDist: shortestDist,
    getCoords: getCoords,
    getShortestDist: getShortestDist,
    highlight: highlight,
    snap, snap,
    detach, detach
  }
})();