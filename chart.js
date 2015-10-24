
var cheggMap = function() {
  "use strict";

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    ;



  function chart(selection) {
    selection.each(function(data) {

      var container = d3.select(this);

      container
          .style('width', width)
          .style('height', height);


      //--------------------------------------
      // Setup common SVG
      var wrap = container.selectAll('g.chart-wrap').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'chart-wrap');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      // Account for margin
      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      //--------------------------------------


    });

    return chart;
  }



  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };


  return chart;
}
