var data = [{'date': '2019-08-18', 'distance': 769.142503619194, 'steps': 2394.0},
{'date': '2019-08-19', 'distance': 1177.216609954834, 'steps': 3492.0},
{'date': '2019-08-20', 'distance': 1615.4772098064425, 'steps': 4537.0},
{'date': '2019-08-21', 'distance': 613.88573127985, 'steps': 3314.0},
{'date': '2019-08-22', 'distance': 1609.1745053690063, 'steps': 5723.0},
{'date': '2019-08-23', 'distance': 1920.6135819394005, 'steps': 4568.0},
{'date': '2019-08-24', 'distance': 184.2212340831757, 'steps': 1679.0},
{'date': '2019-08-25', 'distance': 640.3923880457877, 'steps': 3393.0},
{'date': '2019-08-26', 'distance': 2225.3320875167847, 'steps': 3265.0},
{'date': '2019-08-27', 'distance': 926.5876799225807, 'steps': 2369.0},
{'date': '2019-08-28', 'distance': 2127.0540373325352, 'steps': 4264.0},
{'date': '2019-08-29', 'distance': 1481.6442728103366, 'steps': 4077.0},
{'date': '2019-08-30', 'distance': 7032.1346746324325, 'steps': 5031.0},
{'date': '2019-08-31', 'distance': 0, 'steps': 1162.0},
{'date': '2019-09-01', 'distance': 0, 'steps': 510.0},
{'date': '2019-09-02', 'distance': 0, 'steps': 613.0},
{'date': '2019-09-03', 'distance': 0, 'steps': 371.0},
{'date': '2019-09-04', 'distance': 1128.3976033465694, 'steps': 2762.0},
{'date': '2019-09-05', 'distance': 10967.97505073477, 'steps': 6356.0},
{'date': '2019-09-06', 'distance': 3172.3470586528833, 'steps': 12265.0},
{'date': '2019-09-07', 'distance': 0, 'steps': 11929.0},
{'date': '2019-09-08', 'distance': 0, 'steps': 7801.0},
{'date': '2019-09-09', 'distance': 0, 'steps': 3727.0},
{'date': '2019-09-10', 'distance': 0, 'steps': 2369.0},
{'date': '2019-09-11', 'distance': 21.434873949579828, 'steps': 4832.0},
{'date': '2019-09-12', 'distance': 590.0085222768353, 'steps': 6891.0},
{'date': '2019-09-13', 'distance': 794.5566037735849, 'steps': 4342.0},
{'date': '2019-09-14', 'distance': 0, 'steps': 5594.0},
{'date': '2019-09-15', 'distance': 0, 'steps': 4752.0},
{'date': '2019-09-16', 'distance': 0, 'steps': 4592.0}]

// bar wdith
var barW = 25

// margin and width objects
var margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// x and y axis variables
var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);

var y = d3.scaleLinear()
        .range([height, 0]);

 // select and set attributes of the svg element       
var svg = d3.select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom + 30)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.Top + ")" )


xValues = data.map(d=>d.date);


// Scale the range of the data in the domains
x.domain(xValues);
y.domain([0, d3.max(data, function(d) { return d.steps; })]);

// create the bars
svg.selectAll("rect")
            .data(data, function(d, i){ return i; })
            .enter()
            .append("rect")
            .attr("x", function(d){return x(d.date)})
            .attr("y", function(d){ return y(d.steps)})
            .attr("width", barW)
            .attr("height", function(d) { return height - y(d.steps); })
            .attr("fill", "steelblue");

// x axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

 //y axis
  svg.append("g")
      .call(d3.axisRight(y));