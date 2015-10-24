# D3.js, Intro to Web Based Data Visualization

## Step 1: Setup the HTML and JS templates

Create a simple HTML file (chart.html), get d3.js and topojson.js from a CDN

    <div class="chartWrap">
      <svg id="chart1" />
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.19/topojson.min.js"></script>
    <script src="chart.js"></script>


Create a JS template (chart.js) using the chart structure described here: http://bost.ocks.org/mike/chart/



## Step 2: Build a US map with TopoJSON data

In chart.html get the Map TopoJSON data, and send it to the chart

    d3.json('us.json', function(error, us) {
      d3.select('#chart1');
        .datum({ map: us })
        .call(cheggMap());
    });

In chart.js use the TopoJSON and d3.geo.albersUsa projection

    var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    g.select('.states').selectAll('path')
      .data(topojson.feature(data.map, data.map.objects.states).features)
    .enter().append('path')
      .attr('class', 'state')
      .attr('d', path);



## Step 3: Get your data ready to visualize

In chart.html grab the data we need to visualize. (*We need a State Name/Abbreviation to State ID # map, due to the TopoJSON not having the State Names)

    d3.tsv('us-state-names.tsv', function(error, names) {
      for (var i = 0; i < names.length; i++) {
        name_id_map[names[i].code]    = names[i].id;
      }

      d3.csv('inq_date_state.csv', function(error, data) {
        data.forEach(function(d) {
          d.id = name_id_map[d.state];
        });
        // ....
      })
    });



## Step 4: Show your data by adding color the states

Calculate your color's data domain, and setup a color scale:

    var colorScale = d3.scale.linear()
        .range(['#dddddd', '#1c437b'])
        .domain(d3.extent(data.data, function(d) { return +d.count }));

Fill each State with the color related to the count of the State:

    states
          .style('fill', function(d) {
            var point = dataByID[d.id],
                val = (point && point.count) || 0;

            return colorScale(val);
          });



## Step 5: Animate!

Setup a time interval to update the chart with the next month's data and transition the colors.

    function buildChart(i, delay) {
      setTimeout(function() {
        chart1svg
          .datum({map: us, data: nestedData[i].values })
          .call(chart1map);
      }, delay);
    }

    for (var i = 0; i < nestedData.length; i++) {
      buildChart(i, i * 2000);
    }
