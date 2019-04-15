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
    // var radius = (toolsUniverseWidth - toolsSatellitesWidth) / 2;
    var radius = 110;
    var totalOffset = (toolsPlanetWidth - toolsSatellitesWidth) / 2;
    // var totalOffset = 60;

    toolsSatellites.forEach(function (toolsSatellite, i) { // place primary tools
      var n = i - 3; // to start from top side instead of rigth side
      var x = Math.round(Math.cos((rotation * n) * (Math.PI / 180)) * radius);
      var y = Math.round(Math.sin((rotation * n) * (Math.PI / 180)) * radius);
      var left = Math.round(x + totalOffset);
      var top = Math.round(y + totalOffset);
      toolsSatellite.style.left = left + "px";
      toolsSatellite.style.top = top + "px";

      if (toolsSatellite.classList.contains('has-child')) { // place secondary tools if any
        let toolGroupType = toolsSatellite.dataset.toolGroupType;
        let toolsSatellites = toolsPlanet.querySelectorAll('[data-tool-group-type="' + toolGroupType + '"].secondary');
        let rotation = 19;
        let radius = 165;

        toolsSatellites.forEach(function (toolsSatellite, i) {
          let n = i - 4.5;

          switch (toolGroupType) {
            case "pastel1": n = i + .7;
              break;
            case "pastel2": n = i + 2.2;
              break;
            case "stroke": n = i + 3.8;
              break;
            case "opacity": n = i + 5.2;
              break;
            case "scale": n = i - 4.5;
              break;
            case "set-square": n = i - 2.2;
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

  var clickHandler = function (e) {
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
    } else if (toolType1) {
      updateToolType1(target);
    } else if (toolType2) {
      updateToolType2(target);
    } else if (ispanelBtn) {
      initPanel.toggle(target);
    }
    if (toolGroupType) {
      updateToolsGroup(toolGroupType, target, isPrimary, isSecondary);
    }
  }

  // // pen, marker, eraser
  var updateToolType1 = function (target) {
    // console.log('updateToolType1');

    // remove 'active' class from previous 'active' button
    // and make 'currToolType' null
    var oldToolBtn = document.querySelector('#toolsPlanetPens [data-tool-type1].active');
    if (oldToolBtn) {
      oldToolBtn.classList.remove('active');
      initTools.currToolType = null;
      cv.removeEventListener('mousedown', initDraw.start, false);
    }
    // add 'active' class to current 'clicked' button if it is not the 'active' button already
    // and update 'currToolType' value
    if (oldToolBtn != target) {
      target.classList.add('active');
      initTools.currToolType = target.dataset.toolType1;
      cv.addEventListener('mousedown', initDraw.start, false);
    }
  }

  // four pastels buttons
  var updateToolType2 = function (target) {
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
  var updateToolsGroup = function (toolGroupType, target, isPrimary, isSecondary) {
    // console.log('updateToolsGroup');
    
    if (isPrimary) {
      // console.log('isPrimary')
      
      // remove 'show-child' class if present
      if (target.classList.contains('show-child')) {
        target.classList.remove('show-child')
      } else { // add 'show-child' on clicked element before that remove from other element if present
        if (document.querySelector('.has-child.show-child')) {
          document.querySelector('.has-child.show-child').classList.remove('show-child');
        }
        target.classList.add('show-child');
      }
    } else if (isSecondary) {
      // console.log('isSecondary');

      var parent = document.querySelector('[data-tool-group-type="' + toolGroupType + '"].primary');
      var oldToolBtn = document.querySelector('[data-tool-group-type="' + toolGroupType + '"].secondary.active');

      // make pastel group behave like first two pastel buttons
      if (toolGroupType.substr(0, 6) == 'pastel') {
        document.querySelector('[data-tool-type2].primary.active').classList.remove('active');
        parent.setAttribute('data-tool-type2', 'pastel');
        toolGroupType = "pastel";
      }

      if (toolGroupType == "scale" || toolGroupType == "set-square") {
        oldToolBtn = null;
      }

      // remove 'active' class from old child having 'active' class
      if (oldToolBtn) {
        oldToolBtn.classList.remove('active');
      }

      if (toolGroupType == 'scale' || toolGroupType == 'set-square') {
        if(toolGroupType == 'scale') {
          var scaleSecActiveBtns = document.querySelectorAll('[data-tool-group-type="scale"].secondary.active');
        } else if (toolGroupType == "set-square") {
          var scaleSecActiveBtns = document.querySelectorAll('[data-tool-group-type="set-square"].secondary.active');
        }
        if(scaleSecActiveBtns.length > 0) {
          parent.classList.add('active');
        } else {
          parent.classList.remove('active');
        }
      } else {
        target.classList.add('active');
        parent.classList.add('active');
      }
      parent.classList.remove('show-child');


      switch (toolGroupType) {
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
  // var strokeWidth = 50;

  var strokeColorEl = document.querySelector('[data-tool-type2="pastel"].primary.active');
  var strokeColor = strokeColorEl.dataset.value;

  var mousedownDraw = mousemoveDraw = false;
  var currId = null;
  var index = 0;
  var startPoint;
  var currPoint = null;
  var undoStack = [];
  var redoStack = [];
  var inRangeObj = false;
  var inStartedInRange = false;
  var pointsObj = null;
  var currToolType, currSetType = null;
  var polylineTag, arcTag, points;
  var m;
  var targetPoint = null;
  var arc = {
    'radius': 0,
    'center': { // center point of arc
      'x': 0,
      'y': 0
    },
    'point': { // any x,y point on arc
      'x': 0,
      'y': 0
    },
    'dotRadius': 5
  }

  // start drawing or erasing
  var start = function (e) {
    // console.group('Drawing')
    // console.log('start-draw')

    mousedownDraw = true;

    e.preventDefault();

    var strokeOpacity = initDraw.strokeOpacity;

    var strokeColorPen = initDraw.strokeColor;
    var strokeWidthPen = initDraw.strokeWidth;

    var strokeColorMarker = 'rgba(0, 255, 0, .5)';
    var strokeWidthMarker = initDraw.strokeWidth + 10;

    currPoint = math.getMousePosition(e, cv);
    currId = 'shape' + index;
    currToolType = initTools.currToolType;
    currSetType = initTools.currSetType;
    startPoint = currPoint;

    // if some set is present on canvas
    if (currSetType) {
      if (currSetType.substr(0, 5) == "scale") {
        pointsObj = math.getSetPoints(initTools.currSetType);

        // check if drawing point is inRange with currentSetType
        inRangeObj = math.sideAndRange(currPoint);
        inStartedInRange = inRangeObj.inRange;
        m = inRangeObj.slope;
        console.log(inRangeObj)

        // update starting coordinates of drawing if set is in range
        if (inStartedInRange) {
          targetPoint = math.getCoords(pointsObj, inRangeObj.side, currPoint, m);
          currPoint.x = targetPoint.x;
          currPoint.y = targetPoint.y;
        }
      }

      if (currSetType == 'compass' && currToolType == "arc") {
        pointsObj = math.getSetPoints(initTools.currSetType);

        arc.center.x = pointsObj[1].x;
        arc.center.y = pointsObj[1].y;
        arc.point.x = pointsObj[2].x;
        arc.point.y = pointsObj[2].y;

        arc.radius = Math.sqrt((pointsObj[2].x - pointsObj[1].x) * (pointsObj[2].x - pointsObj[1].x) + (pointsObj[2].y - pointsObj[1].y) * (pointsObj[2].y - pointsObj[1].y));
        arc.radius = math.parseToFloat(arc.radius, 2);

        arcTag = `<g id="${currId}">
            <ellipse style="fill:${strokeColorPen};stroke-width:0;stroke:none;" cx="${arc.center.x}px" cy="${arc.center.y}px" rx="${arc.dotRadius}px" ry="${arc.dotRadius}px"></ellipse>
            <polyline class="drawing" style="fill:none;stroke-linecap:round;stroke:${strokeColorPen};stroke-width:3" points="${arc.point.x},${arc.point.y} "></polyline>
          </g>`;
        cv.innerHTML += arcTag;
      }
    }

    if (currToolType == "pen" || currToolType == "marker") {
      if (currToolType == "pen") {
        polylineTag = '<polyline class="drawing" id="' + currId + '" style="opacity:' + strokeOpacity + ';fill:none;stroke-linecap:round;stroke:' + strokeColorPen + ';stroke-width:' + strokeWidthPen + '" points="' + currPoint.x + ',' + currPoint.y + '" />';;
      } else if (currToolType == "marker") {
        polylineTag = '<polyline class="drawing" id="' + currId + '" style="fill:none;stroke-linecap:round;stroke:' + strokeColorMarker + ';stroke-width:' + strokeWidthMarker + '" points="' + currPoint.x + ',' + currPoint.y + '" />';;
      }
      cv.innerHTML += polylineTag;
    }

    cv.addEventListener('mousemove', draw, false);
    cv.addEventListener('mouseup', end, false);

    index++;
  }

  // stop drawing or erasing
  var end = function () {
    // console.log('end-draw')
    // console.groupEnd();

    mousedownDraw = mousemoveDraw = false;

    if (currId !== null && document.getElementById(currId) != null) {
      undoStack.push({
        Elements: [],
        Id: currId,
        Action: 'draw'
      });
    }

    cv.removeEventListener('mousemove', draw, false);
    cv.removeEventListener('mouseup', end, false);
    cv.removeEventListener('mouseleave', end, false);
  }

  // keep drawing or erasing
  var draw = function (e) {
    if (mousedownDraw && mousemoveDraw) {
      // console.log('draw');

      e.preventDefault();

      currPoint = math.getMousePosition(e, cv);

      if (currToolType == "pen" || currToolType == "marker") {
        polylineTag = document.getElementById(currId);
        points = polylineTag.getAttribute('points');

        if (currToolType == "marker") {
          points = startPoint.x + ',' + startPoint.y + ' ' + currPoint.x + ',' + currPoint.y;
        } else if (currToolType == "pen") {
          if (inStartedInRange) { // if set is in range

            // to check if cursor went outside of range
            inRangeObj = math.sideAndRange(currPoint);

            if (inRangeObj.inRange) { // if drawing on some side 
              targetPoint = math.getCoords(pointsObj, inRangeObj.side, currPoint, m);

              currPoint.x = targetPoint.x;
              currPoint.y = targetPoint.y;

              points += ' ' + currPoint.x + ',' + currPoint.y;
            } else { // else stop drawing
              cv.removeEventListener('mousemove', draw, false);
              cv.removeEventListener('mouseup', end, false);
            }
          } else { // simple drawing
            points += ' ' + currPoint.x + ',' + currPoint.y;
          }
        }
        polylineTag.setAttribute('points', points);
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

      if (currSetType == 'compass' && currToolType == "arc") {
        arcTag = document.getElementById(currId);
        var polylineInArc = arcTag.querySelector('polyline');
        points = polylineInArc.getAttribute('points');
        pointsObj = math.getSetPoints(initTools.currSetType);

        arc.point.x = pointsObj[2].x;
        arc.point.y = pointsObj[2].y;

        // check if point is pointObj[2] is really lie on arc or not
        // var d = Math.sqrt((pointsObj[2].x - pointsObj[1].x) * (pointsObj[2].x - pointsObj[1].x) + (pointsObj[2].y - pointsObj[1].y) * (pointsObj[2].y - pointsObj[1].y));
        // d = math.parseToFloat(d, 2);

        points += ' ' + arc.point.x + ',' + arc.point.y;
        polylineInArc.setAttribute('points', points);
      }

      cv.addEventListener('mouseleave', end, false);
    }
    mousemoveDraw = true;
  }

  // Undo last action
  var Undo = function () {
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
  var Redo = function () {
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
  var Clear = function () {
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

  return {
    start: start,
    undo: Undo,
    redo: Redo,
    clear: Clear,
    strokeOpacity: strokeOpacity,
    strokeWidth: strokeWidth,
    strokeColor: strokeColor
  }
})();

// move behaviour of elements - tools/panels/sets
var initMove = (function () {
  var startX = 0, startY = 0, endX = 0, endY = 0;
  var dragParentzIndex = 0; // update only if drag parent is different each dragging time
  var dragParent = dropParent = oldDragParent = null;

  var init = function (draggable, listener) {
    // console.log('init drag')

    var dragAreas = draggable.querySelectorAll('.drag-area');

    if (listener == "add") { // ADD EVENT LISTENERS
      // console.log('adding')


      if (dragAreas.length > 0) { // if `dragArea` is available, use that to drag
        // if(draggable.classList.contains('drag-area')) {
        //   draggable.addEventListener('mousedown', start, false);
        // }
        dragAreas.forEach(function (dragArea) {
          dragArea.addEventListener('mousedown', start, false);
        })
      } else { // otherwise move the element anywhere from with in element
        draggable.addEventListener('mousedown', start, false);
      }
    } else if (listener == "remove") { // REMOVE EVENT LISTENERS
      // console.log('removing')
      if (dragAreas.length > 0) {
        dragAreas.forEach(function (dragArea) {
          dragArea.removeEventListener('mousedown', start, false);
        })
      } else {
        draggable.removeEventListener('mousedown', start, false);
      }
    }
  }

  var start = function (e) {
    // console.log('moveStart');

    var currPoint = math.getMousePosition(e, cv);
    initMove.dragParent = e.target.closest('.draggable');
    var dragParent = initMove.dragParent;
    // var oldDragParent = initMove.oldDragParent;

    // drag only if current element has class 'drag-area'
    if (e.target.classList.contains('drag-area')) {
      // if(e.target.closest('.drag-area')) {

      cvOuter.classList.add('dragging');

      startX = currPoint.x;
      startY = currPoint.y;

      if (dragParent != initMove.oldDragParent) {
        dragParent.style.zIndex = ++initMove.dragParentzIndex;
      }
      initMove.oldDragParent = initMove.dragParent;

      // update current geometry set type
      if (dragParent.dataset.panelSet) {
        initTools.currSetType = dragParent.dataset.panel;
      }

      // get coordinates of nearby draggable cubes
      if (dragParent.classList.contains('draggable-cubes')) {
        initCubes.getCoords();
      }

      cvOuter.addEventListener('mousemove', move, false);
      cvOuter.addEventListener('mouseup', end, false);
      dragParent.addEventListener('dragstart', initDrag.start, false);
    }

    // bring TRASH can on top if sealType is present
    if (dragParent.dataset.sealType) {
      initPanel.trashPanel(e, 'start', dragParent.dataset.sealType);
    }
  }

  var move = function (e) {
    // console.log('move')
    e.preventDefault();

    var currPoint = math.getMousePosition(e, cv);
    var dragParent = initMove.dragParent;

    // calculate the new cursor position:
    endX = startX - currPoint.x;
    endY = startY - currPoint.y;
    startX = currPoint.x;
    startY = currPoint.y;

    // set the element's new position:
    dragParent.style.left = (dragParent.offsetLeft - endX) + "px";
    if (dragParent == toolsUniverse) {
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

    // highlight TRASH cubes if mouse is in
    if (dragParent.dataset.sealType) {
      initPanel.trashPanel(e, 'move');
    }
  }

  var end = function (e) {
    // console.log('moveEnd')
    e.preventDefault();

    var dragParent = initMove.dragParent;

    cvOuter.classList.remove('dragging');

    // snap cubes if in range
    if (dragParent.classList.contains('draggable-cubes')) {
      if (initCubes.shortestDist != null && initCubes.shortestDist < initCubes.snapDist) {
        initCubes.snap();
        initCubes.shortestDist = null;
      }
    }
    // initCubes.isSnapping = false;

    // delete dragParent if dropped on TRASH panel
    if (dragParent.dataset.sealType) {
      if (initPanel.trashPanel(e, 'end')) {
        dragParent.remove();
      }
    }

    // dragParent.classList.remove('detach');

    cvOuter.removeEventListener('mousemove', move, false);
    cvOuter.removeEventListener('mouseup', end, false);
    dragParent.removeEventListener('dragstart', initDrag.start, false);
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
var initDrag = (function () {
  var dragEloffsetX, dragEloffsetY;
  var draggablesId = 0;
  var dropElHeight = 0;
  var dragParent = null;

  var start = function (e) {
    // console.log('dragStart');

    dragEloffsetX = e.offsetX;
    dragEloffsetY = e.offsetY;
    e.dataTransfer.setData("src", e.target.src);
    e.dataTransfer.setData("width", e.target.getBoundingClientRect().width);
    e.dataTransfer.setData("height", e.target.getBoundingClientRect().height);
    e.dataTransfer.setData("sealType", e.target.dataset.sealType);
    if (e.target.dataset.numberDesign) {
      e.dataTransfer.setData("sealDesign", e.target.dataset.numberDesign);
      e.dataTransfer.setData("sealValue", e.target.dataset.numberValue);
    }

    cvOuter.addEventListener('dragenter', enter, false);
    cvOuter.addEventListener('dragleave', leave, false);
    cvOuter.addEventListener('dragover', over, false);
    cvOuter.addEventListener('drop', drop, false);
  }
  var enter = function (e) { e.preventDefault(); }
  var leave = function (e) { e.preventDefault(); }
  var over = function (e) {
    e.preventDefault();
    cvOuter.classList.add('dropping');
  }
  var drop = function (e) {
    // console.log('drop');
    e.preventDefault();

    var sealType = e.dataTransfer.getData('sealType');
    var src = e.dataTransfer.getData('src');
    var width = e.dataTransfer.getData('width');
    var height = e.dataTransfer.getData('height');
    var numberDesign = e.dataTransfer.getData("sealDesign");
    var numberValue = e.dataTransfer.getData("sealValue");

    cvOuter.classList.remove('dropping');

    var totalSealsAllowed = sealTypes[sealType]['max'];
    var totalSealsPlaced = document.querySelectorAll('[data-seal-type="' + sealType + '"].dropped-seal').length;

    if (totalSealsPlaced < totalSealsAllowed) {
      var draggable;
      if (sealType == "cubes" || sealType == "numbers") { // generate new draggable group
        draggable = document.createElement('div');
        draggable.classList.add('draggable-cubes');
        draggable.setAttribute('data-seal-type', sealType);
        if (sealType == 'numbers') {
          draggable.setAttribute('data-number-design', numberDesign);
          draggable.setAttribute('data-number-value', numberValue);
        }
        draggable.innerHTML = `
          <div class="cube-outer drag-area" data-index="0" data-seal-type="${sealType}">
            <div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
          </div>
          <div class="dot dot-top"></div>
          <div class="dot dot-bottom"></div>
          <div class="dot dot-left"></div>
          <div class="dot dot-right"></div>
          <div class="detach-btn"></div>
          `;

        draggable.addEventListener('dblclick', initCubes.remove, false);
        // draggable.addEventListener('click', initCubes.detach, false);
        draggable.addEventListener('click', initCubes.detachUI, false);
      } else { // generate a seal
        draggable = document.createElement('img');
        draggable.src = src;
        draggable.width = width;
        draggable.height = height;
        draggable.classList.add('dropped-seal');
        draggable.classList.add('drag-area');
        draggable.setAttribute('data-seal-type', sealType);

        draggable.addEventListener('dblclick', (e) => { draggable.remove(); }, false);
      }

      draggable.setAttribute('data-id', ++initDrag.draggablesId);
      draggable.style.zIndex = ++initMove.dragParentzIndex;
      draggable.style.left = e.offsetX - dragEloffsetX + 'px';
      draggable.style.top = e.offsetY - dragEloffsetY + 'px';
      draggable.classList.add('draggable');

      cvOuter.appendChild(draggable);

      initDrag.dropElHeight = draggable.getBoundingClientRect().height;

      initMove.init(draggable, 'add');

      cvOuter.removeEventListener('dragenter', enter)
      cvOuter.removeEventListener('dragleave', leave)
      cvOuter.removeEventListener('dragover', over)
      cvOuter.removeEventListener('drop', drop)
    } else {
      alert('You can only place max ' + totalSealsAllowed + ' of ' + sealType + ' seal type.');
    }
  }

  return {
    start: start,
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
      if (sealType == "numbers") {
        for (var type in values) {
          // console.log(values[type])
          for (var i = 0; i < values[type].length; i++) {
            // console.log(values[type][i][0], values[type][i][1])
            var numType = values[type][i][0];
            var numValue = values[type][i][1];
            var el = document.createElement('img');
            el.classList.add('draggable-seal');
            el.setAttribute('data-seal-type', sealType);
            el.setAttribute('data-number-design', type);
            el.setAttribute('data-number-value', numValue);
            el.src = './_assets/img/' + numType;
            sealPanelContent.appendChild(el);
          }
        }
      } else {
        values.forEach(value => {
          var el = document.createElement('img');
          el.classList.add('draggable-seal');
          el.setAttribute('data-seal-type', sealType);
          el.src = './_assets/img/' + value;
          sealPanelContent.appendChild(el);
        });
      }
    }
  }
})();

// init panel functions - open/close/drag-panel/drag-seals
var initPanel = (function (e) {
  var panel = oldPanel = panelType = panelBtn = panelPosObj =
      panelCloseBtn = panelScaleFlipBtn = panelScaleBtn = draggableSeals = rotateBtns = null;

  var toggle = function (target) {
    panelType = target.dataset.panelBtn;

    // open panel
    if (!target.classList.contains('active')) {
      // console.log('open panel');

      panel = document.querySelector('[data-panel="' + panelType + '"]');
      panelCloseBtn = panel.querySelector('.close-btn');
      panelScaleBtn = panel.querySelector('.scale-btn');
      panelFlipBtn = panel.querySelector('.flip-btn');
      rotateBtns = panel.querySelectorAll('.rotate-btn');
      panelScaleFlipBtn = panel.querySelector('.scale-flip-btn');
      draggableSeals = panel.getElementsByClassName('draggable-seal');

      target.classList.add('active');
      panel.classList.add('active');
      panel.style.zIndex = ++initMove.dragParentzIndex;

      initMove.dragParent = panel;
      initMove.oldDragParent = panel;

      // ADD EVENT LISTENERS
      panelCloseBtn.addEventListener('click', close, false);
      initMove.init(panel, 'add');
      for (var i = 0; i < draggableSeals.length; i++) {
        draggableSeals[i].addEventListener('dragstart', initDrag.start, false);
      }
      for (var i = 0; i < rotateBtns.length; i++) {
        rotateBtns[i].addEventListener('mousedown', initRotate.start, false);
        if(rotateBtns[i].classList.contains('rotate-compass')) {
          rotateBtns[i].addEventListener('mousedown', initDraw.start, false);
        }
      }
      if (panelScaleBtn) {
        panelScaleBtn.addEventListener('mousedown', initScale.start, false);
      }
      if (panelFlipBtn) {
        panelFlipBtn.addEventListener('click', flip, false);
      }
      if (panelScaleFlipBtn) {
        panelScaleFlipBtn.addEventListener('click', scaleFlip, false);
      }
      if (panelType == "calculator") {
        var buttons = panel.querySelectorAll('[data-button-type]');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener('click', initCalc.calculate, false);
        }
      }
      if (panel.classList.contains('draggable-seal')) {
        panel.addEventListener('click', bringInFront, false);
      }


      // update current geometry set type
      if (panel.dataset.panelSet) {
        initTools.currSetType = panel.dataset.panel;
      }
    } else { // close panel if already open
      close(panelType);
    }
  }
  var close = function (e) {
    // console.log('close panel')

    // clicked on closed button and 'type' property exist
    if (e.type) {
      panel = this.closest('.draggable');
      panelType = panel.dataset.panel;
    } else { // clicked on panel btn itself and called 'closePanel' function so 'e.type' not defined
      panelType = e;
      panel = document.querySelector('[data-panel="' + panelType + '"]');;
    }
    panelBtn = document.querySelector('[data-panel-btn="' + panelType + '"]');
    panelCloseBtn = panel.querySelector('.close-btn');
    panelFlipBtn = panel.querySelector('.flip-btn');
    panelScaleBtn = panel.querySelector('.scale-btn');
    panelScaleFlipBtn = panel.querySelector('.scale-flip-btn');

    draggableSeals = panel.getElementsByClassName('draggable-seal');
    panel.classList.remove('active');
    panelBtn.classList.remove('active');
    rotateBtns = panel.querySelectorAll('.rotate-btn');

    // REMOVE EVENT LISTENERS
    panelCloseBtn.removeEventListener('click', close, false);
    initMove.init(panel, 'remove');
    for (var i = 0; i < draggableSeals.length; i++) {
      draggableSeals[i].removeEventListener('dragstart', initDrag.start, false);
    }
    for (var i = 0; i < rotateBtns.length; i++) {
      rotateBtns[i].removeEventListener('mousedown', initRotate.start, false);
      if (rotateBtns[i].classList.contains('rotate-compass')) {
        rotateBtns[i].removeEventListener('mousedown', initDraw.start, false);
      }
    }
    if (panelScaleBtn) {
      panelScaleBtn.removeEventListener('mousedown', initScale.start, false);
    }
    if (panelFlipBtn) {
      panelFlipBtn.removeEventListener('click', flip, false);
    }    
    if (panelScaleFlipBtn) {
      panelScaleFlipBtn.removeEventListener('click', scaleFlip, false);
    }
    if (panelType == "calculator") {
      var buttons = panel.querySelectorAll('[data-button-type]');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener('click', initCalc.calculate, false);
      }
    }
    if (panel.classList.contains('draggable-seal')) {
      panel.removeEventListener('click', bringInFront, false);
    }
    if(panelType.substr(0,5) == "scale") {
      var secActiveBtns = document.querySelectorAll('[data-tool-group-type="scale"].secondary.active');
      var panelGroupBtn = document.querySelector('[data-tool-group-type="scale"]');
      if(secActiveBtns.length < 1) {
        panelGroupBtn.classList.remove('active');
      }      
    } else if(panelType.substr(0,10) == "set-square") {
      var secActiveBtns = document.querySelectorAll('[data-tool-group-type="set-square"].secondary.active');
      var panelGroupBtn = document.querySelector('[data-tool-group-type="set-square"]');
      if(secActiveBtns.length < 1) {
        panelGroupBtn.classList.remove('active');
      }      
    }

    // update current geometry set type to null
    if (panel.dataset.panelSet) {
      initTools.currSetType = null;
    }
  }
  var bringInFront = function (e) {
    panel = this.closest('.draggable');

    if (oldPanel != panel) {
      panel.style.zIndex = ++initMove.dragParentzIndex;
      // update current geometry set type to the front one
      if (panel.dataset.panelSet) {
        initTools.currSetType = panel.dataset.panel;
      }      
    }
    console.log('changing')
    oldPanel = panel;
  }
  var trashPanel = function (e, mode, sealType) {
    var mousePosObj = math.getMousePosition(e, cv);

    // bring trash can on top if draggin cubes
    if (mode == "start") {
      panel = document.querySelector('[data-panel="' + sealType + '"]');
      var panelPos = panel.getBoundingClientRect();
      panelPosObj = {
        x1: panelPos.left,
        x2: panelPos.left + panelPos.width,
        y1: panelPos.top,
        y2: panelPos.top + panelPos.height
      }
    }

    if (mode == "move") {
      panel.style.zIndex = initMove.dragParentzIndex;
      panel.classList.add('trash');
    }

    // highlight trash cubes if mouse is in
    if (mousePosObj.x > panelPosObj.x1 && mousePosObj.x < panelPosObj.x2 &&
      mousePosObj.y > panelPosObj.y1 && mousePosObj.y < panelPosObj.y2) {
      panel.classList.add('trash-active');
    } else {
      panel.classList.remove('trash-active');
    }

    // delete dragParent if dropped on trash panel
    if (mode == 'end') {
      panel.classList.remove('trash')
      if (panel.classList.contains('trash-active')) {
        panel.classList.remove('trash-active')
        return true;
      } else {
        return false;
      }
    }
  }
  var flip = function(e) {
    // console.log('panel fliping');

    if(panel.classList.contains('flipped')) {
      panel.classList.remove('flipped');
    } else {
      panel.classList.add('flipped');
    }
  }
  var scaleFlip = function(e) {
    console.log('scale flipping');
  }

  return {
    toggle: toggle,
    trashPanel: trashPanel
  }
})();

// cubes/numbers - highlighting/snapping/detaching
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
  var getCoords = function () {
    // console.log('geting Coordingates');

    dragParent = initMove.dragParent;

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
  var getShortestDist = function () {
    // console.log('geting shortest dist');

    var shortestDist = null;
    // console.log(dragParent, dropParent)

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
            dropParent = initMove.dropParent = document.querySelector('[data-id="' + dropCoord + '"');

            // no highlighting if element has already enought cubes in column
            if (snapType == 'vertical') {
              if (dropParent.classList.contains('vertical')) {
                // initCubes.shortestDist = null
              }
            }
            if (snapType == 'horizontal') {
              if (!dragParent.classList.contains('vertical') || !dropParent.classList.contains('vertical')) {
                initCubes.shortestDist = null
              }
            }
          };
        }
      }
    }
    // make 'shortestDist' null if dragParent and dropParent is not of same type
    if(dropParent) {
      if (dragParent.dataset.sealType == 'cubes') {
        if (dragParent.dataset.sealType != dropParent.dataset.sealType) {
          initCubes.shortestDist = null;
        }
      } else if (dragParent.dataset.sealType == 'numbers') {
        if (dragParent.dataset.numberDesign != dropParent.dataset.numberDesign ||
          dragParent.dataset.numberValue != dropParent.dataset.numberValue) {
          initCubes.shortestDist = null;
        }
      }
      if(dragParent.dataset.numberValue == "10000") {
        initCubes.shortestDist = null;
      }
    }
  }
  var highlight = function (flag) {
    if (flag) {
      // console.log('highlighting')
      dragParent.classList.add('highlight');
      dropParent.classList.add('highlight');
    } else {
      dragParent.classList.remove('highlight');
      dropParent.classList.remove('highlight');
    }
  }
  var snap = function () {
    // console.log('snapping');

    var transitionEvent = whichTransitionEvent();

    var sealType = dragParent.querySelector('[data-seal-type]').dataset.sealType;
    var src = dragParent.querySelector('img').src;
    var width = dragParent.querySelector('img').width;
    var height = dragParent.querySelector('img').height;

    // update 'row' and 'col' for numbers sealTypes
    if (sealType == 'numbers') {
      row = 4;
      col = 0;
    }
    cubeLimit = (snapType == "vertical") ? row : col;

    if (snapType == "vertical") {
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
        initMove.dropParent.innerHTML += cubeOuter;
        dropParent = initMove.dropParent;
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
          <div class="detach-btn"></div>     
        `;
        initMove.dropParent.innerHTML = cubeOuter;
        dropParent = initMove.dropParent;
        initMove.init(dropParent, 'add');
      }

      if (snapType == "horizontal") dropParent.classList.add('horizontal');

      totalCubes = dropParent.querySelectorAll('.cube-outer').length;

      // if vertical limit reached
      if (totalCubes == cubeLimit) {
        // console.log('totalCubes == cubeLimit');

        if (sealType == 'numbers') {
          // dropParent.querySelector('.cube-outer').remove();
          for (var r = 0; r < row; r++) {
            dropParent.querySelector('[data-index="' + r + '"]').remove();
          }

          cubeOuter = `
            <div class="cube-outer drag-area" data-index="0" data-seal-type="numbers">
              <div class="cube"><img src="${'_assets/img/number-' + dropParent.dataset.numberDesign + '-' + dropParent.dataset.numberValue * 10 + '.svg'}" style="width: ${width}px; height: ${height}px;"></div>
            </div>        
          `;
          dropParent.classList.remove('vertical');
          dropParent.classList.remove('detach');
          dropParent.setAttribute('data-number-value', dropParent.dataset.numberValue * 10)
          dropParent.innerHTML += cubeOuter;
        } else if (sealType == "cubes") {
          if (snapType == "vertical") {
            // make vertical complete group (layout needs to update)
            cubeOuter = `<div class="cube-outer">`;
            for (var r = 0; r < row; r++) {
              cubeOuter += `<div class="cube drag-area" data-index="${r}" data-seal-type="${sealType}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
            }
            cubeOuter += `
              </div>
              <div class="dot dot-top"></div>
              <div class="dot dot-bottom"></div>
              <div class="dot dot-left"></div>
              <div class="dot dot-right"></div>     
              <div class="detach-btn"></div>
            `;

            initMove.dropParent.innerHTML = cubeOuter;
            dropParent = initMove.dropParent;
            dropParent.classList.add('vertical');
          } else if (snapType == "horizontal") {
            dropParent = initMove.dropParent;
          }
        }

        console.log('limit reached!!!!!!!!!!');
      }
      // console.log(dropParent);
      initMove.init(dropParent, 'add');
      dragParent.remove();
    } else if (totalCubes > cubeLimit) {
      // console.log('totalCubes > cubeLimit');

      var canBeAddedCubes = cubeLimit - dropParentCubeCount;
      var remainingCubes = dragParentCubeCount - canBeAddedCubes;

      if (snapType == "vertical") {
        // make vertical complete group (layout needs to update)
        cubeOuter = `<div class="cube-outer">`;
        for (var r = 0; r < row; r++) {
          cubeOuter += `<div class="cube drag-area" data-index="${r}" data-seal-type="${sealType}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
        }
        cubeOuter += `
          </div>
          <div class="dot dot-top"></div>
          <div class="dot dot-bottom"></div>
          <div class="dot dot-left"></div>
          <div class="dot dot-right"></div>     
          <div class="detach-btn"></div>
        `;

        initMove.dropParent.innerHTML = cubeOuter;
        dropParent = initMove.dropParent;
        dropParent.classList.add('vertical');

        // remove cubes from dragParent
        for (var i = 0; i < canBeAddedCubes; i++) {
          dragParent.querySelector('[data-index="' + (dragParentCubeCount - 1 - i) + '"].cube-outer').remove();
        }

      } else if (snapType == "horizontal") {
        // make horizontal complete group 
        cubeOuter = "";
        for (var c = 0; c < canBeAddedCubes; c++) {
          cubeOuter += `<div class="cube-outer drag-area" data-index="${dropParentCubeCount + c}" data-seal-type="${sealType}">`;
          for (var r = 0; r < row; r++) {
            cubeOuter += `<div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
          }
          cubeOuter += '</div>';
        }
        initMove.dropParent.innerHTML += cubeOuter;
        dropParent = initMove.dropParent;
        // dropParent.classList.remove('vertical');

        if (remainingCubes == 1) {
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
            <div class="detach-btn"></div>
          `;

          initMove.dragParent.innerHTML = cubeOuter;
          dragParent = initMove.dragParent;
          initMove.init(dragParent, 'add');
          dragParent.classList.remove('horizontal');
        } else {
          // remove cubes from dragParent
          for (var i = 0; i < canBeAddedCubes; i++) {
            dragParent.querySelector('[data-index="' + (dragParentCubeCount - 1 - i) + '"].cube-outer').remove();
          }
        }
      }

      initMove.init(dropParent, 'add');


      dragParent.style.left = dragParentLeft;
      dragParent.style.top = dragParentTop;
      initMove.init(dragParent, 'add');
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
  // code logic NOT NEEDED for now 
  var detach = function (e) {
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
      } else if (index) {
        // top
        if (!dragParent.classList.contains('vertical')) { // detaching vertical group when INCOMPLETE
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
          initMove.dragParent.innerHTML = cubeOuter;
          dragParent = initMove.dragParent;
          dragParent.classList.remove('vertical');

          initMove.init(dragParent, 'add');
          dragParent.addEventListener('dblclick', detach, false);
        }

        var left = parseFloat(dragParentLeft);
        var top = parseFloat(dragParentTop) + dragParent.getBoundingClientRect().height + 30;
        // bottom
        var draggable = document.createElement('div');
        draggable.classList.add('draggable-cubes');
        draggable.classList.add('draggable');
        draggable.setAttribute('data-id', ++initDrag.draggablesId);
        draggable.setAttribute('data-seal-type', sealType);
        draggable.style.left = left + 'px';
        draggable.style.top = top + 'px';
        draggable.style.zIndex = ++initMove.dragParentzIndex;

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

        initMove.init(draggable, 'add');
        draggable.addEventListener('dblclick', detach, false);
      } else {
        console.warn("Can't remove from here!");
      }
    } else if (detachType == 'horizontal') { // horizontal detach
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

      if (index) {
        // left
        if (index == 1) {
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

          initMove.dragParent.innerHTML = cubeOuter;
          dragParent = initMove.dragParent;
          initMove.init(dragParent, 'add');
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
        draggable.setAttribute('data-seal-type', sealType);
        draggable.setAttribute('data-id', ++initDrag.draggablesId);
        draggable.style.left = left + 'px';
        draggable.style.top = top + 'px';
        draggable.style.zIndex = ++initMove.dragParentzIndex;

        if (detachCubes == 1) { // detach partion is only 1
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
          for (var c = 0; c < detachCubes; c++) {
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

        initMove.dropParent = draggable;
        // dropParent = initMove.dropParent;

        draggable.classList.add('vertical');
        draggable.innerHTML = cubeOuter;
        cvOuter.appendChild(draggable);

        initMove.init(draggable, 'add');
        draggable.addEventListener('dblclick', detach, false);
      } else {
        console.warn("Can't remove from here!");
      }
    }
  }
  var detachUI = function (e) {
    // console.log('detachUI');

    var dragParentLeft = dragParent.style.left;
    var dragParentTop = dragParent.style.top;
    var left = parseFloat(dragParentLeft);
    // var top = parseFloat(dragParentTop) + dragParent.getBoundingClientRect().height;
    var cubeHeight = dragParent.querySelector('.drag-area').getBoundingClientRect().height;
    var cubeOuter;
    //  console.lo
    var sealType = dragParent.dataset.sealType;
    var src = dragParent.querySelector('img').src;
    var width = dragParent.querySelector('img').width;
    var height = dragParent.querySelector('img').height;    

    if (e.target.classList.contains('detach-btn')) { // detach all cubes
      // console.log('detaching All');

      if (detachType == 'vertical') {
        console.log('vertical detaching all')

        var cubesToDetach = dragParent.querySelectorAll('.drag-area').length;
        // dragParent.querySelector('.detach-btn').remove();

        // top one
        for (var i = 1; i < cubesToDetach; i++) {
          dragParent.querySelector('[data-index="' + i + '"]').remove();
          dragParent.classList.remove('detach')
        }

        // bottom cubes
        for (var i = 1; i < cubesToDetach; i++) {
          var draggable = document.createElement('div');
          draggable.classList.add('draggable-cubes');
          draggable.classList.add('draggable');
          draggable.setAttribute('data-id', ++initDrag.draggablesId);
          draggable.setAttribute('data-seal-type', sealType);
          draggable.style.left = left + 'px';
          draggable.style.top = parseFloat(dragParentTop) + cubeHeight * i + 30 * i + 'px';
          draggable.style.zIndex = ++initMove.dragParentzIndex;
          if(sealType == 'numbers') {
            draggable.setAttribute('data-number-design', dragParent.dataset.numberDesign);
            draggable.setAttribute('data-number-value', dragParent.dataset.numberValue);
          }

          cubeOuter = `
            <div class="cube-outer drag-area" data-index="0" data-seal-type="${sealType}">
            <div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
            </div>        
            <div class="dot dot-top"></div>
            <div class="dot dot-bottom"></div>
            <div class="dot dot-left"></div>
            <div class="dot dot-right"></div>     
            <div class="detach"></div>     
          `;

          draggable.innerHTML = cubeOuter;
          cvOuter.appendChild(draggable);

          initMove.init(draggable, 'add');
          draggable.addEventListener('dblclick', remove, false);
        }

      } else {
        console.log('horizontal detaching all')

      }
    } else { // toggle 'detach-btn'
      if (dragParent.querySelectorAll('.drag-area').length > 1) {
        if (dragParent.classList.contains('detach')) {
          dragParent.classList.remove('detach');
        } else {
          dragParent.classList.add('detach');
        }
      }
    }
  }
  var remove = function (e) {
    // console.log('deleting');

    // delete complete 'draggable' group
    e.target.closest('.draggable').remove();
  }

  return {
    isSnapping: isSnapping,
    snapDist: snapDist,
    shortestDist: shortestDist,
    getCoords: getCoords,
    getShortestDist: getShortestDist,
    highlight: highlight,
    snap, snap,
    detachUI, detachUI,
    remove, remove
  }
})();

// rotate behaviour of tools/widgets/seals
var initRotate = (function () {
  var mousedownRotate = mousemoveRotate = false;
  var startAngle = null;
  var panelRotation = null;
  var rotation = null;
  var rotateBtn = null;
  var rotatable = null;
  var panel;
  var oldPanel = null;
  var panelType = null;
  var d, x, y;
  var oldToolType = null;
  var refPoint = {
    x: 0,
    y: 0
  };
  var R2D = 180 / Math.PI;

  var start = function (e) {
    // console.group('Rotate')
    // console.log('start-rotate');
    
    e.preventDefault();

    mousedownRotate = true;

    var height, left, top, width, refEl;
    rotateBtn = e.target;
    panel = rotateBtn.closest('.draggable');
    panelType = panel.dataset.panel;
    rotatable = rotateBtn.closest('.rotatable');

    // reset 'startAngle' if panel is different each time
    if (oldPanel != panel) {
      startAngle = null;
    }
    oldPanel = panel;

    // cvOuter.classList.add('rotating');

    refEl = rotatable;

    if(panelType == "compass") {
      if(rotateBtn.classList.contains('rotate-compass')) {
        // calling draw function to make an arc
        oldToolType = initTools.currToolType;
        initTools.currToolType = 'arc';
        panel.classList.add('pe-none');
      } else if(rotateBtn.classList.contains('rotate-point') || rotateBtn.classList.contains('rotate-pencil')) {
        refEl = panel.querySelector('.rotate-hand-ref');
      }
    }

    refObj = refEl.getBoundingClientRect();
    
    top = refObj.top,
    left = refObj.left,
    height = refObj.height,
    width = refObj.width;
    
    refPoint = {
      x: left + (width / 2),
      y: top + (height / 2)
    };

    x = e.clientX - refPoint.x;
    y = e.clientY - refPoint.y;


    if(panelType == 'compass') {
      if(rotateBtn.classList.contains('rotate-point') || rotateBtn.classList.contains('rotate-pencil')) {
        if (panel.dataset.angleHand == undefined) {
          startAngle = Math.floor(R2D * Math.atan2(y, x));
          panel.setAttribute('data-angle-hand', startAngle);
        } else {
          startAngle = panel.dataset.angleHand;
        }
      } else if(rotateBtn.classList.contains('btn')) {
        if (panel.dataset.angle == undefined) {
          startAngle = Math.floor(R2D * Math.atan2(y, x));
          panel.setAttribute('data-angle', startAngle);
        } else {
          startAngle = panel.dataset.angle;
        }          
      } else if(rotateBtn.classList.contains('rotate-compass')) {
        if (panel.dataset.angleCompass == undefined) {
          // console.log(1)
          startAngle = Math.floor(R2D * Math.atan2(y, x));
          panel.setAttribute('data-angle-compass', startAngle);
        } else {
          // console.log(2)
          startAngle = panel.dataset.angleCompass;
        }     
        if(panel.dataset.angle) {
          // console.log(3)
          // console.log(startAngle)
          // startAngle += panel.dataset.angle;
        }
      }
    } else {
      if (panel.dataset.angle == undefined) {
        startAngle = Math.floor(R2D * Math.atan2(y, x));
        panel.setAttribute('data-angle', startAngle);
      } else {
        startAngle = panel.dataset.angle;
      }
    }

    cvOuter.addEventListener('mousemove', rotate, false);
    cvOuter.addEventListener('mouseup', end, false);
  };

  var end = function (e) {
    // console.log('end-rotate');
    // console.groupEnd();
    
    mousedownRotate = mousemoveRotate = false
    
    panel.classList.remove('pe-none');
    // cvOuter.classList.remove('rotating');

    initTools.currToolType = oldToolType;

    cvOuter.removeEventListener('mousemove', rotate, false);
    cvOuter.removeEventListener('mouseup', end, false);
  };

  var rotate = function (e) {
    
    if (mousedownRotate && mousemoveRotate) {
      // console.log('rotate');

      e.preventDefault();
  
      x = e.clientX - refPoint.x;
      y = e.clientY - refPoint.y;
      d = Math.floor(R2D * Math.atan2(y, x));
  
      rotation = d - startAngle;
      // console.log(d, startAngle, rotation)
      
      if (panelType == 'clock') {
        rotatable.style.transform = "translateY(-50%) rotate(" + d + "deg)";
      } else if(panelType == "compass") {
        if(rotateBtn.classList.contains('rotate-point')) {
          // if(d > 85) d = 85; else
          // if(d < 50) d = 50;
          // d = d + panelRotation;
          rotatable.style.transform = "translateY(-50%) rotate(" + d + "deg)";
        } else if(rotateBtn.classList.contains('rotate-pencil')) {
          if(d > 130) d = 130; else
          if(d < 95) d = 95;
          rotatable.style.transform = "translateY(-50%) rotate(" + d + "deg)";
        } else if(rotateBtn.classList.contains('rotate-compass')){
          rotatable.style.transform = "rotate(" + rotation + "deg)";
        } else {
          rotatable.style.transform = "rotate(" + rotation + "deg)";
        }
      } else {
        rotatable.style.transform = "rotate(" + rotation + "deg)";
      }
    }

    mousemoveRotate = true;
  };

  return {
    start: start
  }
})();

// scale sets logics
var initScale = (function (e) {
  // console.log('scaling');

  var startPoint, currPoint;
  var panel = document.querySelector('[data-panel="protractor"]');
  var w = null;
  var h = null;
  var d = null;
  var ratio = null;
  
  var start = function (e) {
    // console.log('start');

    w = panel.getBoundingClientRect().width;
    h = panel.getBoundingClientRect().height;
    ratio = w/h;
    startPoint = math.getMousePosition(e, cv);
    // console.log('startPoint: ', startPoint.x)

    cvOuter.addEventListener('mousemove', scale, false);
    cvOuter.addEventListener('mouseup', end, false);
  }
  var scale = function (e) {
    // console.log('scale');
    e.preventDefault();

    currPoint = math.getMousePosition(e, cv);
    d = currPoint.x - startPoint.x;
    // console.log(startPoint.x, currPoint.x, d)

    console.log(w, d, ratio, w+d, w*ratio)
    if(ratio > 1) { // width is more
      panel.style.width = w + d + 'px';
      panel.style.height = h + (d*ratio) + 'px';
    } else { // height is more

    }
  }
  var end = function (e) {
    // console.log('end');

    cvOuter.removeEventListener('mousemove', scale, false);
    cvOuter.removeEventListener('mouseup', end, false);
  }

  return {
    start: start
  }
})()

// calculator logic
var initCalc = (function (e) {

  var num = "";
  var calculate = function (e) {
    // console.log('calculating');

    var result = document.querySelector('[data-panel="calculator"] #result');
    var buttonType = e.target.closest('g[data-button-type]').dataset.buttonType;
    var buttonValue = e.target.closest('g[data-button-type]').dataset.buttonValue;

    if (buttonType == "num") {
      num += buttonValue;
      result.innerHTML = num;
    } else if (buttonType == "func") {
      switch (buttonValue) {
        case "=":
          num = eval(num).toString();
          break;
        case "<-":
          num = num.slice(0, -1);
          break;
        case "c":
        case "ac":
          num = "";
          break;
        case "*":
        case "/":
        case "+":
        case "-":
          num += " " + buttonValue + " ";
          break;
      }
      result.innerHTML = num;
    }
  }

  return {
    calculate: calculate
  }
})();

// abacus logic
var initAbacus = function () {
  window.onload = init
  function init() {
    mousedown = 0;
    body = document.querySelector('body');
    body.addEventListener('mousedown', function () {
      mousedown = 1;
    });
    body.addEventListener('mouseup', function () {
      mousedown = 0;
    });
    upper_part = document.querySelectorAll('.upper_layer');
    upper_part.forEach(function (x) {
      x.addEventListener('click', change_pos.bind(null, event, x));
      x.addEventListener('mousemove', reset_upper_boxes.bind(null, event, x));
    });
    // check = document.querySelector("#Group_389");
    // check.setAttribute('transform','translate(0,-43)');

    lower_part = document.querySelectorAll('.bottom_boxes');
    lower_part.forEach(function (x) {
      x.addEventListener('click', change_pos_lower.bind(null, event, x));
      x.addEventListener('mousemove', reset_lower_boxes.bind(null, event, x));
    });
  }

  function reset_lower_boxes(a, evt, c) {
    column_id = evt.parentNode.getAttribute('id');
    boxes = document.querySelectorAll('#' + column_id + ' .bottom_boxes');
    if (mousedown) {
      if (evt.dataset.state == "up") {
        for (i = 0; i <= 3; ++i) {
          boxes[i].setAttribute('transform', 'translate(0,0)');
          boxes[i].dataset.state = "down";
        }
      }
    }
  }

  function reset_upper_boxes(a, evt, c) {
    if (mousedown) {
      evt.setAttribute('transform', 'translate(0,0)');
    }
  }

  function change_pos_lower(a, evt, c) {
    column_id = evt.parentNode.getAttribute('id');
    boxes = document.querySelectorAll('#' + column_id + ' .bottom_boxes');
    till = evt.dataset.pos;
    if (evt.dataset.state == "down") {
      for (i = 0; i <= till; ++i) {
        boxes[i].setAttribute('transform', 'translate(0,-43)');
        boxes[i].dataset.state = "up";
      }
    }
    else {
      for (i = till; i <= 3; ++i) {
        boxes[i].setAttribute('transform', 'translate(0,0)');
        boxes[i].dataset.state = "down";
      }
    }
  }

  function change_pos(a, evt, c) {
    evt.style.background = 'red';
    if (evt.dataset.pos == "down") {
      evt.setAttribute('transform', 'translate(0,-20)');
      evt.dataset.pos = "up";
    }
    else {
      evt.setAttribute('transform', 'translate(0,0)');
      evt.dataset.pos = "down";
    }
  }

}
// initAbacus();

// math functions - mostly trigonometry
var math = (function(e) {
  var toolDrawingOffset = 50;
  var slope = 0;
  var inRange = false;

  var parseToFloat = function(number, decimal) {
    return parseFloat(number.toFixed(decimal));
  }

  // returns 'left' and 'right' position of given element
  var getElPosition = function(el) {
    var pos = {
      left: el.getBoundingClientRect().left,
      right: el.getBoundingClientRect().top
    };
    return pos;
  }

  // returns the mouse position w.r.t given element
  var getMousePosition = function(e, el) {
    var pos = getElPosition(el);
    var point = {
      x: 0,
      y: 0
    };
    point.x = parseFloat((((e.type == 'touchstart' || e.type == 'touchmove') ? e.touches[0].clientX : e.clientX) - pos.left).toFixed(2));
    point.y = parseFloat((((e.type == 'touchstart' || e.type == 'touchmove') ? e.touches[0].clientY : e.clientY) - pos.right).toFixed(2));
    return point;
  }

  // not useing for now
  var getLineEquation = function() {
    // var m = slope;
    // // y - y1 = m (x - x1) || mx - y + y1 - mx1 = 0
    // // return `y-${lines.l12.p1.y} = ${m} (x-${lines.l12.p1.x})`;
    // // y - mx = y1 - m*x1
    // return `y - ${m}x = ${lines.l12.p1.y - (m * lines.l12.p1.x)}`;
  }

  // get points coordinates with in the set
  var getSetPoints = function(currSetType) {
    var pointsObj = {};
    var set = document.querySelector('[data-panel="'+currSetType+'"]');
    var pointsEl = set.querySelectorAll('.point');
    var canvasPosition = getElPosition(cv);
    for (let i = 0; i < pointsEl.length; i++) {
      var pointObj = {
        x: '',
        y: ''
      };
      var cvLeft = canvasPosition.left;
      var cvTop = canvasPosition.right;
      var pointLeft = pointsEl[i].getBoundingClientRect().left;
      var pointTop = pointsEl[i].getBoundingClientRect().top;
      var pointWidth = pointsEl[i].getBoundingClientRect().width;
      var pointHeight = pointsEl[i].getBoundingClientRect().height;
  
      pointObj['x'] = parseFloat((pointLeft + (pointWidth / 2) - cvLeft).toFixed(2));
      pointObj['y'] = parseFloat((pointTop + (pointHeight / 2) - cvTop).toFixed(2));
      pointsObj[i + 1] = pointObj;
    }
    return pointsObj;
  }

  var getLines = function(e) {
    var lines = {};
    var pointsObj = math.getSetPoints(initTools.currSetType);

    var pointsLength = Object.size(pointsObj);
  
    for (let i = 1; i <= pointsLength; i++) {
      var j = (i == pointsLength) ? 1 : i + 1;
      var line = {
        'p1': pointsObj[i],
        'p2': pointsObj[j]
      };
      lines['l' + i + j] = line;
    }
    return lines;
  }

  var getSlope = function(line) {
    // m = (y2 - y1) / (x2 - x1)
    var m = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
    return math.parseToFloat(m, 2);
  }
  
  var calculatePerpendicularDistFromLine = function(line, point, m) {
    if (m == Infinity || m == -Infinity) return Math.abs(line.p1.x - point.x);
    return Math.abs((m * point.x - point.y + line.p1.y - m * line.p1.x) / (Math.sqrt(1 + m * m)));
  }

  var getCoords = function(pointsObj, side, point, m) {
    // console.log('getCoord');

    // y = m (x - x1) + y1
    // y = m (x - x2) + y2
    // console.log('Eq1: ', `y = ${m}(x - ${startPoint.x}) + ${startPoint.y}`)
    // console.log('Eq2: ', `y = ${-1/m}(x - ${currPoint.x}) + ${currPoint.y}`)    

    // x coordinate of intersection of two lines
    // var x = (m * (y2 - y1) + m * m * x1 - x2) / ((m * m) + m)

    var x, y, _x;
    var s = initDraw.strokeWidth/2;
    
    if (m == 0) {
      if(side == 1) {
        s = (pointsObj[1].x < pointsObj[3].x) ? -s : s;
      } else {
        s = (pointsObj[1].x < pointsObj[3].x) ? s : -s;
      }
      x = point.x;
      y = pointsObj[side].y + s;
    } else if (m == Infinity || m == -Infinity) {
      if(side == 1) {
        s = (pointsObj[1].x < pointsObj[3].x) ? -s : s;
      } else {
        s = (pointsObj[1].x < pointsObj[3].x) ? s : -s;
      }
      x = pointsObj[side].x + s;
      y = point.y;
    } else {
      // points coords on scale
      x1 = ((point.x / m) + (m * pointsObj[side].x) + point.y - pointsObj[side].y) / (m + (1 / m));
      y1 = m * (x1 - pointsObj[side].x) + pointsObj[side].y;
      
      // points coords modified as per stroke width
      m = -1/m;
      if(pointsObj[1].x > pointsObj[4].x) {
        if(side == 1) {
          x = x1 + Math.sqrt((s*s)/(1+m*m)); 
        } else if(side == 3) {
          x = x1 - Math.sqrt((s*s)/(1+m*m)); 
        }
        y = m*(x-x1)+y1
      } else {
        if(side == 1) {
          x = x1 - Math.sqrt((s*s)/(1+m*m)); 
        } else if(side == 3) {
          x = x1 + Math.sqrt((s*s)/(1+m*m)); 
        }
        y = m*(x-x1)+y1
      }
    }
    // console.log(`side: ${side} m: ${m}`)

    return {
      x: x,
      y: y
    }
  }

  var sideAndRange = function(currPoint) {
    var lines = getLines();

    // to check if point is between parallel lines
    // d = (x−x1)(y2−y1)−(y−y1)(x2−x1)
    var check12 = (currPoint.x - (lines.l12.p1.x)) * (lines.l12.p2.y - lines.l12.p1.y) - (currPoint.y - lines.l12.p1.y) * (lines.l12.p2.x - lines.l12.p1.x);
    var check34 = (currPoint.x - (lines.l34.p1.x)) * (lines.l34.p2.y - lines.l34.p1.y) - (currPoint.y - lines.l34.p1.y) * (lines.l34.p2.x - lines.l34.p1.x);
  
    var check23 = (currPoint.x - (lines.l23.p1.x)) * (lines.l23.p2.y - lines.l23.p1.y) - (currPoint.y - lines.l23.p1.y) * (lines.l23.p2.x - lines.l23.p1.x);
    var check41 = (currPoint.x - (lines.l41.p1.x)) * (lines.l41.p2.y - lines.l41.p1.y) - (currPoint.y - lines.l41.p1.y) * (lines.l41.p2.x - lines.l41.p1.x);
  
    var isInBtwParallelLines = ((check12 < 0 && check34 < 0) || (check12 > 0 && check34 > 0) || (check23 < 0 && check41 < 0) || (check23 > 0 && check41 > 0)) ? true : false;
  
    var line;
    var perpendicularDist;
    var side = '';
    // to check if point lies between parallel lines
    if (isInBtwParallelLines) {
      line = ((check12 < 0 && check34 < 0) || (check12 > 0 && check34 > 0)) ? '12_34' : '23_41';
      // checking nearest line
      if (line == '12_34') {
        slope = getSlope(lines.l23);
        var d23 = calculatePerpendicularDistFromLine(lines.l23, currPoint, slope);
        var d41 = calculatePerpendicularDistFromLine(lines.l41, currPoint, slope);
        if (d23 < d41) {
          perpendicularDist = d23;
          nearestLine = lines.l23
          side = 2;
          startPoint = currPoint;
        } else {
          perpendicularDist = d41;
          nearestLine = lines.l41;
          side = 4;
        }
      } else {
        slope = getSlope(lines.l12);
        var d12 = calculatePerpendicularDistFromLine(lines.l12, currPoint, slope);
        var d34 = calculatePerpendicularDistFromLine(lines.l34, currPoint, slope);
        if (d12 < d34) {
          perpendicularDist = d12;
          nearestLine = lines.l12;
          side = 1;
        } else {
          perpendicularDist = d34;
          nearestLine = lines.l34
          side = 3;
        }
      }
      if (toolDrawingOffset >= perpendicularDist) {
        if(side == 1 || side == 3) {
          inRange = true;
        } else {
          inRange = false;
        }
      } else {
        // make it false if not drawing
        // if (!isDrawingModeOn) 
        inRange = false;
      }
    } else {
      // if (!isDrawingModeOn) 
      inRange = false;
    }

    // just for debugging
    // console.log(perpendicularDist, toolDrawingOffset)
    // console.log('inRange, side, slope: ', inRange, side, math.slope);

    return {
      inRange: inRange,
      side: side,
      slope, slope
    }
  }  

  return {
    parseToFloat: parseToFloat,
    getMousePosition: getMousePosition,
    sideAndRange: sideAndRange,
    getSetPoints: getSetPoints,
    getCoords: getCoords
  }
})();

// document.querySelector('[data-tool-type1="pen"]').click();