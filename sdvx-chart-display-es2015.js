"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
{
  var showChart = function showChart(chartCanvas) {
    chartCanvas.width = 0;
    chartCanvas.height = 0;
    if (chartCanvas.getContext) {
      var objects = chartCanvas.dataset.chart.split(";").map(function (s) {
        return s.trim();
      }).filter(function (s) {
        return s;
      }).map(function (o) {
        return o.split(",").map(function (st) {
          return st.trim();
        }).filter(function (st) {
          return st;
        });
      });
      if (!objects.flatMap(function (d) {
        return d;
      }).includes("PREVIOUS")) {
        var random_data = objects.filter(function (d) {
          return d[0] == "RANDOM";
        }).flatMap(function (d) {
          return split(d.slice(1), 1);
        });
        var speed_data = objects.filter(function (d) {
          return d[0] == "SPEED";
        }).flatMap(function (d) {
          return split(d.slice(1), 1);
        });
        var color_data = objects.filter(function (d) {
          return d[0] == "COLOR";
        }).flatMap(function (d) {
          return split(d.slice(1), 2);
        });
        var width_data = objects.filter(function (d) {
          return d[0] == "WIDTH";
        }).flatMap(function (d) {
          return split(d.slice(1), 1);
        });
        var meter_data = objects.filter(function (d) {
          return d[0] == "METER";
        }).flatMap(function (d) {
          return split(d.slice(1), 2);
        });
        var meter_pos_data = meter_data.map(function (d) {
          return d.slice(1);
        });
        var bpm_data = objects.filter(function (d) {
          return d[0] == "BPM";
        }).flatMap(function (d) {
          return split(d.slice(1), 2);
        });
        var long_data = objects.filter(function (d) {
          return d[0] == "LONG";
        }).flatMap(function (d) {
          return split(d.slice(1), 3);
        });
        var chip_data = objects.filter(function (d) {
          return d[0] == "CHIP";
        }).flatMap(function (d) {
          return split(d.slice(1), 2);
        });
        var vol_point_data = objects.filter(function (d) {
          return d[0] == "VOL";
        }).flatMap(function (d) {
          return split(d.slice(1), 3);
        });
        if (random_data.length > 0 && random_data[0][0].length >= 8) {
          ButtonNames = {
            A: random_data[0][0][0],
            B: random_data[0][0][1],
            C: random_data[0][0][2],
            D: random_data[0][0][3],
            L: random_data[0][0][4],
            R: random_data[0][0][5]
          };
          DeviceNames = {
            L: random_data[0][0][6],
            R: random_data[0][0][7]
          };
        } else {
          ButtonNames = {
            A: "A",
            B: "B",
            C: "C",
            D: "D",
            L: "L",
            R: "R"
          };
          DeviceNames = {
            L: "L",
            R: "R"
          };
        }
        if (speed_data.length > 0 && Number.isFinite(Number(speed_data[0][0]))) {
          BarHeight = Const.BAR_HEIGHT * Number(speed_data[0][0]);
        } else {
          BarHeight = Const.BAR_HEIGHT;
        }
        if (color_data.length > 0 && color_data[0].length >= 2) {
          VolColors = {
            L: color_data[0][0] == "B" ? Const.VOL_L_COLOR : color_data[0][0] == "R" ? Const.VOL_R_COLOR : color_data[0][0] == "G" ? Const.VOL_G_COLOR : color_data[0][0] == "Y" ? Const.VOL_Y_COLOR : Const.VOL_L_COLOR,
            R: color_data[0][1] == "B" ? Const.VOL_L_COLOR : color_data[0][1] == "R" ? Const.VOL_R_COLOR : color_data[0][1] == "G" ? Const.VOL_G_COLOR : color_data[0][1] == "Y" ? Const.VOL_Y_COLOR : Const.VOL_R_COLOR
          };
          VolBorderColors = {
            L: color_data[0][0] == "B" ? Const.VOL_L_BORDER_COLOR : color_data[0][0] == "R" ? Const.VOL_R_BORDER_COLOR : color_data[0][0] == "G" ? Const.VOL_G_BORDER_COLOR : color_data[0][0] == "Y" ? Const.VOL_Y_BORDER_COLOR : Const.VOL_L_BORDER_COLOR,
            R: color_data[0][1] == "B" ? Const.VOL_L_BORDER_COLOR : color_data[0][1] == "R" ? Const.VOL_R_BORDER_COLOR : color_data[0][1] == "G" ? Const.VOL_G_BORDER_COLOR : color_data[0][1] == "Y" ? Const.VOL_Y_BORDER_COLOR : Const.VOL_R_BORDER_COLOR
          };
        } else {
          VolColors = {
            L: Const.VOL_L_COLOR,
            R: Const.VOL_R_COLOR
          };
          VolBorderColors = {
            L: Const.VOL_L_BORDER_COLOR,
            R: Const.VOL_R_BORDER_COLOR
          };
        }
        var last_pos;
        var all_data = [].concat(_toConsumableArray(meter_pos_data), _toConsumableArray(bpm_data), _toConsumableArray(long_data), _toConsumableArray(chip_data), _toConsumableArray(vol_point_data));
        last_pos = Fraction.Max.apply(Fraction, _toConsumableArray(all_data.flatMap(function (ds) {
          return ds.filter(function (s) {
            return Fraction.isFraction(s);
          }).map(function (s) {
            return new Fraction(s);
          });
        }))).toNumber();
        offScreenHeight = BarHeight * last_pos + Const.MARGIN_HEIGHT_UPPER + Const.MARGIN_HEIGHT_LOWER;
        offScreenWidth = Const.TOTAL_LANE_WIDTH * 2;
        if (width_data.length > 0) {
          TotalWidth = Number(width_data[0][0]) * Const.TOTAL_LANE_WIDTH;
        } else {
          var vols_lanes = vol_point_data.map(function (ds) {
            return Number(ds[2]);
          });
          var bpm_exists = bpm_data.length > 0;
          TotalWidth = Math.max(Math.max(Math.abs(vols_lanes.reduce(function (a, b) {
            return Math.max(a, b);
          }, 1) - 0.5), Math.abs(vols_lanes.reduce(function (a, b) {
            return Math.min(a, b);
          }, 0) - 0.5), 0.5) * 2 * Const.TOTAL_LANE_WIDTH, Const.TOTAL_LANE_WIDTH + Const.BPM_WIDTH * 2 * Number(bpm_exists));
        }
        offScreenCanvas = document.createElement("canvas");
        offScreenCanvas.width = offScreenWidth;
        offScreenCanvas.height = offScreenHeight;
        if (chartCanvas.dataset.songName in offScreenCanvasCache) {
          offScreenCanvasCache[chartCanvas.dataset.songName].push(offScreenCanvas);
        } else {
          offScreenCanvasCache[chartCanvas.dataset.songName] = [offScreenCanvas];
        }
        var offScreenCtx = offScreenCanvas.getContext("2d");
        drawBackground(offScreenCtx, meter_data);
        placeLongs(offScreenCtx, long_data);
        var vol_data = objects.filter(function (d) {
          return d[0] == "VOL";
        }).map(function (d) {
          return split(d.slice(1), 3);
        });
        placeVols(offScreenCtx, vol_data);
        placeChips(offScreenCtx, chip_data);
        placeBpm(offScreenCtx, bpm_data);
      }
      var range_data = objects.filter(function (d) {
        return d[0] == "RANGE";
      }).flatMap(function (d) {
        return split(d.slice(1), 2);
      });
      if (range_data.length > 0) {
        StartTiming = Fraction.stringToNumber(range_data[0][0]);
        TotalHeight = BarHeight * (Fraction.stringToNumber(range_data[0][1]) - Fraction.stringToNumber(range_data[0][0]));
        LowerMargin = 0;
      } else {
        StartTiming = 0;
        TotalHeight = offScreenHeight;
        LowerMargin = Const.MARGIN_HEIGHT_LOWER;
      }
      chartCanvas.setAttribute("width", "".concat(TotalWidth, "px"));
      chartCanvas.setAttribute("height", "".concat(TotalHeight, "px"));
      var ctx = chartCanvas.getContext('2d');
      ctx.drawImage(offScreenCanvas, (chartCanvas.width - offScreenCanvas.width) / 2, chartCanvas.height - offScreenCanvas.height + StartTiming * BarHeight + Const.MARGIN_HEIGHT_LOWER);
    } else {}
  };
  var clearCache = function clearCache(songName) {
    offScreenCanvasCache[songName].forEach(function (c) {
      c.height = 0;
      c.width = 0;
      c.remove();
    });
    delete offScreenCanvasCache[songName];
  };
  var setTransform = function setTransform(ctx, forVolL, forVolR) {
    if (forVolL) {
      ctx.setTransform(1, 0, 0, -1, (ctx.canvas.width - Const.TOTAL_LANE_WIDTH) / 2, ctx.canvas.height - Const.MARGIN_HEIGHT_LOWER);
    } else if (forVolR) {
      ctx.setTransform(-1, 0, 0, -1, ctx.canvas.width - (ctx.canvas.width - Const.TOTAL_LANE_WIDTH) / 2, ctx.canvas.height - Const.MARGIN_HEIGHT_LOWER);
    } else {
      ctx.setTransform(1, 0, 0, -1, ctx.canvas.width / 2, ctx.canvas.height - Const.MARGIN_HEIGHT_LOWER);
    }
  };
  var drawBackground = function drawBackground(ctx, data) {
    ctx.setTransform(1, 0, 0, -1, (ctx.canvas.width - Const.TOTAL_LANE_WIDTH) / 2, ctx.canvas.height);
    ctx.fillStyle = Const.LANE_BT_COLOR;
    ctx.fillRect(0, 0, Const.TOTAL_LANE_WIDTH, ctx.canvas.height);
    ctx.fillStyle = Const.LANE_VOL_L_COLOR;
    ctx.fillRect(0, 0, Const.LASER_LANE_WIDTH, ctx.canvas.height);
    ctx.fillStyle = Const.LANE_VOL_R_COLOR;
    ctx.fillRect(Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH, 0, Const.LASER_LANE_WIDTH, ctx.canvas.height);
    ctx.lineWidth = Const.LINE_WIDTH;
    ctx.strokeStyle = Const.LANE_VOL_L_BORDER_COLOR;
    ctx.beginPath();
    ctx.moveTo(Const.LASER_LANE_WIDTH, 0);
    ctx.lineTo(Const.LASER_LANE_WIDTH, ctx.canvas.height);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, ctx.canvas.height);
    ctx.stroke();
    ctx.strokeStyle = Const.LANE_VOL_R_BORDER_COLOR;
    ctx.beginPath();
    ctx.moveTo(Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH, 0);
    ctx.lineTo(Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH, ctx.canvas.height);
    ctx.moveTo(Const.TOTAL_LANE_WIDTH, 0);
    ctx.lineTo(Const.TOTAL_LANE_WIDTH, ctx.canvas.height);
    ctx.stroke();
    ctx.strokeStyle = Const.LANE_BT_BORDER_COLOR;
    ctx.beginPath();
    ctx.moveTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 1, 0);
    ctx.lineTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 1, ctx.canvas.height);
    ctx.moveTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 2, 0);
    ctx.lineTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 2, ctx.canvas.height);
    ctx.moveTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 3, 0);
    ctx.lineTo(Const.LASER_LANE_WIDTH + Const.SINGLE_LANE_WIDTH * 3, ctx.canvas.height);
    ctx.stroke();
    ctx.strokeStyle = Const.BAR_LINE_COLOR;
    ctx.setTransform(1, 0, 0, -1, (ctx.canvas.width - Const.TOTAL_LANE_WIDTH) / 2, ctx.canvas.height - Const.MARGIN_HEIGHT_LOWER);
    if (data.length > 0) {
      var currentBarHeight;
      var currentPos = new Fraction();
      for (var barLineHeight = 0; barLineHeight < ctx.canvas.height; barLineHeight += currentBarHeight) {
        ctx.beginPath();
        ctx.moveTo(0, barLineHeight);
        ctx.lineTo(Const.TOTAL_LANE_WIDTH, barLineHeight);
        ctx.stroke();
        var targetIndex = data.findIndex(function (d) {
          return Fraction.Equal(Fraction.Max(new Fraction(d[1]), currentPos), new Fraction(d[1])) && !Fraction.Equal(new Fraction(d[1]), currentPos);
        }) - 1;
        if (targetIndex < 0) {
          targetIndex = data.length - 1;
        }
        var targetData = data[targetIndex];
        var targetPos = new Fraction(targetData[0]);
        currentBarHeight = targetPos.toNumber() * BarHeight;
        currentPos = Fraction.Add(currentPos, targetPos);
      }
    } else {
      for (var _barLineHeight = 0; _barLineHeight < ctx.canvas.height; _barLineHeight += BarHeight) {
        ctx.beginPath();
        ctx.moveTo(0, _barLineHeight);
        ctx.lineTo(Const.TOTAL_LANE_WIDTH, _barLineHeight);
        ctx.stroke();
      }
    }
  };
  var placeLongs = function placeLongs(ctx, data) {
    data.forEach(function (d) {
      if (d[0].includes(ButtonNames["L"])) {
        placeLongFX(ctx, "L", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]));
      }
      if (d[0].includes(ButtonNames["R"])) {
        placeLongFX(ctx, "R", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]));
      }
    });
    data.forEach(function (d) {
      if (d[0].includes(ButtonNames["A"])) {
        placeLongBT(ctx, "A", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]));
      }
      if (d[0].includes(ButtonNames["B"])) {
        placeLongBT(ctx, "B", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]));
      }
      if (d[0].includes(ButtonNames["C"])) {
        placeLongBT(ctx, "C", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]));
      }
      if (d[0].includes(ButtonNames["D"])) {
        placeLongBT(ctx, "D", Fraction.stringToNumber(d[1]), Fraction.stringToNumber(d[2]));
      }
    });
  };
  var placeVols = function placeVols(ctx, data) {
    var ctx_orig = ctx;
    var osc = document.createElement("canvas");
    osc.width = ctx.canvas.width;
    osc.height = ctx.canvas.height;
    ctx = osc.getContext("2d");
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = Const.LINE_WIDTH;
    data.forEach(function (point_data) {
      var strokePath = new Path2D();
      var fillPath = new Path2D();
      if (point_data[0][0] != DeviceNames["L"] && point_data[0][0] != DeviceNames["R"]) {
        console.error("レーザー開始点の情報がありません");
      }
      var previous;
      var previousVerticalStartLane;
      point_data.forEach(function (d) {
        if (d[0] == DeviceNames["L"] || d[0] == DeviceNames["R"]) {
          var startPos = Fraction.stringToNumber(d[1]);
          var startLane = Number(d[2]);
          var markerStartX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane;
          var markerTopX = markerStartX + Const.LASER_WIDTH / 2;
          var markerEndX = markerStartX + Const.LASER_WIDTH;
          var markerTopY = BarHeight * startPos;
          var markerStartY = markerTopY - 18;
          var startSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane;
          var startLargerX = startSmallerX + Const.LASER_WIDTH;
          var startY = BarHeight * startPos;
          if (d[0] == DeviceNames["L"]) {
            setTransform(ctx, true, false);
            ctx.fillStyle = VolColors["L"];
            ctx.strokeStyle = VolBorderColors["L"];
          } else if (d[0] == DeviceNames["R"]) {
            setTransform(ctx, false, true);
            ctx.fillStyle = VolColors["R"];
            ctx.strokeStyle = VolBorderColors["R"];
          }
          ctx.beginPath();
          ctx.moveTo(markerStartX, markerStartY);
          ctx.lineTo(markerTopX, markerTopY);
          ctx.lineTo(markerEndX, markerStartY);
          ctx.moveTo(markerStartX, markerStartY - 12);
          ctx.lineTo(markerTopX, markerTopY - 12);
          ctx.lineTo(markerEndX, markerStartY - 12);
          ctx.moveTo(markerStartX, markerStartY - 24);
          ctx.lineTo(markerTopX, markerTopY - 24);
          ctx.lineTo(markerEndX, markerStartY - 24);
          ctx.stroke();
          strokePath.moveTo(startSmallerX, startY);
          strokePath.lineTo(startLargerX, startY);
        } else if (d[0] == "VERTICAL") {
          if (previous[0] == "VERTICAL") {
            console.error("直角同士が隣接しています");
          }
          previousVerticalStartLane = Number(previous[2]);
        } else if (d[0].slice(0, 8) == "STRAIGHT") {
          var startPosDelay = 0;
          if (previous[0] == "VERTICAL") {
            var pos = Fraction.stringToNumber(previous[1]);
            var _startLane = previousVerticalStartLane;
            var _endLane = Number(previous[2]);
            var startX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _startLane + Const.LASER_WIDTH * Number(_startLane > _endLane);
            var _startLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _startLane + Const.LASER_WIDTH * Number(_startLane < _endLane);
            var parallelX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _endLane + Const.LASER_WIDTH * Number(_startLane > _endLane);
            var endX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _endLane + Const.LASER_WIDTH * Number(_startLane < _endLane);
            var _startY = BarHeight * pos;
            var _endY = _startY + BarHeight / 32;
            var parallelY = _startY + Const.LASER_VERTICAL_HEIGHT;
            var _path = new Path2D();
            _path.moveTo(startX, _startY);
            _path.lineTo(startX, parallelY);
            _path.lineTo(parallelX, parallelY);
            _path.lineTo(parallelX, _endY);
            _path.lineTo(endX, _endY);
            _path.lineTo(endX, _startY);
            _path.closePath();
            fillPath.addPath(_path);
            strokePath.moveTo(startX, _startY);
            strokePath.lineTo(startX, parallelY);
            strokePath.lineTo(parallelX, parallelY);
            strokePath.lineTo(parallelX, _endY);
            strokePath.moveTo(endX, _endY);
            strokePath.lineTo(endX, _startY);
            strokePath.lineTo(_startLargerX, _startY);
            startPosDelay = 1 / 32;
          }
          var _startPos = Fraction.stringToNumber(previous[1]) + startPosDelay;
          var endPos = Fraction.stringToNumber(d[1]);
          var _startLane2 = Number(previous[2]);
          var endLane = Number(d[2]);
          var _startSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _startLane2;
          var _startLargerX2 = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _startLane2 + Const.LASER_WIDTH;
          var _startY2 = BarHeight * _startPos;
          var endSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane;
          var endLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH;
          var endY = BarHeight * endPos;
          var path = new Path2D();
          path.moveTo(_startSmallerX, _startY2);
          path.lineTo(endSmallerX, endY);
          path.lineTo(endLargerX, endY);
          path.lineTo(_startLargerX2, _startY2);
          path.closePath();
          fillPath.addPath(path);
          strokePath.moveTo(_startSmallerX, _startY2);
          strokePath.lineTo(endSmallerX, endY);
          strokePath.moveTo(endLargerX, endY);
          strokePath.lineTo(_startLargerX2, _startY2);
        } else if (d[0].includes("CURVE")) {
          if (previous[0] == "VERTICAL") {
            var verticalPos = Fraction.stringToNumber(previous[1]);
            var verticalStartLane = previousVerticalStartLane;
            var verticalEndLane = Number(previous[2]);
            var verticalStartX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * verticalStartLane + Const.LASER_WIDTH * Number(verticalStartLane > verticalEndLane);
            var verticalStartLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * verticalStartLane + Const.LASER_WIDTH * Number(verticalStartLane < verticalEndLane);
            var verticalParallelX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * verticalEndLane + Const.LASER_WIDTH * Number(verticalStartLane > verticalEndLane);
            var verticalEndX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * verticalEndLane + Const.LASER_WIDTH * Number(verticalStartLane < verticalEndLane);
            var verticalStartY = BarHeight * verticalPos;
            var verticalEndY = verticalStartY + BarHeight / 32;
            var verticalParallelY = verticalStartY + Const.LASER_VERTICAL_HEIGHT;
            var _startPos2 = Fraction.stringToNumber(previous[1]);
            var _endPos = Fraction.stringToNumber(d[1]);
            var _startLane3 = Number(previous[2]);
            var _endLane2 = Number(d[2]);
            var _startSmallerX2 = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _startLane3;
            var _startLargerX3 = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _startLane3 + Const.LASER_WIDTH;
            var _startY3 = BarHeight * _startPos2;
            var _endSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _endLane2;
            var _endLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _endLane2 + Const.LASER_WIDTH;
            var _endY2 = BarHeight * _endPos;
            var startCpSmallerX;
            var startCpLargerX;
            var startCpY;
            var endCpSmallerX;
            var endCpLargerX;
            var endCpY;
            if (d[0].includes("INOUT")) {
              startCpSmallerX = _startSmallerX2;
              startCpLargerX = _startLargerX3;
              startCpY = (_startY3 + _endY2) / 2;
              endCpSmallerX = _endSmallerX;
              endCpLargerX = _endLargerX;
              endCpY = (_startY3 + _endY2) / 2;
            } else if (d[0].includes("IN")) {
              startCpSmallerX = _startSmallerX2;
              startCpLargerX = _startLargerX3;
              startCpY = (_startY3 + _endY2) / 2;
              endCpSmallerX = _endSmallerX;
              endCpLargerX = _endLargerX;
              endCpY = _endY2;
            } else if (d[0].includes("OUT")) {
              startCpSmallerX = _startSmallerX2;
              startCpLargerX = _startLargerX3;
              startCpY = _startY3;
              endCpSmallerX = _endSmallerX;
              endCpLargerX = _endLargerX;
              endCpY = (_startY3 + _endY2) / 2;
            } else if (d[0].includes("STRAIGHT")) {
              startCpSmallerX = _startSmallerX2;
              startCpLargerX = _startLargerX3;
              startCpY = _startY3;
              endCpSmallerX = _endSmallerX;
              endCpLargerX = _endLargerX;
              endCpY = _endY2;
            } else {
              console.error("カーブのタイプ指定が見つかりません");
            }
            var curveSmallerPoints = clipCurve([_startSmallerX2, _startY3, startCpSmallerX, startCpY, endCpSmallerX, endCpY, _endSmallerX, _endY2], verticalParallelY);
            var curveLargerPoints = clipCurve([_startLargerX3, _startY3, startCpLargerX, startCpY, endCpLargerX, endCpY, _endLargerX, _endY2], verticalParallelY);
            var _path2 = new Path2D();
            if (verticalStartLane < verticalEndLane) {
              _path2.moveTo(verticalStartX, verticalStartY);
              _path2.lineTo(verticalStartX, verticalParallelY);
              _path2.lineTo(curveSmallerPoints[0], curveSmallerPoints[1]);
              _path2.bezierCurveTo(curveSmallerPoints[2], curveSmallerPoints[3], curveSmallerPoints[4], curveSmallerPoints[5], curveSmallerPoints[6], curveSmallerPoints[7]);
              _path2.lineTo(curveLargerPoints[6], curveLargerPoints[7]);
              _path2.bezierCurveTo(endCpLargerX, endCpY, startCpLargerX, startCpY, _startLargerX3, _startY3);
              _path2.lineTo(verticalStartX, verticalStartY);
            } else {
              _path2.moveTo(verticalStartX, verticalStartY);
              _path2.lineTo(verticalStartX, verticalParallelY);
              _path2.lineTo(curveLargerPoints[0], curveLargerPoints[1]);
              _path2.bezierCurveTo(curveLargerPoints[2], curveLargerPoints[3], curveLargerPoints[4], curveLargerPoints[5], curveLargerPoints[6], curveLargerPoints[7]);
              _path2.lineTo(curveSmallerPoints[6], curveSmallerPoints[7]);
              _path2.bezierCurveTo(endCpSmallerX, endCpY, startCpSmallerX, startCpY, _startSmallerX2, _startY3);
              _path2.lineTo(verticalStartX, verticalStartY);
            }
            _path2.closePath();
            fillPath.addPath(_path2);
            if (verticalStartLane < verticalEndLane) {
              strokePath.moveTo(verticalStartX, verticalStartY);
              strokePath.lineTo(verticalStartX, verticalParallelY);
              strokePath.lineTo(curveSmallerPoints[0], curveSmallerPoints[1]);
              strokePath.bezierCurveTo(curveSmallerPoints[2], curveSmallerPoints[3], curveSmallerPoints[4], curveSmallerPoints[5], curveSmallerPoints[6], curveSmallerPoints[7]);
              strokePath.moveTo(curveLargerPoints[6], curveLargerPoints[7]);
              strokePath.bezierCurveTo(endCpLargerX, endCpY, startCpLargerX, startCpY, _startLargerX3, _startY3);
              strokePath.lineTo(verticalStartLargerX, verticalStartY);
            } else {
              strokePath.moveTo(verticalStartX, verticalStartY);
              strokePath.lineTo(verticalStartX, verticalParallelY);
              strokePath.lineTo(curveLargerPoints[0], curveLargerPoints[1]);
              strokePath.bezierCurveTo(curveLargerPoints[2], curveLargerPoints[3], curveLargerPoints[4], curveLargerPoints[5], curveLargerPoints[6], curveLargerPoints[7]);
              strokePath.moveTo(curveSmallerPoints[6], curveSmallerPoints[7]);
              strokePath.bezierCurveTo(endCpSmallerX, endCpY, startCpSmallerX, startCpY, _startSmallerX2, _startY3);
              strokePath.lineTo(verticalStartLargerX, verticalStartY);
            }
          } else {
            var _startPos3 = Fraction.stringToNumber(previous[1]);
            var _endPos2 = Fraction.stringToNumber(d[1]);
            var _startLane4 = Number(previous[2]);
            var _endLane3 = Number(d[2]);
            var _startSmallerX3 = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _startLane4;
            var _startLargerX4 = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _startLane4 + Const.LASER_WIDTH;
            var _startY4 = BarHeight * _startPos3;
            var _endSmallerX2 = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _endLane3;
            var _endLargerX2 = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _endLane3 + Const.LASER_WIDTH;
            var _endY3 = BarHeight * _endPos2;
            var _startCpSmallerX;
            var _startCpLargerX;
            var _startCpY;
            var _endCpSmallerX;
            var _endCpLargerX;
            var _endCpY;
            if (d[0].includes("INOUT")) {
              _startCpSmallerX = _startSmallerX3;
              _startCpLargerX = _startLargerX4;
              _startCpY = (_startY4 + _endY3) / 2;
              _endCpSmallerX = _endSmallerX2;
              _endCpLargerX = _endLargerX2;
              _endCpY = (_startY4 + _endY3) / 2;
            } else if (d[0].includes("IN")) {
              _startCpSmallerX = _startSmallerX3;
              _startCpLargerX = _startLargerX4;
              _startCpY = (_startY4 + _endY3) / 2;
              _endCpSmallerX = _endSmallerX2;
              _endCpLargerX = _endLargerX2;
              _endCpY = _endY3;
            } else if (d[0].includes("OUT")) {
              _startCpSmallerX = _startSmallerX3;
              _startCpLargerX = _startLargerX4;
              _startCpY = _startY4;
              _endCpSmallerX = _endSmallerX2;
              _endCpLargerX = _endLargerX2;
              _endCpY = (_startY4 + _endY3) / 2;
            } else if (d[0].includes("STRAIGHT")) {
              _startCpSmallerX = _startSmallerX3;
              _startCpLargerX = _startLargerX4;
              _startCpY = _startY4;
              _endCpSmallerX = _endSmallerX2;
              _endCpLargerX = _endLargerX2;
              _endCpY = _endY3;
            } else {
              console.error("カーブのタイプ指定が見つかりません");
            }
            var _path3 = new Path2D();
            _path3.moveTo(_startSmallerX3, _startY4);
            _path3.bezierCurveTo(_startCpSmallerX, _startCpY, _endCpSmallerX, _endCpY, _endSmallerX2, _endY3);
            _path3.lineTo(_endLargerX2, _endY3);
            _path3.bezierCurveTo(_endCpLargerX, _endCpY, _startCpLargerX, _startCpY, _startLargerX4, _startY4);
            _path3.closePath();
            fillPath.addPath(_path3);
            strokePath.moveTo(_startSmallerX3, _startY4);
            strokePath.bezierCurveTo(_startCpSmallerX, _startCpY, _endCpSmallerX, _endCpY, _endSmallerX2, _endY3);
            strokePath.moveTo(_endLargerX2, _endY3);
            strokePath.bezierCurveTo(_endCpLargerX, _endCpY, _startCpLargerX, _startCpY, _startLargerX4, _startY4);
          }
        } else {
          console.error("".concat(d[0], "\u306B\u5BFE\u5FDC\u3059\u308B\u5F62\u72B6\u306F\u5B9F\u88C5\u3055\u308C\u3066\u3044\u307E\u305B\u3093"));
        }
        previous = d;
      });
      if (previous[0] == "VERTICAL") {
        var pos = Fraction.stringToNumber(previous[1]);
        var startLane = previousVerticalStartLane;
        var endLane = Number(previous[2]);
        var startX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane + Const.LASER_WIDTH * Number(startLane > endLane);
        var startLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * startLane + Const.LASER_WIDTH * Number(startLane < endLane);
        var parallelX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH * Number(startLane > endLane);
        var endX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * endLane + Const.LASER_WIDTH * Number(startLane < endLane);
        var startY = BarHeight * pos;
        var endY = startY + Const.LASER_END_HEIGHT;
        var parallelY = startY + Const.LASER_VERTICAL_HEIGHT;
        var path = new Path2D();
        path.moveTo(startX, startY);
        path.lineTo(startX, parallelY);
        path.lineTo(parallelX, parallelY);
        path.lineTo(parallelX, endY);
        path.lineTo(endX, endY);
        path.lineTo(endX, startY);
        path.closePath();
        fillPath.addPath(path);
        strokePath.moveTo(startX, startY);
        strokePath.lineTo(startX, parallelY);
        strokePath.lineTo(parallelX, parallelY);
        strokePath.lineTo(parallelX, endY);
        strokePath.lineTo(endX, endY);
        strokePath.lineTo(endX, startY);
        strokePath.lineTo(startLargerX, startY);
      } else {
        var endPos = Fraction.stringToNumber(previous[1]);
        var _endLane4 = Number(previous[2]);
        var endSmallerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _endLane4;
        var endLargerX = (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH) * _endLane4 + Const.LASER_WIDTH;
        var _endY4 = BarHeight * endPos;
        strokePath.moveTo(endSmallerX, _endY4);
        strokePath.lineTo(endLargerX, _endY4);
      }
      ctx.fill(fillPath);
      ctx.stroke(strokePath);
    });
    ctx_orig.setTransform(1, 0, 0, 1, 0, 0);
    ctx_orig.drawImage(osc, 0, 0);
    ctx = ctx_orig;
    osc.width = 0;
    osc.height = 0;
    osc.remove();
    //delete osc
  };
  var placeChips = function placeChips(ctx, data) {
    var hashOfChipFX = {};
    data.forEach(function (d) {
      if (d[0].includes(ButtonNames["L"]) && !d[0].includes(ButtonNames["L"] + "SE")) {
        placeChipFX(ctx, "L", Fraction.stringToNumber(d[1]), false);
        var posFraction = new Fraction(d[1]);
        var keyExists = false;
        Object.keys(hashOfChipFX).forEach(function (k) {
          var keyFraction = new Fraction(k);
          if (Fraction.Equal(keyFraction, posFraction)) {
            hashOfChipFX[k].concat("L");
            keyExists = true;
          }
        });
        if (!keyExists) {
          hashOfChipFX[d[1]] = "L";
        }
      }
      if (d[0].includes(ButtonNames["R"]) && !d[0].includes(ButtonNames["R"] + "SE")) {
        placeChipFX(ctx, "R", Fraction.stringToNumber(d[1]), false);
        var _posFraction = new Fraction(d[1]);
        var _keyExists = false;
        Object.keys(hashOfChipFX).forEach(function (k) {
          var keyFraction = new Fraction(k);
          if (Fraction.Equal(keyFraction, _posFraction)) {
            hashOfChipFX[k].concat("R");
            _keyExists = true;
          }
        });
        if (!_keyExists) {
          hashOfChipFX[d[1]] = "R";
        }
      }
      if (d[0].includes(ButtonNames["L"] + "SE")) {
        placeChipFX(ctx, "L", Fraction.stringToNumber(d[1]), true);
        var _posFraction2 = new Fraction(d[1]);
        var _keyExists2 = false;
        Object.keys(hashOfChipFX).forEach(function (k) {
          var keyFraction = new Fraction(k);
          if (Fraction.Equal(keyFraction, _posFraction2)) {
            hashOfChipFX[k].concat("L");
            _keyExists2 = true;
          }
        });
        if (!_keyExists2) {
          hashOfChipFX[d[1]] = "L";
        }
      }
      if (d[0].includes(ButtonNames["R"] + "SE")) {
        placeChipFX(ctx, "R", Fraction.stringToNumber(d[1]), true);
        var _posFraction3 = new Fraction(d[1]);
        var _keyExists3 = false;
        Object.keys(hashOfChipFX).forEach(function (k) {
          var keyFraction = new Fraction(k);
          if (Fraction.Equal(keyFraction, _posFraction3)) {
            hashOfChipFX[k].concat("R");
            _keyExists3 = true;
          }
        });
        if (!_keyExists3) {
          hashOfChipFX[d[1]] = "R";
        }
      }
    });
    data.forEach(function (d) {
      if (d[0].includes(ButtonNames["A"])) {
        var fxExists = false;
        var posFraction = new Fraction(d[1]);
        Object.keys(hashOfChipFX).forEach(function (k) {
          var keyFraction = new Fraction(k);
          if (Fraction.Equal(keyFraction, posFraction)) {
            fxExists = hashOfChipFX[k].includes("L");
          }
        });
        placeChipBT(ctx, "A", Fraction.stringToNumber(d[1]), fxExists);
      }
      if (d[0].includes(ButtonNames["B"])) {
        var _fxExists = false;
        var _posFraction4 = new Fraction(d[1]);
        Object.keys(hashOfChipFX).forEach(function (k) {
          var keyFraction = new Fraction(k);
          if (Fraction.Equal(keyFraction, _posFraction4)) {
            _fxExists = hashOfChipFX[k].includes("L");
          }
        });
        placeChipBT(ctx, "B", Fraction.stringToNumber(d[1]), _fxExists);
      }
      if (d[0].includes(ButtonNames["C"])) {
        var _fxExists2 = false;
        var _posFraction5 = new Fraction(d[1]);
        Object.keys(hashOfChipFX).forEach(function (k) {
          var keyFraction = new Fraction(k);
          if (Fraction.Equal(keyFraction, _posFraction5)) {
            _fxExists2 = hashOfChipFX[k].includes("R");
          }
        });
        placeChipBT(ctx, "C", Fraction.stringToNumber(d[1]), _fxExists2);
      }
      if (d[0].includes(ButtonNames["D"])) {
        var _fxExists3 = false;
        var _posFraction6 = new Fraction(d[1]);
        Object.keys(hashOfChipFX).forEach(function (k) {
          var keyFraction = new Fraction(k);
          if (Fraction.Equal(keyFraction, _posFraction6)) {
            _fxExists3 = hashOfChipFX[k].includes("R");
          }
        });
        placeChipBT(ctx, "D", Fraction.stringToNumber(d[1]), _fxExists3);
      }
    });
  };
  var placeBpm = function placeBpm(ctx, data) {
    ctx.font = Const.BPM_FONT;
    ctx.textAlign = "right";
    ctx.setTransform(1, 0, 0, 1, (ctx.canvas.width - Const.TOTAL_LANE_WIDTH) / 2, ctx.canvas.height - Const.MARGIN_HEIGHT_LOWER);
    var previousBpm;
    data.forEach(function (d) {
      ctx.fillStyle = previousBpm ? previousBpm > Number(d[0]) ? Const.BPM_LOWER_COLOR : previousBpm < Number(d[0]) ? Const.BPM_UPPER_COLOR : Const.BPM_NORMAL_COLOR : Const.BPM_NORMAL_COLOR;
      previousBpm = Number(d[0]);
      ctx.fillText(d[0], 0, -BarHeight * Fraction.stringToNumber(d[1]));
    });
  };
  var placeLongFX = function placeLongFX(ctx, buttonName, startPos, endPos) {
    var fillRect1;
    var fillRect2 = BarHeight * startPos;
    var fillRect3;
    var fillRect4 = BarHeight * (endPos - startPos);
    if (buttonName == "L") {
      fillRect1 = -0;
      fillRect3 = -Const.LONG_FX_WIDTH;
    } else if (buttonName == "R") {
      fillRect1 = 0;
      fillRect3 = Const.LONG_FX_WIDTH;
    } else {
      console.error("FXButtonName \"".concat(buttonName, "\"\u306F\u5B58\u5728\u3057\u307E\u305B\u3093"));
    }
    setTransform(ctx, false, false);
    ctx.fillStyle = Const.LONG_FX_COLOR;
    ctx.fillRect(fillRect1, fillRect2, fillRect3, fillRect4);
  };
  var placeLongBT = function placeLongBT(ctx, buttonName, startPos, endPos) {
    var fillRect1;
    var fillRect2 = BarHeight * startPos;
    var fillRect3;
    var fillRect4 = BarHeight * (endPos - startPos);
    if (buttonName == "A") {
      fillRect1 = -Const.SINGLE_LANE_WIDTH - (Const.SINGLE_LANE_WIDTH - Const.LONG_BT_WIDTH) / 2;
      fillRect3 = -Const.LONG_BT_WIDTH;
    } else if (buttonName == "B") {
      fillRect1 = -(Const.SINGLE_LANE_WIDTH - Const.LONG_BT_WIDTH) / 2;
      fillRect3 = -Const.LONG_BT_WIDTH;
    } else if (buttonName == "C") {
      fillRect1 = (Const.SINGLE_LANE_WIDTH - Const.LONG_BT_WIDTH) / 2;
      fillRect3 = Const.LONG_BT_WIDTH;
    } else if (buttonName == "D") {
      fillRect1 = Const.SINGLE_LANE_WIDTH + (Const.SINGLE_LANE_WIDTH - Const.LONG_BT_WIDTH) / 2;
      fillRect3 = Const.LONG_BT_WIDTH;
    } else {
      console.error("BTButtonName \"".concat(buttonName, "\"\u306F\u5B58\u5728\u3057\u307E\u305B\u3093"));
    }
    setTransform(ctx, false, false);
    ctx.fillStyle = Const.LONG_BT_COLOR;
    ctx.fillRect(fillRect1, fillRect2, fillRect3, fillRect4);
  };
  var placeChipFX = function placeChipFX(ctx, buttonName, pos, isSE) {
    setTransform(ctx, false, false);
    var fillRect1;
    var fillRect2 = BarHeight * pos;
    var fillRect3;
    var fillRect4 = Const.CHIP_FX_HEIGHT;
    if (buttonName == "L") {
      fillRect1 = -(Const.SINGLE_LANE_WIDTH * 2 - Const.CHIP_FX_WIDTH) / 2;
      fillRect3 = -Const.CHIP_FX_WIDTH;
    } else if (buttonName == "R") {
      fillRect1 = (Const.SINGLE_LANE_WIDTH * 2 - Const.CHIP_FX_WIDTH) / 2;
      fillRect3 = Const.CHIP_FX_WIDTH;
    } else {}
    if (isSE) {
      ctx.fillStyle = Const.CHIP_FX_SE_COLOR;
    } else {
      ctx.fillStyle = Const.CHIP_FX_COLOR;
    }
    ctx.fillRect(fillRect1, fillRect2, fillRect3, fillRect4);
  };
  var placeChipBT = function placeChipBT(ctx, buttonName, pos, onChipFX) {
    setTransform(ctx, false, false);
    var fillRect1;
    var fillRect2 = BarHeight * pos;
    var fillRect3;
    var fillRect4 = Const.CHIP_BT_HEIGHT;
    ctx.fillStyle = Const.CHIP_BT_COLOR;
    if (buttonName == "A") {
      fillRect1 = -Const.SINGLE_LANE_WIDTH - (Const.SINGLE_LANE_WIDTH - (onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH)) / 2;
      fillRect3 = onChipFX ? -Const.LONG_BT_WIDTH : -Const.CHIP_BT_WIDTH;
    } else if (buttonName == "B") {
      fillRect1 = -(Const.SINGLE_LANE_WIDTH - (onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH)) / 2;
      fillRect3 = onChipFX ? -Const.LONG_BT_WIDTH : -Const.CHIP_BT_WIDTH;
    } else if (buttonName == "C") {
      fillRect1 = (Const.SINGLE_LANE_WIDTH - (onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH)) / 2;
      fillRect3 = onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH;
    } else if (buttonName == "D") {
      fillRect1 = Const.SINGLE_LANE_WIDTH + (Const.SINGLE_LANE_WIDTH - (onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH)) / 2;
      fillRect3 = onChipFX ? Const.LONG_BT_WIDTH : Const.CHIP_BT_WIDTH;
    }
    ctx.fillRect(fillRect1, fillRect2, fillRect3, fillRect4);
  };
  /**
   * 
   * @param {number[]} curvePoints 
   * @param {number} laserParallelHeight 
   * @returns {number[]}
   */
  var clipCurve = function clipCurve(curvePoints, laserParallelHeight) {
    var _curvePoints = _slicedToArray(curvePoints, 8),
      startX = _curvePoints[0],
      startY = _curvePoints[1],
      startCpX = _curvePoints[2],
      startCpY = _curvePoints[3],
      endCpX = _curvePoints[4],
      endCpY = _curvePoints[5],
      endX = _curvePoints[6],
      endY = _curvePoints[7];
    var t = solveEquationForBezierCurve(startY, startCpY, endCpY, endY, laserParallelHeight);
    if (t) {
      var newCurvePoints = clipNewBezierCurve(startX, startY, startCpX, startCpY, endCpX, endCpY, endX, endY, t, 1);
      return newCurvePoints;
    }
  };
  var clipNewBezierCurve = function clipNewBezierCurve(x1, y1, x2, y2, x3, y3, x4, y4, t1, t2) {
    var t1p = 1 - t1;
    var t2p = 1 - t2;
    var nx1 = t1p * t1p * t1p * x1 + 3 * t1 * t1p * t1p * x2 + 3 * t1 * t1 * t1p * x3 + t1 * t1 * t1 * x4;
    var ny1 = t1p * t1p * t1p * y1 + 3 * t1 * t1p * t1p * y2 + 3 * t1 * t1 * t1p * y3 + t1 * t1 * t1 * y4;
    var nx2 = t1p * t1p * (t2p * x1 + t2 * x2) + 2 * t1p * t1 * (t2p * x2 + t2 * x3) + t1 * t1 * (t2p * x3 + t2 * x4);
    var ny2 = t1p * t1p * (t2p * y1 + t2 * y2) + 2 * t1p * t1 * (t2p * y2 + t2 * y3) + t1 * t1 * (t2p * y3 + t2 * y4);
    var nx3 = t2p * t2p * (t1p * x1 + t1 * x2) + 2 * t2p * t2 * (t1p * x2 + t1 * x3) + t2 * t2 * (t1p * x3 + t1 * x4);
    var ny3 = t2p * t2p * (t1p * y1 + t1 * y2) + 2 * t2p * t2 * (t1p * y2 + t1 * y3) + t2 * t2 * (t1p * y3 + t1 * y4);
    var nx4 = t2p * t2p * t2p * x1 + 3 * t2 * t2p * t2p * x2 + 3 * t2 * t2 * t2p * x3 + t2 * t2 * t2 * x4;
    var ny4 = t2p * t2p * t2p * y1 + 3 * t2 * t2p * t2p * y2 + 3 * t2 * t2 * t2p * y3 + t2 * t2 * t2 * y4;
    return [nx1, ny1, nx2, ny2, nx3, ny3, nx4, ny4];
  };
  var solveEquationForBezierCurve = function solveEquationForBezierCurve(p1, p2, p3, p4, p) {
    var ap = -p1 + 3 * p2 - 3 * p3 + p4;
    var bp = 3 * p1 - 6 * p2 + 3 * p3;
    var cp = -3 * p1 + 3 * p2;
    var dp = p1 - p;
    var pt = solveCubicEquation(ap, bp, cp, dp);
    var targetP = pt.filter(function (v, i) {
      return i % 2 === 0;
    }).map(function (v) {
      return round(v, 10);
    }).sort(function (a, b) {
      return a < b ? -1 : 1;
    }).find(function (v) {
      return 0 <= v && v <= 1;
    });
    return targetP;
  };
  var solveCubicEquation = function solveCubicEquation(a, b, c, d) {
    var p = c / a - b * b / 3 / a / a;
    var q = 2 * b * b * b / 27 / a / a / a - b * c / 3 / a / a + d / a;
    var d2 = 81 * q * q + 12 * p * p * p;
    var d_r = 0;
    var d_i = 0;
    var v3_r;
    var v3_i;
    if (d2 < 0) {
      d_i = Math.sqrt(-d2);
    } else {
      d_r = Math.sqrt(d2);
    }
    var u3_r;
    var u3_i;
    if (d_i) {
      u3_r = -9 * q / 18;
      u3_i = d_i / 18;
      v3_r = -9 * q / 18;
      v3_i = -d_i / 18;
    } else {
      u3_r = (-9 * q + d_r) / 18;
      u3_i = 0 / 18;
      v3_r = (-9 * q - d_r) / 18;
      v3_i = 0 / 18;
    }
    var u_r;
    var u_i;
    if (u3_i) {
      var z = Math.sqrt(u3_r * u3_r + u3_i * u3_i);
      var t = Math.atan2(u3_i, u3_r);
      z = Math.pow(z, 1 / 3);
      t = t / 3;
      u_r = z * Math.cos(t);
      u_i = z * Math.sin(t);
    } else {
      if (u3_r < 0) u_r = -Math.pow(-u3_r, 1 / 3);else u_r = Math.pow(u3_r, 1 / 3);
      u_i = 0;
    }
    var v_r;
    var v_i;
    if (v3_i) {
      var _z = Math.sqrt(v3_r * v3_r + v3_i * v3_i);
      var _t = Math.atan2(v3_i, v3_r);
      _z = Math.pow(_z, 1 / 3);
      _t = _t / 3;
      v_r = _z * Math.cos(_t);
      v_i = _z * Math.sin(_t);
    } else {
      if (v3_r < 0) v_r = -Math.pow(-v3_r, 1 / 3);else v_r = Math.pow(v3_r, 1 / 3);
      v_i = 0;
    }
    var omega1_r = -0.5;
    var omega1_i = Math.sqrt(3) / 2;
    var omega2_r = -0.5;
    var omega2_i = -Math.sqrt(3) / 2;
    var y1_r, y1_i;
    var y2_r, y2_i;
    var y3_r, y3_i;
    y1_r = u_r + v_r;
    y1_i = u_i + v_i;
    y2_r = omega1_r * u_r - omega1_i * u_i + omega2_r * v_r - omega2_i * v_i;
    y2_i = omega1_i * u_r + omega1_r * u_i + omega2_i * v_r + omega1_r * v_i;
    y3_r = omega2_r * u_r - omega2_i * u_i + omega1_r * v_r - omega1_i * v_i;
    y3_i = omega2_i * u_r + omega2_r * u_i + omega1_i * v_r + omega1_r * v_i;
    var x1_r, x1_i;
    var x2_r, x2_i;
    var x3_r, x3_i;
    x1_r = y1_r - b / (3 * a);
    x1_i = y1_i;
    x2_r = y2_r - b / (3 * a);
    x2_i = y2_i;
    x3_r = y3_r - b / (3 * a);
    x3_i = y3_i;
    return [x1_r, x1_i, x2_r, x2_i, x3_r, x3_i];
  };
  var round = function round(number, digits) {
    return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
  };
  var Const = /*#__PURE__*/_createClass(function Const() {
    _classCallCheck(this, Const);
  });
  _defineProperty(Const, "TOTAL_LANE_WIDTH", 400);
  _defineProperty(Const, "LASER_LANE_WIDTH", Const.TOTAL_LANE_WIDTH / 8);
  _defineProperty(Const, "LASER_WIDTH", Const.LASER_LANE_WIDTH);
  _defineProperty(Const, "LASER_VERTICAL_HEIGHT", 36);
  _defineProperty(Const, "LASER_END_HEIGHT", 64);
  _defineProperty(Const, "LINE_WIDTH", 4);
  _defineProperty(Const, "SINGLE_LANE_WIDTH", (Const.TOTAL_LANE_WIDTH - Const.LASER_LANE_WIDTH * 2) / 4);
  _defineProperty(Const, "CHIP_BT_WIDTH", Const.SINGLE_LANE_WIDTH - 4);
  _defineProperty(Const, "LONG_BT_WIDTH", Const.SINGLE_LANE_WIDTH - 16);
  _defineProperty(Const, "CHIP_FX_WIDTH", Const.SINGLE_LANE_WIDTH * 2 - 4);
  _defineProperty(Const, "LONG_FX_WIDTH", Const.SINGLE_LANE_WIDTH * 2 - 2);
  _defineProperty(Const, "CHIP_BT_HEIGHT", 24);
  _defineProperty(Const, "CHIP_FX_HEIGHT", 24);
  _defineProperty(Const, "BAR_HEIGHT", 72 * 16);
  _defineProperty(Const, "MARGIN_HEIGHT_UPPER", Const.BAR_HEIGHT * 1 / 16);
  _defineProperty(Const, "MARGIN_HEIGHT_LOWER", Const.BAR_HEIGHT * 1 / 16);
  _defineProperty(Const, "BPM_WIDTH", 80);
  _defineProperty(Const, "LANE_BT_COLOR", "#000");
  _defineProperty(Const, "LANE_VOL_L_COLOR", "rgba(0,127,255,0.2)");
  _defineProperty(Const, "LANE_VOL_R_COLOR", "rgba(255,0,127,0.2)");
  _defineProperty(Const, "LANE_VOL_L_BORDER_COLOR", "rgb(0,127,255)");
  _defineProperty(Const, "LANE_VOL_R_BORDER_COLOR", "rgb(255, 127, 255)");
  _defineProperty(Const, "LANE_BT_BORDER_COLOR", "#888");
  _defineProperty(Const, "BAR_LINE_COLOR", "#888");
  _defineProperty(Const, "VOL_L_COLOR", "rgba(0, 127, 255, 0.6)");
  _defineProperty(Const, "VOL_L_BORDER_COLOR", "rgb(0, 255, 255)");
  _defineProperty(Const, "VOL_R_COLOR", "rgba(255, 0, 127, 0.6)");
  _defineProperty(Const, "VOL_R_BORDER_COLOR", "rgb(255, 127, 255)");
  _defineProperty(Const, "VOL_G_COLOR", "rgba(0, 255, 127, 0.6)");
  _defineProperty(Const, "VOL_G_BORDER_COLOR", "rgb(127, 255, 127)");
  _defineProperty(Const, "VOL_Y_COLOR", "rgba(255, 255, 0, 0.6)");
  _defineProperty(Const, "VOL_Y_BORDER_COLOR", "rgb(255, 255, 127)");
  _defineProperty(Const, "LONG_FX_COLOR", "rgba(255,102,0,0.8)");
  _defineProperty(Const, "LONG_BT_COLOR", "#fff");
  _defineProperty(Const, "CHIP_FX_SE_COLOR", "#fa0");
  _defineProperty(Const, "CHIP_FX_COLOR", "rgb(255,102,0)");
  _defineProperty(Const, "CHIP_BT_COLOR", "#fff");
  _defineProperty(Const, "BPM_NORMAL_COLOR", "#fff");
  _defineProperty(Const, "BPM_UPPER_COLOR", "#f88");
  _defineProperty(Const, "BPM_LOWER_COLOR", "#88f");
  _defineProperty(Const, "BPM_FONT", "48px system-ui");
  var offScreenCanvas;
  var offScreenHeight;
  var TotalHeight;
  var offScreenWidth;
  var TotalWidth;
  var LowerMargin;
  var StartTiming;
  var BarHeight;
  var VolColors;
  var VolBorderColors;
  var ButtonNames;
  var DeviceNames;
  var offScreenCanvasCache = {};
  var Fraction = /*#__PURE__*/function () {
    function Fraction() {
      _classCallCheck(this, Fraction);
      this.numerator;
      this.denominator;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length == 1 && typeof args[0] === "string" && /[+-]?\d+\/[+-]?\d+/.test(args[0])) {
        var _args$0$split$map = args[0].split("/").map(function (n) {
          return Number(n);
        });
        var _args$0$split$map2 = _slicedToArray(_args$0$split$map, 2);
        this.numerator = _args$0$split$map2[0];
        this.denominator = _args$0$split$map2[1];
      } else if (args.length == 2 && typeof args[0] === "number" && typeof args[1] === "number") {
        this.numerator = args[0];
        this.denominator = args[1];
      } else if (args.length == 0) {
        this.numerator = 0;
        this.denominator = 1;
      } else {
        console.error("".concat(args, "\u306F\u5206\u6570\u306B\u5909\u63DB\u3067\u304D\u307E\u305B\u3093"));
      }
    }
    _createClass(Fraction, [{
      key: "toNumber",
      value: function toNumber() {
        return this.numerator / this.denominator;
      }
    }, {
      key: "toString",
      value: function toString() {
        return "".concat(this.numerator, "/").concat(this.denominator);
      }
    }], [{
      key: "stringToNumber",
      value: function stringToNumber(string) {
        return new Fraction(string).toNumber();
      }
    }, {
      key: "Equal",
      value: function Equal(fraction1, fraction2) {
        return Math.round(fraction1.numerator * fraction2.denominator) == Math.round(fraction2.numerator * fraction1.denominator);
      }
    }, {
      key: "Add",
      value: function Add() {
        for (var _len2 = arguments.length, fracs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          fracs[_key2] = arguments[_key2];
        }
        var res = new Fraction(0, fracs.map(function (f) {
          return f.denominator;
        }).reduce(function (a, b) {
          return Math.round(a * b);
        }));
        fracs.map(function (f, i, arr) {
          res.numerator = Math.round(res.numerator + f.numerator * res.denominator / f.denominator);
        });
        return res;
      }
    }, {
      key: "isFraction",
      value: function isFraction(target) {
        return typeof target === "string" && /[+-]?\d+\/[+-]?\d+/.test(target);
      }
    }, {
      key: "Max",
      value: function Max() {
        for (var _len3 = arguments.length, fracs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          fracs[_key3] = arguments[_key3];
        }
        return fracs.reduce(function (fa, fb) {
          return fa.numerator * fb.denominator > fb.numerator * fa.denominator ? fa : fb;
        });
      }
    }, {
      key: "Min",
      value: function Min() {
        for (var _len4 = arguments.length, fracs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          fracs[_key4] = arguments[_key4];
        }
        return fracs.reduce(function (fa, fb) {
          return fa.numerator * fb.denominator < fb.numerator * fa.denominator ? fa : fb;
        });
      }
    }]);
    return Fraction;
  }();
  var split = function split(array, n) {
    return array.reduce(function (a, c, i) {
      return i % n == 0 ? [].concat(_toConsumableArray(a), [[c]]) : [].concat(_toConsumableArray(a.slice(0, -1)), [[].concat(_toConsumableArray(a[a.length - 1]), [c])]);
    }, []);
  };
  var chartChangers = Array.from(document.querySelectorAll(".chartChanger"));
  var charts = document.querySelectorAll("canvas.chartImage");
  charts.forEach(function (c, i, nl) {
    showChart(c);
    if ("songName" in c.dataset) {
      var chartChanger = chartChangers.find(function (cc) {
        return "songName" in cc.dataset && cc.dataset.songName == c.dataset.songName;
      });
      if (chartChanger && "changeEvent" in chartChanger.dataset) {
        chartChanger.addEventListener(chartChanger.dataset.changeEvent, function () {
          if ("chartParamsRemoving" in c.dataset) {
            c.dataset.chart = c.dataset.chart.replace(c.dataset.chartParamsRemoving, "");
          }
          if ("chartParams" in chartChanger.dataset) {
            c.dataset.chart += chartChanger.dataset.chartParams;
            c.dataset.chartParamsRemoving = chartChanger.dataset.chartParams;
          }
          if ("chartReplacePattern" in chartChanger.dataset && "chartReplacement" in chartChanger.dataset) {
            c.dataset.chart = c.dataset.chart.replace(new RegExp(chartChanger.dataset.chartReplacePattern, "g"), chartChanger.dataset.chartReplacement);
          }
          c.getContext("2d").clearRect(0, 0, c.width, c.height);
          clearCache(c.dataset.songName);
          showChart(c);
          for (var j = i + 1; j < nl.length; j++) {
            var afterCanvas = nl.item(j);
            if (afterCanvas.dataset.chart.includes("PREVIOUS")) {
              afterCanvas.getContext("2d").clearRect(0, 0, afterCanvas.width, afterCanvas.height);
              showChart(afterCanvas);
            } else {
              break;
            }
          }
        });
      }
    }
  });
}
