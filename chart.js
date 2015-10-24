
var cheggMap = function() {
  "use strict";

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    ;


  var projection = d3.geo.albersUsa()
      .scale(1000);


  function chart(selection) {
    selection.each(function(data) {


      var container = d3.select(this);

      container
          .style('width', width)
          .style('height', height);


      projection
          .translate([width / 2, height / 2]);

      var path = d3.geo.path()
          .projection(projection);


      //--------------------------------------
      // Setup common SVG
      var wrap = container.selectAll('g.chart-wrap').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'chart-wrap');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      // Chart's layers
      gEnter.append('g').attr('class', 'states')

      // Account for margin
      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      //--------------------------------------



      g.select('.states').selectAll('path')
          .data(topojson.feature(data.map, data.map.objects.states).features)
        .enter().append('path')
          .attr('class', 'state')
          .attr('d', path);


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
