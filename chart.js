
var cheggMap = function() {
  "use strict";

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    ;


  var projection = d3.geo.albersUsa()
      .scale(1000);

  var colorScale = d3.scale.linear()
      //.domain([0, 1.0])
      .range(['#dddddd', '#1c437b']);


  function mapToID(values) {
    var ret = {};

    values.forEach(function(d) {
      ret[d.id] = d;
    });

    return ret;
  }



  function chart(selection) {
    selection.each(function(data) {

      var container = d3.select(this);
      var dataByID = mapToID(data.data);

      colorScale
        .domain(d3.extent(data.data, function(d) { return +d.count }));


      container
          .style('width', width)
          .style('height', height);


      projection
          .translate([width / 2, height / 2]);

      var path = d3.geo.path()
          .projection(projection);


      var wrap = container.selectAll('g.chart-wrap').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'chart-wrap');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'states')


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      var states = g.select('.states').selectAll('path')
          .data(topojson.feature(data.map, data.map.objects.states).features)

      states.enter().append('path')
          .attr('class', 'state')
          .attr('d', path);

      states.transition().duration(1000)
          .style('fill', function(d) {
            var point = dataByID[d.id],
                val = (point && point.count) || 0;

            return colorScale(val);
          })


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
    if (!arguments.length) return height_;
    height = _;
    return chart;
  };


  return chart;
}
