"use strict";

// TODO: つまみの自動簡略化スクリプト
{
  var reflectToChartChanger = function reflectToChartChanger(simplified) {
    var chartChanger = document.querySelector(".chartChanger");
    if (chartChanger) {
      if (simplified) {
        chartChanger.dataset.chartReplacePattern = "STRAIGHT_";
        chartChanger.dataset.chartReplacement = "";
      } else {
        chartChanger.dataset.chartReplacePattern = "CURVE";
        chartChanger.dataset.chartReplacement = "STRAIGHT_$&";
      }
    }
  };
  var s = document.querySelector(".chartSimplifier");
  s.addEventListener("click", function () {
    var simplified = ("simplified" in s.dataset);
    if (simplified) {
      delete s.dataset.simplified;
    } else {
      s.dataset.simplified = "simplified";
    }
    reflectToChartChanger(simplified);
  });
}
