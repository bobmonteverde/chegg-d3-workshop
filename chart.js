
var cheggMap = function() {
  "use strict";

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    ;


  var projection = d3.geo.albersUsa()
      .scale(1000);

  var colorScale = d3.scale.linear()
      .range(['#dddddd', '#1c437b']);


  // Helper function to convert array of values into associated map with the State ID # as the key
  function mapToID(values) {
    var ret = {};

    values.forEach(function(d) {
      ret[d.id] = d;
    });

    return ret;
  }



  function chart(selection) {
    selection.each(function(data) {

      var dataByID = mapToID(data.data);

      var container = d3.select(this);

      container
          .style('width', width)
          .style('height', height);


      // Calculate State's color by the extent of the data range
      colorScale
        .domain(d3.extent(data.data, function(d) { return +d.count }));


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




      var states = g.select('.states').selectAll('path')
          .data(topojson.feature(data.map, data.map.objects.states).features);

      states.enter().append('path')
          .attr('class', 'state')
          .attr('d', path)


      // Setting fill on update NOT enter so that values can be updated after generating the map
      states.transition().duration(1000)
          .style('fill', function(d) {
            var point = dataByID[d.id],
                val = (point && point.count) || 0;

            return colorScale(val);
          });


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
