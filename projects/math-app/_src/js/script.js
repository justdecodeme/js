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

// Returns Y coordinate by putting x coordinate in circle 
// with radius r & center (cX, cY) with given position of pencil nib
function getYCoordinateCircle(x, curY, cX, cY, r) {
  var expr;
  if (r * r < (x - cX) * (x - cX)) expr = 0;
  else expr = Math.sqrt(r * r - (x - cX) * (x - cX));
  if (curY > cY) {
    return cY + expr;
  }
  else {
    return cY - expr;
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
      cv.removeEventListener('touchstart', initDraw.start, false);
    }
    // add 'active' class to current 'clicked' button if it is not the 'active' button already
    // and update 'currToolType' value
    if (oldToolBtn != target) {
      target.classList.add('active');
      initTools.currToolType = target.dataset.toolType1;
      cv.addEventListener('mousedown', initDraw.start, false);
      cv.addEventListener('touchstart', initDraw.start, false);
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
        if (toolGroupType == 'scale') {
          var scaleSecActiveBtns = document.querySelectorAll('[data-tool-group-type="scale"].secondary.active');
        } else if (toolGroupType == "set-square") {
          var scaleSecActiveBtns = document.querySelectorAll('[data-tool-group-type="set-square"].secondary.active');
        }
        if (scaleSecActiveBtns.length > 0) {
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

// fetch seals from 'settings.json' file
var fetchSeals = (function () {
  // console.log('fetching seals');

  for (var sealType in sealTypes) {
    var sealPanelContent = document.querySelector('[data-panel="' + sealType + '"] .content');
    if (sealTypes.hasOwnProperty(sealType)) {
      var values = sealTypes[sealType].values;
      if (sealType == "numbers") { // numbers
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
      }
      if (sealType == "cubes") { // cubes
        for (var i = 0; i < values.length; i++) {
          var cubeSide = values[i][1];
          var cubeValue = values[i][2];
          var el = document.createElement('img');
          el.classList.add('draggable-seal');
          el.setAttribute('data-seal-type', sealType);
          el.setAttribute('data-cube-side', cubeSide);
          el.setAttribute('data-cube-value', cubeValue);
          el.src = './_assets/img/' + values[i][0];
          sealPanelContent.appendChild(el);
        }
      } 
      if(sealType != 'numbers' && sealType != "cubes") {
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
    'dotRadius': 2
  };
  var protractorRange = 100;
  var protractorDotRadius = 10;
  var currSet = null;
  var pointCount = 0;
  var isSetActive = false;

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

    startPoint = math.getMousePosition(e, cv);
    currId = 'shape' + index;
    currToolType = initTools.currToolType;
    currSetType = initTools.currSetType;

    if(currSetType && currToolType == "pen") { // remove highlight if 'tool pen' is not active for normal draw
      currSet = document.querySelector('[data-panel="'+currSetType+'"]');
      if(!currSet.querySelector('.pen-btn').classList.contains('active')) {
        currSet.classList.remove('highlight');
        currSetType = initTools.currSetType = null;
      }
    }

    if (currSetType) { // if some set is present on canvas
      currSet = document.querySelector('[data-panel="' + currSetType + '"]');
      if(currSetType != "compass") {
        isSetActive = currSet.querySelector('.pen-btn').classList.contains('active');
      } else {
        isSetActive = true;
      }
      if(isSetActive) {
        if (currSetType.substr(0, 5) == "scale") {
          pointsObj = math.getSetPoints(initTools.currSetType);
  
          // check if drawing point is inRange with currentSetType
          inRangeObj = math.sideAndRange(startPoint);
          inStartedInRange = inRangeObj.inRange;
          m = inRangeObj.slope;
  
          // update starting coordinates of drawing if set is in range
          if (inStartedInRange) {
            var s = strokeWidth / 2;
            targetPoint = math.getCoords(pointsObj, inRangeObj.side, startPoint, m);
            startPoint.x = targetPoint.x;
            startPoint.y = targetPoint.y;

            // draw line if already two points are there
            if(pointCount == 2) {
              polylineTag = '<polyline class="drawing" id="' + currId + '" style="opacity:' + strokeOpacity + ';fill:none;stroke-linecap:round;stroke:' + strokeColorPen + ';stroke-width:' + strokeWidthPen + '" points="' + startPoint.x + ',' + startPoint.y + '" />';
              cv.innerHTML += polylineTag;
              pointCount++;
            } else if(pointCount < 2) { // mark 2 points for scale drawing
              arcTag = `<ellipse 
                class="drawing" 
                id="${currId}" 
                style="fill:${strokeColorPen};
                stroke-width:0;
                stroke:none;" 
                cx="${startPoint.x}px" 
                cy="${startPoint.y}px" 
                rx="${s}px" 
                ry="${s}px">
                </ellipse>`;
              cv.innerHTML += arcTag;  
              pointCount++;
              if(pointCount == 2) {
                currSet.querySelector('.scale').style.transform = 'rotateZ(180deg)';
              }
            }
          }
        } else if (currSetType == 'compass' && currToolType == "arc") {
          pointsObj = math.getSetPoints(currSetType);
  
          arc.center.x = pointsObj[1].x;
          arc.center.y = pointsObj[1].y;
          startPoint.x = pointsObj[2].x;
          startPoint.y = pointsObj[2].y;
  
          arc.radius = Math.sqrt((pointsObj[2].x - pointsObj[1].x) * (pointsObj[2].x - pointsObj[1].x) + (pointsObj[2].y - pointsObj[1].y) * (pointsObj[2].y - pointsObj[1].y));
          arc.radius = math.parseToFloat(arc.radius, 2);
  
          arcTag = `<g class="drawing" id="${currId}">
              <ellipse style="fill:${strokeColorPen};stroke-width:0;stroke:none;" cx="${arc.center.x}px" cy="${arc.center.y}px" rx="${arc.dotRadius}px" ry="${arc.dotRadius}px"></ellipse>
              <polyline style="fill:none;stroke-linecap:round;stroke:${strokeColorPen};stroke-width:3" points="${startPoint.x},${startPoint.y} "></polyline>
            </g>`;
          cv.innerHTML += arcTag;
        } else if (currSetType == 'protractor') {
          pointsObj = math.getSetPoints(currSetType);
          m = Math.atan2(startPoint.y - pointsObj[1].y, startPoint.x - pointsObj[1].x);
          var panel = document.querySelector('[data-panel="protractor"]');
          var r = panel.offsetHeight;
          var d = Math.sqrt((pointsObj[1].x - startPoint.x) * (pointsObj[1].x - startPoint.x) + (pointsObj[1].y - startPoint.y) * (pointsObj[1].y - startPoint.y));
          var s = protractorDotRadius / 2;
          var angleDeg = Math.atan2(startPoint.y - pointsObj[1].y, startPoint.x - pointsObj[1].x) * 180 / Math.PI;
          var drawDot = false;
  
          if (angleDeg < 0) {
            angleDeg = 360 - Math.abs(angleDeg);
          }
  
          var angle = panel.style.transform.substr(7);
          angle = angle.substring(0, angle.length - 4);
          angle = parseFloat(angle);
          if (isNaN(angle)) {
            angle = 0;
          }
  
          if(d > r && d < r + protractorRange) {
            if (angle <= 180) {
              if (angleDeg <= angle || angleDeg >= 180 + angle) {
                drawDot = true;
              } else {
                drawDot = false;
              }
            } else {
              angle -= 180;
              if (angleDeg >= angle && angleDeg < 180 + angle) {
                drawDot = true;
              } else {
                drawDot = false;
              }
            }
          }
  
  
          if (drawDot) {
            var x = pointsObj[1].x + (r + s) * Math.cos(m);
            var y = pointsObj[1].y + (r + s) * Math.sin(m);
  
            arcTag = `<ellipse 
                  class="drawing" 
                  style="fill:${strokeColorPen};
                  stroke-width:0;
                  stroke:none;" 
                  cx="${x}px" 
                  cy="${y}px" 
                  rx="${s}px" 
                  ry="${s}px">
                </ellipse>`;
            cv.innerHTML += arcTag;
          } else {
            console.log('out of range')
          }
  
        }
      }
    } else if (currToolType == "pen" || currToolType == "marker") { // normal drawing
      if (currToolType == "pen") {
        polylineTag = '<polyline class="drawing" id="' + currId + '" style="opacity:' + strokeOpacity + ';fill:none;stroke-linecap:round;stroke:' + strokeColorPen + ';stroke-width:' + strokeWidthPen + '" points="' + startPoint.x + ',' + startPoint.y + '" />';
      } else if (currToolType == "marker") {
        polylineTag = '<polyline class="drawing" id="' + currId + '" style="fill:none;stroke-linecap:round;stroke:' + strokeColorMarker + ';stroke-width:' + strokeWidthMarker + '" points="' + startPoint.x + ',' + startPoint.y + '" />';;
      }
      cv.innerHTML += polylineTag;
    }

    cv.addEventListener('mousemove', draw, false);
    cv.addEventListener('mouseup', end, false);
    cv.addEventListener('touchmove', draw, false);
    cv.addEventListener('touchend', end, false);

    index++;
  }

  // stop drawing or erasing
  var end = function () {
    // console.log('end-draw')
    // console.groupEnd();

    mousedownDraw = mousemoveDraw = false;
    inStartedInRange = false;

    if(currSetType) {
      if(currSetType.substr(0, 5) == "scale" && pointCount == 3) {
        pointCount = 0;
        currSet.querySelector('.scale').style.transform = 'none';
      }
    }

    if (currId !== null && document.getElementById(currId) != null) {
      undoStack.push({
        Elements: [],
        Id: currId,
        Action: 'draw'
      });
    }

    cv.removeEventListener('mousemove', draw, false);
    cv.removeEventListener('mouseup', end, false);
    cv.removeEventListener('touchmove', draw, false);
    cv.removeEventListener('touchend', end, false);
    // cv.removeEventListener('mouseleave', end, false);
  }

  // keep drawing or erasing
  var draw = function (e) {
    if (mousedownDraw && mousemoveDraw) {
      console.log('draw');

      e.preventDefault();

      currPoint = math.getMousePosition(e, cv);

      if(currToolType == "eraser") {
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
      } else if (currSetType && isSetActive) {
        if (currSetType == 'compass' && currToolType == "arc") {
          arcTag = document.getElementById(currId);
          var polylineInArc = arcTag.querySelector('polyline');
          points = polylineInArc.getAttribute('points');
          pointsObj = math.getSetPoints(initTools.currSetType);

          // draw a perfect circle
          var p1x = startPoint.x;
          var p1y = startPoint.y;
          var p2x = pointsObj[2].x;
          var p2y = pointsObj[2].y;
          var cx = arc.center.x;
          var cy = arc.center.y;
          var r = arc.radius;

          if ((p2y - cy) * (p1y - cy) > 0) {
            if (p2x >= p1x) {
              for (let i = p1x; i <= p2x; i += 0.5) {
                var yCoor = getYCoordinateCircle(i, p2y, cx, cy, r);
                points += ' ' + i + ',' + yCoor;
              }
            }
            else {
              for (let i = p1x; i >= p2x; i -= 0.5) {
                var yCoor = getYCoordinateCircle(i, p2y, cx, cy, r);
                points += ' ' + i + ',' + yCoor;
              }
            }
          }
          else {
            if (p1x >= cx && p2x >= cx) {
              for (let i = p1x; i <= cx + r; i += 0.5) {
                var yCoor = getYCoordinateCircle(i, p1y, cx, cy, r);
                points += ' ' + i + ',' + yCoor;
              }
              for (let i = cx + r; i >= p2x; i -= 0.5) {
                var yCoor = getYCoordinateCircle(i, p2y, cx, cy, r);
                points += ' ' + i + ',' + yCoor;
              }
            }
            else if (p1x < cx && p2x < cx) {
              for (let i = p1x; i >= cx - r; i -= 0.5) {
                var yCoor = getYCoordinateCircle(i, p1y, cx, cy, r);
                points += ' ' + i + ',' + yCoor;
              }
              for (let i = cx - r; i <= p2x; i += 0.5) {
                var yCoor = getYCoordinateCircle(i, p2y, cx, cy, r);
                points += ' ' + i + ',' + yCoor;
              }
            }
            else {
              if (p1y <= cy) {
                for (let i = p1x; i <= cx + r; i += 0.5) {
                  var yCoor = getYCoordinateCircle(i, p1y, cx, cy, r);
                  points += ' ' + i + ',' + yCoor;
                }
                for (let i = cx + r; i >= p2x; i -= 0.5) {
                  var yCoor = getYCoordinateCircle(i, p2y, cx, cy, r);
                  points += ' ' + i + ',' + yCoor;
                }
              }
              else {
                for (let i = p1x; i >= cx - r; i -= 0.5) {
                  var yCoor = getYCoordinateCircle(i, p1y, cx, cy, r);
                  points += ' ' + i + ',' + yCoor;
                }
                for (let i = cx - r; i <= p2x; i += 0.5) {
                  var yCoor = getYCoordinateCircle(i, p2y, cx, cy, r);
                  points += ' ' + i + ',' + yCoor;
                }
              }
            }
          }

          startPoint.x = p2x;
          startPoint.y = p2y;

          polylineInArc.setAttribute('points', points);
        } else if (currSetType.substr(0, 5) == "scale" && pointCount == 3) {
          if (inStartedInRange) { // if set is in range
            polylineTag = document.getElementById(currId);
            points = polylineTag.getAttribute('points');
            // to check if cursor went outside of range
            inRangeObj = math.sideAndRange(currPoint);

            if (inRangeObj.inRange) { // if drawing on same side 
              targetPoint = math.getCoords(pointsObj, inRangeObj.side, currPoint, m);

              currPoint.x = targetPoint.x;
              currPoint.y = targetPoint.y;

              points += ' ' + currPoint.x + ',' + currPoint.y;
            } else { // else stop drawing
              // cv.removeEventListener('mousemove', draw, false);
              // cv.removeEventListener('mouseup', end, false);
            }
            polylineTag.setAttribute('points', points);
          }
        }
      } else if (currToolType == "pen" || currToolType == "marker") {
        polylineTag = document.getElementById(currId);
        points = polylineTag.getAttribute('points');

        if (currToolType == "marker") {
          points = startPoint.x + ',' + startPoint.y + ' ' + currPoint.x + ',' + currPoint.y;
        } else if (currToolType == "pen") {
          points += ' ' + currPoint.x + ',' + currPoint.y;
        }
        polylineTag.setAttribute('points', points);
      }

      // cv.addEventListener('mouseleave', end, false);
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
  var mousedownMove = mousemoveMove = false;
  var mousemove = false;
  var target = null;
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
          dragArea.addEventListener('touchstart', start, false);
        })
      } else { // otherwise move the element anywhere from with in element
        draggable.addEventListener('mousedown', start, false);
        draggable.addEventListener('touchstart', start, false);
      }
    } else if (listener == "remove") { // REMOVE EVENT LISTENERS
      // console.log('removing')s
      if (dragAreas.length > 0) {
        dragAreas.forEach(function (dragArea) {
          dragArea.removeEventListener('mousedown', start, false);
          dragArea.removeEventListener('touchstart', start, false);
        })
      } else {
        draggable.removeEventListener('mousedown', start, false);
        draggable.removeEventListener('touchstart', start, false);
      }
    }
  }

  var start = function (e) {
    // console.group('Move');
    // console.log('start-move');
    
    e.preventDefault();
    
    initMove.mousemove = false
    mousedownMove = true;

    var currPoint = math.getMousePosition(e, cv);
    target = e.target;
    initMove.dragParent = target.closest('.draggable');
    var dragParent = initMove.dragParent;

    // for moving from any inner area of 'drag-area' element
    if (dragParent.dataset.panel == "compass" || dragParent.dataset.panel == "clock") {
      target = this;
    }
    // drag only if current element has class 'drag-area'
    if (target.classList.contains('drag-area')) {
      // if(e.target.closest('.drag-area')) {

      cvOuter.classList.add('dragging');

      startX = currPoint.x;
      startY = currPoint.y;

      // update z-index of dragParent
      if (dragParent != initMove.oldDragParent) {
        dragParent.style.zIndex = ++initMove.dragParentzIndex;
      }
      initMove.oldDragParent = initMove.dragParent;

      // update current geometry set type and remove any highlighted panel if any
      if (dragParent.dataset.panelSet && dragParent.dataset.panelSet != "compass") {
        var highlightPanel = document.querySelector('.draggable-set.highlight');
        console.log(dragParent.dataset.panelSet)
        if (highlightPanel) {
          highlightPanel.classList.remove('highlight');
          highlightPanel.querySelector('.pen-btn').classList.remove('active');
        }
        initTools.currSetType = dragParent.dataset.panel;
        dragParent.classList.add('highlight');
      }


      // get coordinates of nearby draggable cubes
      if (dragParent.classList.contains('draggable-cubes')) {
        initCubes.getCoords();
      }

      cvOuter.addEventListener('mousemove', move, false);
      cvOuter.addEventListener('touchmove', move, false);
      cvOuter.addEventListener('mouseup', end, false);
      cvOuter.addEventListener('touchend', end, false);
      // dragParent.addEventListener('dragstart', initDrag.start, false);
      // dragParent.addEventListener('touchstart', initDrag.start, false);
    }
    // bring TRASH can on top if sealType is present
    if (dragParent.dataset.sealType) {
      initPanel.trashPanel(e, 'start', dragParent.dataset.sealType);
    }
  }

  var end = function (e) {
    // console.log('end-move')
    // console.groupEnd();

    mousedownMove = mousemoveMove = false

    var dragParent = initMove.dragParent;

    cvOuter.classList.remove('dragging');

    // snap cubes if in range
    if (dragParent.classList.contains('draggable-cubes')) {
      if (initCubes.snapInfo.shortestDist != null && initCubes.snapInfo.shortestDist < initCubes.snapDist) {
        initCubes.snap();
        initCubes.snapInfo.shortestDist = null;
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
    cvOuter.removeEventListener('touchmove', move, false);
    cvOuter.removeEventListener('mouseup', end, false);
    cvOuter.removeEventListener('touchend', end, false);
    // dragParent.removeEventListener('dragstart', initDrag.start, false);
    // dragParent.removeEventListener('touchstart', initDrag.start, false);
  }

  var move = function (e) {
    if (mousedownMove && mousemoveMove) {
      // console.log('move')

      initMove.mousemove = true;
      
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
        dragParent.classList.remove('detach');
        // initCubes.isSnapping = true;
        initCubes.getShortestDist(e);
        // highlight groups accordingly
        if (initCubes.snapInfo.shortestDist != null) {
          if (initCubes.snapInfo.shortestDist < initCubes.snapDist) {
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
    mousemoveMove = true;
  }

  init(toolsUniverse, 'add');

  return {
    mousemove: mousemove,
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
  var cubeOuter = '';
  var frontCubeSRC = document.querySelector('[data-seal-type="cubes"][data-cube-side="front"][data-cube-value="1"]').src;
  var backCubeSRC = document.querySelector('[data-seal-type="cubes"][data-cube-side="back"][data-cube-value="1"]').src;
  var cubeId = 0;

  var start = function (e) {
    // console.log('dragStart');

    dragEloffsetX = e.offsetX;
    dragEloffsetY = e.offsetY;
    e.dataTransfer.setData("src", e.target.src);
    e.dataTransfer.setData("width", e.target.getBoundingClientRect().width);
    e.dataTransfer.setData("height", e.target.getBoundingClientRect().height);
    e.dataTransfer.setData("sealType", e.target.dataset.sealType);
    if (e.target.dataset.numberDesign) { // for numbers
      e.dataTransfer.setData("numberDesign", e.target.dataset.numberDesign);
      e.dataTransfer.setData("numberValue", e.target.dataset.numberValue);
    } else if(e.target.dataset.cubeSide) { // for cubes
      e.dataTransfer.setData("cubeSide", e.target.dataset.cubeSide);
      e.dataTransfer.setData("cubeValue", e.target.dataset.cubeValue);
    }

    cvOuter.addEventListener('dragenter', enter, false);
    cvOuter.addEventListener('touchenter', enter, false);
    cvOuter.addEventListener('dragleave', leave, false);
    cvOuter.addEventListener('touchleave', leave, false);
    cvOuter.addEventListener('dragover', over, false);
    cvOuter.addEventListener('touchover', over, false);
    cvOuter.addEventListener('drop', drop, false);
    cvOuter.addEventListener('touchend', drop, false);
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
    var numberDesign = e.dataTransfer.getData("numberDesign");
    var numberValue = e.dataTransfer.getData("numberValue");
    var cubeSide = e.dataTransfer.getData("cubeSide");
    var cubeValue = e.dataTransfer.getData("cubeValue");

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
        } else if(sealType == "cubes") {
          src = (cubeSide == "front") ? frontCubeSRC : backCubeSRC;
        }

        if(cubeValue == 10) {
          cubeOuter = `<div class="cube-outer">`;
          for(var r = 0; r < 10; r++) {
            cubeOuter += `<div class="cube drag-area" data-index="${r}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
          }
          cubeOuter += `
          </div>
          <div class="dot dot-top"></div>
          <div class="dot dot-bottom"></div>
          <div class="dot dot-left"></div>
          <div class="dot dot-right"></div>     
          <div class="detach-btn"></div>
        `;

          draggable.innerHTML = cubeOuter;
          draggable.classList.add('vertical');
        } else if(cubeValue == 100) {
          cubeOuter = '';
          for(var c = 0; c < 10; c++) {
            cubeOuter += `<div class="cube-outer drag-area" data-index="${c}">`;
            for(var r = 0; r < 10; r++) {
              cubeOuter += `<div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
            }
            cubeOuter += `</div>`;
          }
          cubeOuter += `
            <div class="dot dot-top"></div>
            <div class="dot dot-bottom"></div>
            <div class="dot dot-left"></div>
            <div class="dot dot-right"></div>
            <div class="detach-btn"></div>
          `;          

          draggable.innerHTML = cubeOuter;
          draggable.classList.add('vertical');
          draggable.classList.add('horizontal');
          draggable.classList.add('complete');
        } else {
          // b t r l - top, bottom, left, right
          draggable.innerHTML = `
            <div 
                data-row="1" 
                data-col="1" 
                data-id="${++initDrag.cubeId}" 
                data-side="${cubeSide}"
                class="cube drag-area ref t r b l"
                style="left: 0px; top: 0px;">
              <div class="dot dot-top"></div>
              <div class="dot dot-bottom"></div>
              <div class="dot dot-left"></div>
              <div class="dot dot-right"></div>
            </div>
            <div class="detach-btn"></div>
          `;
        }

        // draggable.addEventListener('dblclick', initCubes.remove, false);
        // draggable.addEventListener('click', initCubes.detachUI, false);
        // draggable.addEventListener('dblclick', initCubes.detach, false);
      } else if (sealType == "shapes") { // generate shapes
        draggable = document.createElement('div');
        draggable.classList.add('draggable-shape');
        draggable.classList.add('rotatable');
        draggable.setAttribute('data-seal-type', sealType);
        if (sealType == 'numbers') {
          draggable.setAttribute('data-number-design', numberDesign);
          draggable.setAttribute('data-number-value', numberValue);
        }
        draggable.innerHTML = `
          <img class="drag-area" src="${src}" style="width: ${width}px; height: ${height}px;">
          <button class="btn rotate-btn"></button>
          `;

        draggable.addEventListener('dblclick', (e) => { draggable.remove(); }, false);
        draggable.querySelector('.rotate-btn').addEventListener('mousedown', initRotate.start, false);
        draggable.querySelector('.rotate-btn').addEventListener('touchstart', initRotate.start, false);
      } else { // generate a normal seals
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

      cvOuter.removeEventListener('dragenter', enter, false)
      cvOuter.removeEventListener('touchenter', enter, false)
      cvOuter.removeEventListener('dragleave', leave, false)
      cvOuter.removeEventListener('touchleave', leave, false)
      cvOuter.removeEventListener('dragover', over, false)
      cvOuter.removeEventListener('touchover', over, false)
      cvOuter.removeEventListener('drop', drop, false)
      cvOuter.removeEventListener('touchend', drop, false)
    } else {
      alert('You can only place max ' + totalSealsAllowed + ' of ' + sealType + ' seal type.');
    }
  }

  return {
    start: start,
    draggablesId: draggablesId,
    dropElHeight: dropElHeight,
    cubeId: cubeId
  }
})();

// init panel functions - open/close/drag-panel/drag-seals
var initPanel = (function (e) {
  var panel = oldPanel = panelType = panelBtn = panelPosObj =
    panelCloseBtn = scaleFlipBtn = setPenBtn = setEraserBtn = panelScaleBtn = draggableSeals = rotateBtns = null;
  var eraser = document.querySelector('[data-tool-type1="eraser"]');

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
      scaleFlipBtn = panel.querySelector('.scale-flip-btn');
      setPenBtn = panel.querySelector('.pen-btn');
      setEraserBtn = panel.querySelector('.eraser-btn');
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
        draggableSeals[i].addEventListener('touchmove', initDrag.start, false);
      }
      for (var i = 0; i < rotateBtns.length; i++) {
        rotateBtns[i].addEventListener('mousedown', initRotate.start, false);
        rotateBtns[i].addEventListener('touchstart', initRotate.start, false);
        if (rotateBtns[i].classList.contains('rotate-compass-draw')) {
          rotateBtns[i].addEventListener('mousedown', initDraw.start, false);
          rotateBtns[i].addEventListener('touchstart', initDraw.start, false);
        }
      }
      if (panelScaleBtn) {
        panelScaleBtn.addEventListener('mousedown', initScale.start, false);
        panelScaleBtn.addEventListener('touchstart', initScale.start, false);
      }
      if (panelFlipBtn) {
        panelFlipBtn.addEventListener('click', flip, false);
      }
      if (scaleFlipBtn) {
        scaleFlipBtn.addEventListener('click', scaleFlip, false);
      }
      if (setPenBtn) {
        setPenBtn.addEventListener('click', setPen, false);
      }
      if (setEraserBtn) {
        setEraserBtn.addEventListener('click', setEraser, false);
      }
      if (panelType == "abacus") {
        var beads = document.querySelectorAll('[data-panel="abacus"] .bead');
        for (var i = 0; i < beads.length; i++) {
          beads[i].addEventListener('click', initAbacus.changePos, false);
        }
        var resetArea = document.getElementById('resetArea');
        resetArea.addEventListener('mousedown', initAbacus.resetStart, false);
        resetArea.addEventListener('touchstart', initAbacus.resetStart, false);
      } else if (panelType == "calculator") {
        var buttons = panel.querySelectorAll('[data-button-type]');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener('click', initCalc.calculate, false);
        }
      }
      if (panel.classList.contains('draggable-seal')) {
        panel.addEventListener('click', bringInFront, false);
      }

      cv.addEventListener('mousedown', initDraw.start, false);
      cv.addEventListener('touchstart', initDraw.start, false);


      // update current geometry set type and remove any highlighted panel if any
      if (panel.dataset.panelSet) {
        var highlightPanel = document.querySelector('.draggable-set.highlight');
        if (highlightPanel) {
          highlightPanel.classList.remove('highlight');
        }
        initTools.currSetType = panel.dataset.panel;
        panel.classList.add('highlight');
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
    scaleFlipBtn = panel.querySelector('.scale-flip-btn');
    setPenBtn = panel.querySelector('.pen-btn');
    setEraserBtn = panel.querySelector('.eraser-btn');

    draggableSeals = panel.getElementsByClassName('draggable-seal');
    panel.classList.remove('active');
    panelBtn.classList.remove('active');
    rotateBtns = panel.querySelectorAll('.rotate-btn');

    // REMOVE EVENT LISTENERS
    panelCloseBtn.removeEventListener('click', close, false);
    initMove.init(panel, 'remove');
    for (var i = 0; i < draggableSeals.length; i++) {
      draggableSeals[i].removeEventListener('dragstart', initDrag.start, false);
      draggableSeals[i].removeEventListener('touchmove', initDrag.start, false);
    }
    for (var i = 0; i < rotateBtns.length; i++) {
      rotateBtns[i].removeEventListener('mousedown', initRotate.start, false);
      rotateBtns[i].removeEventListener('touchstart', initRotate.start, false);
      if (rotateBtns[i].classList.contains('rotate-compass-draw')) {
        rotateBtns[i].removeEventListener('mousedown', initDraw.start, false);
        rotateBtns[i].removeEventListener('touchstart', initDraw.start, false);
      }
    }
    if (panelScaleBtn) {
      panelScaleBtn.removeEventListener('mousedown', initScale.start, false);
      panelScaleBtn.removeEventListener('touchstart', initScale.start, false);
    }
    if (panelFlipBtn) {
      panelFlipBtn.removeEventListener('click', flip, false);
    }
    if (scaleFlipBtn) {
      scaleFlipBtn.removeEventListener('click', scaleFlip, false);
    }
    if (setPenBtn) {
      setPenBtn.classList.remove('active');
      setPenBtn.removeEventListener('click', setPen, false);
    }
    if (setEraserBtn) {
      setEraserBtn.classList.remove('active');
      setEraserBtn.removeEventListener('click', setEraser, false);
    }
    if (panelType == "calculator") {
      var buttons = panel.querySelectorAll('[data-button-type]');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener('click', initCalc.calculate, false);
      }
    } else if (panelType == "abacus") {
      var beads = document.querySelectorAll('[data-panel="abacus"] .bead');
      var resetArea = document.getElementById('resetArea');
      for (var i = 0; i < beads.length; i++) {
        beads[i].removeEventListener('click', initAbacus.changePos, false);
      }
      resetArea.removeEventListener('mousedown', initAbacus.resetStart, false);
      resetArea.removeEventListener('touchstart', initAbacus.resetStart, false);
    } else if (panelType.substr(0, 5) == "scale") {
      var secActiveBtns = document.querySelectorAll('[data-tool-group-type="scale"].secondary.active');
      var panelGroupBtn = document.querySelector('[data-tool-group-type="scale"]');
      if (secActiveBtns.length < 1) {
        panelGroupBtn.classList.remove('active');
      }
    } else if (panelType.substr(0, 10) == "set-square") {
      var secActiveBtns = document.querySelectorAll('[data-tool-group-type="set-square"].secondary.active');
      var panelGroupBtn = document.querySelector('[data-tool-group-type="set-square"]');
      if (secActiveBtns.length < 1) {
        panelGroupBtn.classList.remove('active');
      }
    }
    if (panel.classList.contains('draggable-seal')) {
      panel.removeEventListener('click', bringInFront, false);
    }
    var panelCount = document.querySelectorAll('[data-panel-set].active').length;
    if(panelCount == 0 && initTools.currToolType != "pen") {
      cv.removeEventListener('mousedown', initDraw.start, false);
      cv.removeEventListener('touchstart', initDraw.start, false);
    }

    // update current geometry set type to null
    if (panel.dataset.panelSet) {
      initTools.currSetType = null;
    }
  }
  var bringInFront = function (e) {
    // console.log('bringInFront');

    panel = this.closest('.draggable');

    // update current geometry set type to the front one
    if (oldPanel != panel) {
      panel.style.zIndex = ++initMove.dragParentzIndex;
      if (panel.dataset.panelSet) {
        initTools.currSetType = panel.dataset.panel;
      }
    }
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
  var flip = function (e) {
    // console.log('panel fliping');

    if (panel.classList.contains('flipped')) {
      panel.classList.remove('flipped');
    } else {
      panel.classList.add('flipped');
    }
  }
  var scaleFlip = function (e) {
    console.log('scale flipping');
  }
  var setPen = function () {
    // console.log('set drawing');
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      this.classList.add('active');
      if(setEraserBtn) {
        setEraserBtn.classList.remove('active');
      }
      eraser.classList.remove('active');
      initTools.currToolType = null;      
    }
  }
  var setEraser = function (e) {
    // console.log('set erasing');
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      eraser.classList.remove('active');
      initTools.currToolType = null;
    } else {
      this.classList.add('active');
      eraser.click();
      // remove active class from setPenBtn
      setPenBtn.classList.remove('active');
    }
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
  var snapDist = 20;
  var snapInfo = { 'dragSide': 0, 'dropSide': 0, id: '', shortestDist: null };
  var rowLimit = 2;
  var colLimit = 2;
  var rowNumber = 10;
  var colNumber = 10;
  var dragParentLeft = dragParentTop = snapType = dragParent = dropParent = cubeLimit = cubeOuter = null;
  var detachType = null;
  var dropDotCoord_top = dropDotCoord_right = dropDotCoord_bottom = dropDotCoord_left = null;
  var cubeOuter = '';
  var cube = {
    width: 40,
    height: 40
  }
  var dropCube = null;

  // wrt dragParent
  var getCoords = function () {
    // console.log('geting Coordingates');

    dragParent = initMove.dragParent;

    snapType = (dragParent.classList.contains('vertical')) ? 'horizontal' : 'vertical';
    detachType = (dragParent.classList.contains('horizontal')) ? 'horizontal' : 'vertical';
    dropCoords = {};

    var draggables = document.querySelectorAll('.draggable-cubes');
    
    for (let i = 0; i < draggables.length; i++) {
      if (draggables[i] == dragParent) { continue; }
      
      var topDotRefDropCube = draggables[i].querySelector('.cube.t.l');
      var rightDotRefDropCube = draggables[i].querySelector('.cube.t.r');
      var bottomDotRefDropCube = draggables[i].querySelector('.cube.b.l');
      var leftDotRefDropCube = draggables[i].querySelector('.cube.t.l');
      
      var dropDotCoord_top = topDotRefDropCube.querySelector('.dot-top').getBoundingClientRect();
      var dropDotCoord_right = rightDotRefDropCube.querySelector('.dot-right').getBoundingClientRect();
      var dropDotCoord_bottom = bottomDotRefDropCube.querySelector('.dot-bottom').getBoundingClientRect();
      var dropDotCoord_left = leftDotRefDropCube.querySelector('.dot-left').getBoundingClientRect();

      var id = draggables[i].dataset.id;

      // 0, 1, 2, 3 | top, right, bottom, left respectively
      var dropCoord = {
        '0': {
          x: dropDotCoord_top.x,
          y: dropDotCoord_top.y
        },
        '1': {
          x: dropDotCoord_right.x,
          y: dropDotCoord_right.y
        },
        '2': {
          x: dropDotCoord_bottom.x,
          y: dropDotCoord_bottom.y
        },
        '3': {
          x: dropDotCoord_left.x,
          y: dropDotCoord_left.y
        }
      }
      dropCoords[id] = dropCoord;
    }
  }
  var getShortestDist = function (e) {
    // console.log('geting shortest dist');

    var topDotRefDragCube = dragParent.querySelector('.cube.t.l');
    var rightDotRefDragCube = dragParent.querySelector('.cube.t.r');
    var bottomDotRefDragCube = dragParent.querySelector('.cube.b.l');
    var leftDotRefDragCube = dragParent.querySelector('.cube.t.l');

    var i, j = 0;
    initCubes.snapInfo = { 'dragSide': 0, 'dropSide': 0, id: '', shortestDist: null };

    var dragDotCoord_top = topDotRefDragCube.querySelector('.dot-top').getBoundingClientRect();
    var dragDotCoord_right = rightDotRefDragCube.querySelector('.dot-right').getBoundingClientRect();
    var dragDotCoord_bottom = bottomDotRefDragCube.querySelector('.dot-bottom').getBoundingClientRect();
    var dragDotCoord_left = leftDotRefDragCube.querySelector('.dot-left').getBoundingClientRect();

    // 0, 1, 2, 3 | top, right, bottom, left respectively
    var dragCoord = {
      '0': {
        x: dragDotCoord_top.x,
        y: dragDotCoord_top.y
      },
      '1': {
        x: dragDotCoord_right.x,
        y: dragDotCoord_right.y
      },
      '2': {
        x: dragDotCoord_bottom.x,
        y: dragDotCoord_bottom.y
      },
      '3': {
        x: dragDotCoord_left.x,
        y: dragDotCoord_left.y
      },
    }

    // wrt dragCube
    for(i = 0; i < 4; i++) { // 0,1,2,3 -> snap using ALL FOUR sides (top and botton and left and right)
      for (var dropCoord in dropCoords) {
        switch (i) {
          case 0: j = 2; break; // compare 0(top) of drag with 2(bottom) of drop
          case 1: j = 3; break;
          case 2: j = 0; break;
          case 3: j = 1; break;
        }
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
          if (initCubes.snapInfo.shortestDist == null || initCubes.snapInfo.shortestDist > d) {
            dropParent = initMove.dropParent = document.querySelector('.draggable[data-id="' + dropCoord + '"');
            var dropRowCount = dropParent.querySelectorAll('[data-row="1"]').length;
            var dropColCount = dropParent.querySelectorAll('[data-col="1"]').length;
            var dragRowCount = dragParent.querySelectorAll('[data-row="1"]').length;
            var dragColCount = dragParent.querySelectorAll('[data-col="1"]').length;

            initCubes.snapInfo = {
              // i - side of drag element, j - side of drop element
              'dragSide': i, 
              'dropSide': j, 
              id: parseInt(dropCoord),
              shortestDist: d
            }

            if(((i == 0 || i == 2) && dropRowCount != dragRowCount) || ((i == 1 || i == 3) && dropColCount != dragColCount)) {
              initCubes.snapInfo.shortestDist = null;
            }
          };
        }
      }
    }
  }
  var highlight = function (flag) {
    let _class = classes = oldHighlight = prefix = '';
    if (flag) {
      // console.log('highlighting')
      oldHighlight = document.querySelector('.draggable-cubes.highlight');
      if (oldHighlight) {
        oldHighlight.classList.remove('highlight');
      }
      _class = 'highlight-'+initCubes.snapInfo.dragSide;
      dragParent.classList.add(_class);
      _class = 'highlight-'+initCubes.snapInfo.dropSide;
      dropParent.classList.add(_class);
    } else {
      prefix = "highlight";

      classes = dragParent.className.split(" ").filter(c => !c.startsWith(prefix));
      dragParent.className = classes.join(" ").trim();   

      classes = dropParent.className.split(" ").filter(c => !c.startsWith(prefix));
      dropParent.className = classes.join(" ").trim();      
    }
  }
  var snap = function () {
    // console.log('snapping');
    
    var transitionEvent = whichTransitionEvent();
    // whether drag cube is 'front' or 'back
    var cubeSide = dragParent.querySelector('.cube').dataset.side;

    var firstDropRowEl = dropParent.querySelector('.cube.t');
    var lastDropRowEl = dropParent.querySelector('.cube.b');
    var firstDropColEl = dropParent.querySelector('.cube.l');
    var lastDropColEl = dropParent.querySelector('.cube.r');
    var noOfCols, noOfRows, l, t, dropRow, dropCol;
    var classes = '';

    // snap occordng to snape side
    if(initCubes.snapInfo.shortestDist) {
      cubeOuter = '';
      
      noOfCols = dragParent.querySelectorAll('.cube.t').length;
      noOfRows = dragParent.querySelectorAll('.cube.l').length;
      
      // calculate initial left and top position
      switch(initCubes.snapInfo.dropSide) {
        case 0:  // top wrt dropside
            dropCube = dropParent.querySelector('.cube.t.l');
            dropRow = parseInt(dropCube.dataset.row);
            dropCol = parseInt(dropCube.dataset.col);            
          break;
        case 2:  // bottom 
            dropCube = dropParent.querySelector('.cube.b.l');
            dropRow = parseInt(dropCube.dataset.row);
            dropCol = parseInt(dropCube.dataset.col);            
          break;
        case 1:  // right 
            dropCube = dropParent.querySelector('.cube.t.r');
            dropRow = parseInt(dropCube.dataset.row);
            dropCol = parseInt(dropCube.dataset.col);            
          break;
        case 3:  // left 
            dropCube = dropParent.querySelector('.cube.t.l');
            dropRow = parseInt(dropCube.dataset.row);
            dropCol = parseInt(dropCube.dataset.col);            
          break;
      }

      l = parseInt(dropCube.style.left);
      t = parseInt(dropCube.style.top);

      // snap based on side
      switch(initCubes.snapInfo.dropSide) {
        case 0: addToTop(); break;  // top wrt dropside
        case 2: addToBottom(); break;  // bottom 
        case 1: addToRight(); break;  // right 
        case 3: addToLeft(); break;  // left 
      }

      initMove.dropParent.innerHTML += cubeOuter;
      dropParent = initMove.dropParent;
      initMove.init(dropParent, 'add');
      // dragParent.remove();
      // dropParent.style.zIndex = ++initMove.dragParentzIndex;              
    }

    function addToTop() {
      // console.log('addToTop');
      var leftOfDrop = l;
      for (var r = noOfRows; r >= 1; r--) {
        row = r;
        t -= cube.height;
        for (var c = noOfCols; c >= 1; c--) {
          l = leftOfDrop + cube.width * (c - 1);

          col = c;

          // apply new classes
          if (noOfCols == 1) {
            classes = (r == 1) ? 't l r' : 'r l';
          } else {
            if (r == 1 && c == 1) { // top left cube
              classes = 't l';
            } else if (c == noOfCols && r == 1) { // top right cube
              classes = 't r';
            } else if (r == 1) { // top middle cubes
              classes = 't';
            } else if (c == 1) { // middle left cubes
              classes = 'l';
            } else if (c == noOfCols) { // middle right cubes
              classes = 'r';
            } else { // middle cubes 
              classes = '';
            }
          }

          cubeOuter += `
            <div 
                data-row="${row}" 
                data-col="${col}" 
                data-id="${++initDrag.cubeId}" 
                data-side="${cubeSide}" 
                class="cube drag-area ${classes}"
                style="left: ${l}px; top: ${t}px;">
              <div class="dot dot-top"></div>
              <div class="dot dot-bottom"></div>
              <div class="dot dot-left"></div>
              <div class="dot dot-right"></div>   
            </div>     
          `;
        }
      }

      // remove all 't-top' classes from previous col
      let prevColRows = dropParent.querySelectorAll('.cube[data-row="' + dropRow + '"');
      for (let i = 0; i < prevColRows.length; i++) {
        prevColRows[i].classList.remove('t');
      }

      // ↑ all below rows values by 1
      let cubes = dropParent.querySelectorAll('.cube');
      for (let j = 0; j < cubes.length; j++) {
        let r = parseInt(cubes[j].dataset.row);
        cubes[j].dataset.row = r + noOfRows;
      }
    }
    function addToBottom() {
      // console.log('addToBottom');
      var leftOfDrop = l;
      for (var r = 1; r <= noOfRows; r++) {
        row = dropRow + r;
        t += cube.height;
        for (var c = 1; c <= noOfCols; c++) {
          l = leftOfDrop + cube.width * (c - 1);

          col = c;

          // apply new classes
          if (noOfCols == 1) {
            classes = (r == noOfRows) ? 'r b l' : 'r l';
          } else {
            if (c == 1 && r == noOfRows) { // right top cube
              classes = 'b l';
            } else if (c == noOfCols && r == noOfRows) { // right bottom cube
              classes = 'r b';
            } else if (r == noOfRows) { // right middle cubes
              classes = 'b';
            } else if (c == 1) { // middle top cubes
              classes = 'l';
            } else if (c == noOfCols) { // middle bottom cubes
              classes = 'r';
            } else { // middle cubes 
              classes = '';
            }
          }

          cubeOuter += `
            <div 
                data-row="${row}" 
                data-col="${col}" 
                data-id="${++initDrag.cubeId}" 
                data-side="${cubeSide}" 
                class="cube drag-area ${classes}"
                style="left: ${l}px; top: ${t}px;">
              <div class="dot dot-top"></div>
              <div class="dot dot-bottom"></div>
              <div class="dot dot-left"></div>
              <div class="dot dot-right"></div>   
            </div>     
          `;
        }
      }

      // remove all 'b-bottom' classes from previous col
      let preRowCols = dropParent.querySelectorAll('.cube[data-row="' + dropRow + '"');
      for (let i = 0; i < preRowCols.length; i++) {
        preRowCols[i].classList.remove('b');
      }
    }
    function addToRight() {
      // console.log('addToRight');
      var topOfDrop = t;
      for (var c = 1; c <= noOfCols; c++) {
        col = dropCol + c;
        l += cube.width;
        for(var r = 1; r <= noOfRows; r++) {
          t = topOfDrop + cube.height * (r - 1);
          
          row = r;

          // apply new classes
          if(noOfRows == 1) {
            classes = (c == noOfCols) ? 't r b' : 't b';
          } else {
            if (r == 1 && c == noOfCols) { // right top cube
              classes = 't r';
            } else if (r == noOfRows && c == noOfCols) { // right bottom cube
              classes = 'r b';
            } else if(c == noOfCols) { // right middle cubes
              classes = 'r';
            } else if(r == 1) { // middle top cubes
              classes = 't';
            } else if(r == noOfRows) { // middle bottom cubes
              classes = 'b';
            } else { // middle cubes 
              classes = ''; 
            }
          }

          cubeOuter += `
            <div 
                data-row="${row}" 
                data-col="${col}" 
                data-id="${++initDrag.cubeId}" 
                data-side="${cubeSide}" 
                class="cube drag-area ${classes}"
                style="left: ${l}px; top: ${t}px;">
              <div class="dot dot-top"></div>
              <div class="dot dot-bottom"></div>
              <div class="dot dot-left"></div>
              <div class="dot dot-right"></div>   
            </div>     
          `;
        }
      }    

      // remove all 'r-right' classes from previous col
      var prevColRows = dropParent.querySelectorAll('.cube[data-col="' + dropCol + '"');
      for(var i = 0; i < prevColRows.length; i++) {
        prevColRows[i].classList.remove('r');
      }
    }
    function addToLeft() {
      // console.log('addToLeft');
      var topOfDrop = t;
      for (var c = noOfCols; c >= 1; c--) {
        col = c;
        l -= cube.width;
        for (var r = noOfRows; r >= 1 ; r--) {
          t = topOfDrop + cube.height * (r - 1);

          row = r;

          // apply new classes
          if (noOfRows == 1) {
            classes = (c == 1) ? 't b l' : 't b';
          } else {
            if (r == 1 && c == 1) { // right top cube
              classes = 't l';
            } else if (r == noOfRows && c == 1) { // right bottom cube
              classes = 'l b';
            } else if (c == 1) { // right middle cubes
              classes = 'l';
            } else if (r == 1) { // middle top cubes
              classes = 't';
            } else if (r == noOfRows) { // middle bottom cubes
              classes = 'b';
            } else { // middle cubes 
              classes = '';
            }
          }

          cubeOuter += `
            <div 
                data-row="${row}" 
                data-col="${col}" 
                data-id="${++initDrag.cubeId}" 
                data-side="${cubeSide}" 
                class="cube drag-area ${classes}"
                style="left: ${l}px; top: ${t}px;">
              <div class="dot dot-top"></div>
              <div class="dot dot-bottom"></div>
              <div class="dot dot-left"></div>
              <div class="dot dot-right"></div>   
            </div>     
          `;
        }
      }

      // remove all 'l-left' classes from previous col
      let prevColRows = dropParent.querySelectorAll('.cube[data-col="' + dropCol + '"');
      for (let i = 0; i < prevColRows.length; i++) {
        prevColRows[i].classList.remove('l');
      }

      // ↑ all right cols values by 1
      let cubes = dropParent.querySelectorAll('.cube');
      for (let j = 0; j < cubes.length; j++) {
        let c = parseInt(cubes[j].dataset.col);
        cubes[j].dataset.col = c + noOfCols;
      }        
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

      var sealType = dragParent.dataset.sealType;
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
              <div class="cube-outer drag-area" data-index="${r}">
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
          <div class="cube-outer drag-area" data-index="${r}">
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

      var sealType = dragParent.dataset.sealType;
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
            cubeOuter += `<div class="cube drag-area" data-index="${r}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
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
            cubeOuter += `<div class="cube drag-area" data-index="${r}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
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
            cubeOuter += `<div class="cube-outer drag-area" data-index="${c}">`;
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
    console.log('detachUI');

    var dragParent = e.target.closest('.draggable-cubes');
    var dragParentLeft = dragParent.style.left;
    var dragParentTop = dragParent.style.top;
    var left = parseFloat(dragParentLeft);
    var top = parseFloat(dragParentTop);
    // var top = parseFloat(dragParentTop) + dragParent.getBoundingClientRect().height;
    var cubeHeight = dragParent.querySelector('.drag-area').getBoundingClientRect().height;
    var cubeWidth = dragParent.querySelector('.drag-area').getBoundingClientRect().width;
    var cubeOuter;
    //  console.lo
    var sealType = dragParent.dataset.sealType;
    var src = dragParent.querySelector('img').src;
    var width = dragParent.querySelector('img').width;
    var height = dragParent.querySelector('img').height;

    if (e.target.classList.contains('detach-btn')) { // detach all cubes
      console.log('detaching All');

      if (detachType == 'vertical') { // vertical detaching all
        // console.log('vertical detaching all')

        var cubesToDetach = dragParent.querySelectorAll('.drag-area').length;
        // dragParent.querySelector('.detach-btn').remove();

        // top one
        if (cubesToDetach == row) { // if vertical group is complete
          dragParent.querySelector('.cube-outer').remove();
          dragParent.classList.remove('detach')
          dragParent.classList.remove('vertical')

          cubeOuter = `
            <div class="cube-outer drag-area" data-index="0">
            <div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>  
          `;

          dragParent.innerHTML += cubeOuter;
          initMove.init(dragParent, 'add');
          dragParent.addEventListener('dblclick', remove, false);
        } else { // if vertical group is not complete
          for (var i = 1; i < cubesToDetach; i++) {
            dragParent.querySelector('[data-index="' + i + '"]').remove();
            dragParent.classList.remove('detach')
            dragParent.classList.remove('vertical')
          }
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
          if (sealType == 'numbers') {
            draggable.setAttribute('data-number-design', dragParent.dataset.numberDesign);
            draggable.setAttribute('data-number-value', dragParent.dataset.numberValue);
          }

          cubeOuter = `
            <div class="cube-outer drag-area" data-index="0">
            <div class="cube"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>
            </div>        
            <div class="dot dot-top"></div>
            <div class="dot dot-bottom"></div>
            <div class="dot dot-left"></div>
            <div class="dot dot-right"></div>     
            <div class="detach-btn"></div>     
          `;

          draggable.innerHTML = cubeOuter;
          cvOuter.appendChild(draggable);

          initMove.init(draggable, 'add');
          draggable.addEventListener('dblclick', remove, false);
          draggable.addEventListener('click', detachUI, false);
        }

      } else { // horizontal detaching all
        // console.log('horizontal detaching all')

        var cubesToDetach = dragParent.querySelectorAll('.drag-area').length;
        // dragParent.querySelector('.detach-btn').remove();

        // left one
        for (var c = 0; c < cubesToDetach; c++) {
          dragParent.querySelector('[data-index="' + c + '"]').remove();
        }
        dragParent.classList.remove('detach')
        dragParent.classList.add('vertical')
        dragParent.classList.remove('complete')
        dragParent.classList.remove('horizontal')

        cubeOuter = `<div class="cube-outer">`;

        for (var r = 0; r < row; r++) {
          cubeOuter += `<div class="cube drag-area" data-index="${r}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
        }
        cubeOuter += `</div>`;

        dragParent.innerHTML += cubeOuter;
        initMove.init(dragParent, 'add');
        dragParent.addEventListener('dblclick', remove, false);

        // right cubes
        for (var i = 1; i < cubesToDetach; i++) {
          var draggable = document.createElement('div');
          draggable.classList.add('draggable-cubes');
          draggable.classList.add('draggable');
          draggable.setAttribute('data-id', ++initDrag.draggablesId);
          draggable.setAttribute('data-seal-type', sealType);
          // draggable.style.left = left + 'px';
          // draggable.style.top = parseFloat(dragParentTop) + cubeHeight * i + 30 * i + 'px';
          draggable.style.left = parseFloat(dragParentLeft) + cubeWidth * i + 30 * i + 'px';
          draggable.style.top = top + 'px';
          draggable.style.zIndex = ++initMove.dragParentzIndex;

          cubeOuter = `<div class="cube-outer">`;

          for (var r = 0; r < row; r++) {
            cubeOuter += `<div class="cube drag-area" data-index="${r}"><img src="${src}" style="width: ${width}px; height: ${height}px;"></div>`;
          }
          cubeOuter += `
          </div>        
          <div class="dot dot-top"></div>
          <div class="dot dot-bottom"></div>
          <div class="dot dot-left"></div>
          <div class="dot dot-right"></div>     
          <div class="detach-btn"></div>     
          `;

          draggable.innerHTML = cubeOuter;
          cvOuter.appendChild(draggable);
          draggable.classList.add('vertical');

          initMove.init(draggable, 'add');
          draggable.addEventListener('dblclick', remove, false);
          draggable.addEventListener('click', detachUI, false);
        }
      }
    } else { // toggle 'detach-btn'
      if (dragParent.querySelectorAll('.drag-area').length > 1) {
        if (!initMove.mousemove) { // update if mouse is not moving (update only on click)
          if (dragParent.classList.contains('detach')) {
            dragParent.classList.remove('detach');
          } else {
            // remove and old detach if any
            var oldDetachEl = document.querySelector('.draggable-cubes.detach');
            if (oldDetachEl) {
              oldDetachEl.classList.remove('detach');
            }
            dragParent.classList.add('detach');
          }
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
    snapInfo: snapInfo,
    getCoords: getCoords,
    getShortestDist: getShortestDist,
    highlight: highlight,
    snap, snap,
    detach: detach,
    detachUI, detachUI,
    remove, remove
  }
})();

// rotate behaviour of tools/widgets/seals
var initRotate = (function () {
  var mousedownRotate = mousemoveRotate = false;
  var startAngle = null;
  var rotation = null;
  var rotateBtn = null;
  var oldRotateBtn = null;
  var resetRotation = false;
  var rotatable = null;
  var panel;
  var oldPanel = null;
  var panelType = null;
  var currAngle = 0, angle, x, y;
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

    // check to enable arc drawing or not
    // also which element to take as ref for rotation
    if (panelType == "compass") {
      rotateBtn = this;
      if (rotateBtn.classList.contains('rotate-compass')) {
        if (rotateBtn.classList.contains('rotate-compass-draw')) {
          // calling draw function to make an arc
          oldToolType = initTools.currToolType;
          initTools.currToolType = 'arc';
          cvOuter.classList.add('pe-none');
        }
        refEl = panel.querySelector('.rotate-point-ref');
      } else if (rotateBtn.classList.contains('rotate-hand')) {
        refEl = panel.querySelector('.rotate-hand-ref');
      }
    } else if (panelType == "clock") {
      refEl = panel;
    } else if(panelType == "protractor") {
      var pointsObj = math.getSetPoints(initTools.currSetType);
      var leftTopCoords = {
        x: pointsObj[2].x,
        y: pointsObj[2].y
      }
      
      // update 'position' and 'origin' for scaling
      // rotatable.style.transformOrigin = "center bottom";
      // rotatable.style.left = leftTopCoords.x - 1 + 'px';
      // rotatable.style.top = leftTopCoords.y - 1 + 'px';        
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

    x = ((e.type == 'touchstart') ? e.touches[0].clientX : e.clientX) - refPoint.x;
    y = ((e.type == 'touchstart') ? e.touches[0].clientY : e.clientY) - refPoint.y;


    if (panelType == 'compass') { // for compass
      // update resetRotation variable
      resetRotation = (oldRotateBtn == rotateBtn) ? false : true;
      if (oldRotateBtn != rotateBtn) {
        oldRotateBtn = rotateBtn;
      }

      if (rotateBtn.classList.contains('rotate-hand')) { // rotate hand (2 types)
        if (rotateBtn.classList.contains('rotate-pencil')) { // rotate hand - pencil
          if (panel.dataset.anglePencil == undefined) {
            startAngle = Math.floor(R2D * Math.atan2(y, x));
            if (startAngle < 0) { startAngle = 360 - Math.abs(startAngle); }
            panel.setAttribute('data-angle-pencil', startAngle);
          } else {
            startAngle = panel.dataset.anglePencil;
          }
        } else if (rotateBtn.classList.contains('rotate-point')) { // rotate hand - point
          // if (panel.dataset.anglePoint == undefined) {
          //   startAngle = Math.floor(R2D * Math.atan2(y, x));
          //   if (startAngle < 0) { startAngle = 360 - Math.abs(startAngle); }
          //   panel.setAttribute('data-angle-point', startAngle);
          // } else {
          //   startAngle = panel.dataset.anglePoint;
          // }
        }
      } else if (rotateBtn.classList.contains('rotate-compass')) { // rotate compass (2 ways)
        if (rotateBtn.classList.contains('rotate-compass-only')) { // rotate only 
          if (panel.dataset.angleCompassOnly == undefined || resetRotation) {
            startAngle = Math.floor(R2D * Math.atan2(y, x));
            if (startAngle < 0) { startAngle = 360 - Math.abs(startAngle); }
            panel.setAttribute('data-angle-compass-only', startAngle);
          } else {
            startAngle = panel.dataset.angleCompassOnly;
          }
        } else if (rotateBtn.classList.contains('rotate-compass-draw')) { // rotate and draw
          if (panel.dataset.angleCompassDraw == undefined || resetRotation) {
            startAngle = Math.floor(R2D * Math.atan2(y, x));
            if (startAngle < 0) { startAngle = 360 - Math.abs(startAngle); }
            panel.setAttribute('data-angle-compass-draw', startAngle);
          } else {
            startAngle = panel.dataset.angleCompassDraw;
          }
        }
      }

      startAngle = parseFloat(startAngle);

      // for adding previous rotation if current 'rotateBtn' is not same as previous 'rotateBtn'
      // and if already some rotation is present
      angle = panel.style.transform.substr(7);
      angle = angle.substring(0, angle.length - 4);
      angle = parseFloat(angle);

      if (resetRotation && !isNaN(angle)) {
        startAngle -= angle;
        startAngle %= 360;
        if (rotateBtn.classList.contains('rotate-compass-only')) {
          panel.setAttribute('data-angle-compass-only', startAngle);
        } else if (rotateBtn.classList.contains('rotate-compass-draw')) {
          panel.setAttribute('data-angle-compass-draw', startAngle);
        }
      }
    } else { // for other set widgets
      if (panel.dataset.angle == undefined) {
        startAngle = Math.floor(R2D * Math.atan2(y, x));
        if (startAngle < 0) {
          startAngle = 360 - Math.abs(startAngle);
        }
        panel.setAttribute('data-angle', startAngle);
      } else {
        startAngle = panel.dataset.angle;
      }
    }

    cvOuter.addEventListener('mousemove', rotate, false);
    cvOuter.addEventListener('touchmove', rotate, false);
    cvOuter.addEventListener('mouseup', end, false);
    cvOuter.addEventListener('touchend', end, false);
    cvOuter.addEventListener('mouseleave', end, false);
    cvOuter.addEventListener('touchleave', end, false);
  };

  var end = function (e) {
    // console.log('end-rotate');
    // console.groupEnd();

    mousedownRotate = mousemoveRotate = false

    cvOuter.classList.remove('pe-none');
    // cvOuter.classList.remove('rotating');

    if (panelType == "compass") {
      initTools.currToolType = oldToolType;
    }

    cvOuter.removeEventListener('mousemove', rotate, false);
    cvOuter.removeEventListener('touchmove', rotate, false);
    cvOuter.removeEventListener('mouseup', end, false);
    cvOuter.removeEventListener('touchend', end, false);
    cvOuter.removeEventListener('mouseleave', end, false);
    cvOuter.removeEventListener('touchleave', end, false);
  };

  var rotate = function (e) {
    if (mousedownRotate && mousemoveRotate) {
      // console.log('rotate');

      e.preventDefault();

      x = ((e.type == 'touchmove') ? e.touches[0].clientX : e.clientX) - refPoint.x;
      y = ((e.type == 'touchmove') ? e.touches[0].clientY : e.clientY) - refPoint.y;
  
      currAngle = Math.floor(R2D * Math.atan2(y, x));

      if (currAngle < 0) {
        currAngle = 360 - Math.abs(currAngle);
      }

      rotation = currAngle - startAngle;
      if (rotation < 0) {
        rotation = 360 + currAngle - Math.abs(startAngle);
      }

      if (panelType == 'clock') {
        rotatable.style.transform = "translateY(-50%) rotate(" + currAngle + "deg)";
      } else if (panelType == "compass") { // rotate compass itself or its hands
        if (rotateBtn.classList.contains('rotate-hand')) {
          if (!isNaN(angle)) { currAngle = currAngle - angle; }
          if (rotateBtn.classList.contains('rotate-pencil')) { // rotate hand - pencil
            if (rotation > 20 && rotation < 200) rotation = 20; else
              if (rotation < 340 && rotation > 200) rotation = 340;
          } else if (rotateBtn.classList.contains('rotate-point')) { // rotate hand - point
            // if(currAngle > 85) currAngle = 85; else
            // if(currAngle < 50) currAngle = 50;
          }
          if (panel.classList.contains('flipped')) { // if compass is flipped
            if (currAngle <= 180) {
              currAngle = 180 - currAngle;
            } else {
              currAngle = 180 + (360 - currAngle);
            }
          }
          rotatable.style.transform = "rotate(" + rotation + "deg)";
        } else { // rotate compass set
          rotatable.style.transform = "rotate(" + rotation + "deg)";
        }
      } else { // rotate other set types
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
  var mousedownRotate = mousemoveRotate = false;
  var startPoint, currPoint;
  var scalable = null;
  var panel = null;
  var w = null;
  var h = null;
  var dx = null;
  var dy = null;
  var ratio = null;
  var dist1 = null;
  var dist2 = null;
  var dist = null;
  var newWidth = null;
  var leftTopCoords;

  var start = function (e) {
    // console.group('Scale')
    // console.log('start-scale');

    e.preventDefault();

    mousedownRotate = true;

    cvOuter.classList.add('pe-none');

    var pointsObj = math.getSetPoints(initTools.currSetType);
    leftTopCoords = {
      x: pointsObj[2].x,
      y: pointsObj[2].y
    }
    
    startPoint = math.getMousePosition(e, cv);
    dist1 = Math.sqrt((pointsObj[2].x-startPoint.x) * (pointsObj[2].x-startPoint.x) + (pointsObj[2].y-startPoint.y) * (pointsObj[2].y-startPoint.y));
    
    scalable = e.target.closest('.scalable');
    panel = e.target.closest('.draggable');
    w = scalable.offsetWidth;
    h = scalable.offsetHeight;
    ratio = w / h;
    
    console.log(leftTopCoords);
    // update 'position' and 'origin' for scaling
    // scalable.style.transformOrigin = "left top";
    panel.style.left = leftTopCoords.x - 1 + 'px';
    panel.style.top = leftTopCoords.y - 1 + 'px';  
    
    cvOuter.addEventListener('mousemove', scale, false);
    cvOuter.addEventListener('touchmove', scale, false);
    cvOuter.addEventListener('mouseup', end, false);
    cvOuter.addEventListener('touchend', end, false);
  }
  var end = function (e) {
    // console.log('end-rotate')
    // console.groupEnd();

    mousedownRotate = mousemoveRotate = false;

    cvOuter.classList.remove('pe-none');  
    
    // update 'transform-origin' of panel for rotation
    var l = newWidth / 2 + 'px ';
    var t = (newWidth / ratio) + 'px';
    // panel.style.transformOrigin = l + t;    
    // panel.style.left = panel.getBoundingClientRect().left - dist + 'px';
    // console.log(panel.getBoundingClientRect(), dist)

    cvOuter.removeEventListener('mousemove', scale, false);
    cvOuter.removeEventListener('touchmove', scale, false);
    cvOuter.removeEventListener('mouseup', end, false);
    cvOuter.removeEventListener('touchend', end, false);
  } 
  var scale = function (e) {
    if (mousedownRotate && mousemoveRotate) {
      // console.log('scale');

      e.preventDefault();
  
      currPoint = math.getMousePosition(e, cvOuter);

      // distance between left-top and right-bottom corners
      dist2 = Math.sqrt((leftTopCoords.x-currPoint.x) * (leftTopCoords.x-currPoint.x) + (leftTopCoords.y-currPoint.y) * (leftTopCoords.y-currPoint.y));
      dist = dist2 - dist1
      newWidth = w + dist;
      scalable.style.width = newWidth + 'px';
      scalable.style.height = (newWidth / ratio) + 'px';
      // scalable.style.transform = "scale("+scale+")"
      // panel.style.transform = "rotate(45deg) scale("+scale+")"
      panel.style.width = newWidth + 'px';
      panel.style.height = (newWidth / ratio) + 'px';
    }
    mousemoveRotate = true;
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
var initAbacus = (function () {
  var panel = document.querySelector('[data-panel="abacus"]');
  var totalCol = startX = endX = startCol = posX = panelX = col = colX = null;
  var totalColToResetArr = [];

  var changePos = function () {
    // console.log('changing position');

    var layer = this.dataset.layer;
    var state = this.dataset.state;

    if (layer == 'up') { // up layer
      if (state == 'down') {
        this.setAttribute('transform', 'translate(0, -20)');
        this.dataset.state = 'up';
      } else {
        this.setAttribute('transform', 'translate(0, 0)');
        this.dataset.state = 'down';
      }
    } else { // down layer
      var beads = this.parentNode.querySelectorAll('.bead');
      var count = this.dataset.pos;
      if (state == 'down') {
        for (var i = 0; i <= count; i++) {
          beads[i].setAttribute('transform', 'translate(0,-43)');
          beads[i].dataset.state = 'up';
        }
      } else {
        var totalBeads = beads.length;
        for (var i = count; i < totalBeads; i++) {
          beads[i].setAttribute('transform', 'translate(0, 0)');
          beads[i].dataset.state = 'down';
        }
      }
    }
  }

  var resetStart = function (e) {
    // console.group('Reset Start');
    // console.log('resetStart');

    // total cols in panel
    totalCol = panel.querySelectorAll('[data-layer="up"]').length;

    // total cols to reset
    totalColToResetArr = [];
    for (var c = 1; c <= totalCol; c++) {
      if (panel.querySelector('[data-col="' + c + '"][data-layer="up"][data-state="down"]')) {
        totalColToResetArr.push(c);
      } else if (panel.querySelector('[data-col="' + c + '"][data-layer="down"][data-state="up"]')) {
        totalColToResetArr.push(c);
      }
    }

    panelX = panel.getBoundingClientRect().x;
    posX = math.getMousePosition(e, cvOuter).x;
    startX = posX - panelX;

    panel.addEventListener('mousemove', reset, false);
    panel.addEventListener('touchmove', reset, false);
    cvOuter.addEventListener('mouseup', resetEnd, false);
    cvOuter.addEventListener('touchend', resetEnd, false);
    cvOuter.addEventListener('mouseleave', resetEnd, false);
    cvOuter.addEventListener('touchleave', resetEnd, false);
  }
  var reset = function (e) {
    // console.log('reset');

    posX = math.getMousePosition(e, cvOuter).x;
    endX = posX - panelX;

    // detect range and reset cols
    // for (var c = 0; c < totalColToResetArr.length; c++) {
    //   col = panel.querySelector('[data-col="' + totalColToResetArr[c] + '"]').getBoundingClientRect();
    //   colX = col.x + col.width / 2;
    //   colX = parseInt(colX - panelX);

    //   if (colX < endX && startX < endX && colX > startX) {
    //     // console.log('reset L to R')
    //     var beads = panel.querySelectorAll('[data-col="' + totalColToResetArr[c] + '"][data-state="up"]');
    //     beads.forEach(bead => {
    //       bead.setAttribute('transform', 'translate(0, 0)');
    //       bead.dataset.state = 'down';
    //     });
    //   } else if (colX > endX && startX > endX && colX < startX) {
    //     // console.log('reset R to L')
    //     var beads = panel.querySelectorAll('[data-col="' + totalColToResetArr[c] + '"][data-state="up"]');
    //     beads.forEach(bead => {
    //       bead.setAttribute('transform', 'translate(0, 0)');
    //       bead.dataset.state = 'down';
    //     });
    //   }
    // }
    for (var c = 0; c < totalColToResetArr.length; c++) {
      col = panel.querySelector('[data-col="' + totalColToResetArr[c] + '"]').getBoundingClientRect();
      colX = col.x + col.width / 2;
      colX = parseInt(colX - panelX);

      if (colX < endX && startX < endX && colX > startX) {
        // console.log('reset L to R')
        var beadUp = panel.querySelector('[data-col="' + totalColToResetArr[c] + '"][data-layer="up"][data-state="down"]');
        var beadsDown = panel.querySelectorAll('[data-col="' + totalColToResetArr[c] + '"][data-layer="down"][data-state="up"]');
        if (beadUp) {
          beadUp.setAttribute('transform', 'translate(0, -20)');
          beadUp.dataset.state = 'up';
        }
        beadsDown.forEach(beadDown => {
          beadDown.setAttribute('transform', 'translate(0, 0)');
          beadDown.dataset.state = 'down';
        });
      } else if (colX > endX && startX > endX && colX < startX) {
        // console.log('reset R to L')
        var beadUp = panel.querySelector('[data-col="' + totalColToResetArr[c] + '"][data-layer="up"][data-state="down"]');
        var beadsDown = panel.querySelectorAll('[data-col="' + totalColToResetArr[c] + '"][data-layer="down"][data-state="up"]');
        if (beadUp) {
          beadUp.setAttribute('transform', 'translate(0, -20)');
          beadUp.dataset.state = 'up';
        }
        beadsDown.forEach(beadDown => {
          beadDown.setAttribute('transform', 'translate(0, 0)');
          beadDown.dataset.state = 'down';
        });
      }
    }    

    // startX = endX;
  }
  var resetEnd = function (e) {
    // console.log('resetEnd');
    // console.groupEnd();

    panel.removeEventListener('mousemove', reset, false);
    panel.removeEventListener('touchmove', reset, false);
    cvOuter.removeEventListener('mouseup', resetEnd, false);
    cvOuter.removeEventListener('touchend', resetEnd, false);
    cvOuter.removeEventListener('mouseleave', resetEnd, false);
    cvOuter.removeEventListener('touchleave', resetEnd, false);
  }

  return {
    changePos: changePos,
    resetStart: resetStart
  }
})();

// math functions - mostly trigonometry
var math = (function (e) {
  var toolDrawingOffset = 50;
  var slope = 0;
  var inRange = false;

  var ParseToFloat = function (number, decimal) {
    return parseFloat(number.toFixed(decimal));
  }

  // returns 'left' and 'right' position of given element
  var getElPosition = function (el) {
    var pos = {
      left: el.getBoundingClientRect().left,
      right: el.getBoundingClientRect().top
    };
    return pos;
  }

  // returns the mouse position w.r.t given element
  var getMousePosition = function (e, el) {
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
  var getLineEquation = function () {
    // var m = slope;
    // // y - y1 = m (x - x1) || mx - y + y1 - mx1 = 0
    // // return `y-${lines.l12.p1.y} = ${m} (x-${lines.l12.p1.x})`;
    // // y - mx = y1 - m*x1
    // return `y - ${m}x = ${lines.l12.p1.y - (m * lines.l12.p1.x)}`;
  }

  // get points coordinates with in the set
  var getSetPoints = function (currSetType) {
    var pointsObj = {};
    var set = document.querySelector('[data-panel="' + currSetType + '"]');
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

  var getLines = function (e) {
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

  var getSlope = function (line) {
    // m = (y2 - y1) / (x2 - x1)
    var m = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
    return math.parseToFloat(m, 2);
  }

  var calculatePerpendicularDistFromLine = function (line, point, m) {
    if (m == Infinity || m == -Infinity) return Math.abs(line.p1.x - point.x);
    return Math.abs((m * point.x - point.y + line.p1.y - m * line.p1.x) / (Math.sqrt(1 + m * m)));
  }

  var getCoords = function (pointsObj, side, point, m) {
    // console.log('getCoord');

    // y = m (x - x1) + y1
    // y = m (x - x2) + y2
    // console.log('Eq1: ', `y = ${m}(x - ${startPoint.x}) + ${startPoint.y}`)
    // console.log('Eq2: ', `y = ${-1/m}(x - ${currPoint.x}) + ${currPoint.y}`)    

    // x coordinate of intersection of two lines
    // var x = (m * (y2 - y1) + m * m * x1 - x2) / ((m * m) + m)

    var x, y;
    var s = initDraw.strokeWidth / 2;

    if (m == 0) {
      if (side == 1) {
        s = (pointsObj[1].x < pointsObj[3].x) ? -s : s;
      } else {
        s = (pointsObj[1].x < pointsObj[3].x) ? s : -s;
      }
      x = point.x;
      y = pointsObj[side].y + s;
    } else if (m == Infinity || m == -Infinity) {
      if (side == 1) {
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
      m = -1 / m;
      if (pointsObj[1].x > pointsObj[4].x) {
        if (side == 1) {
          x = x1 + Math.sqrt((s * s) / (1 + m * m));
        } else if (side == 3) {
          x = x1 - Math.sqrt((s * s) / (1 + m * m));
        }
        y = m * (x - x1) + y1
      } else {
        if (side == 1) {
          x = x1 - Math.sqrt((s * s) / (1 + m * m));
        } else if (side == 3) {
          x = x1 + Math.sqrt((s * s) / (1 + m * m));
        }
        y = m * (x - x1) + y1
      }
    }
    // console.log(`side: ${side} m: ${m}`)

    return {
      x: x,
      y: y
    }
  }

  var sideAndRange = function (currPoint) {
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
        if (side == 1 || side == 3) {
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
    parseToFloat: ParseToFloat,
    getMousePosition: getMousePosition,
    sideAndRange: sideAndRange,
    getSetPoints: getSetPoints,
    getCoords: getCoords
  }
})();

// document.querySelector('[data-tool-type1="pen"]').click();