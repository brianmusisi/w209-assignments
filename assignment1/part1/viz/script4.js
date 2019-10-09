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

var width = 5000
var height = 3000
var barW = 20

var svg = d3.selectAll("svg")
            .attr("width", width)
            .attr("height", height)


function barH(d){ return (d.distance/20);};
function barX(d, i){ return i * (barW +1) }


yValues = data.map(d=> d.distance);
xValues = data.map(d=>d.date);

var y = d3.scaleLinear()
          .domain([0, d3.max(yValues)+1])
          .range([0, 250])

var yAxis = d3.axisRight(y)

svg.selectAll("rect")
            .data(data, function(d, i){ return i; })
            .enter()
            .append("rect")
            .attr("x", barX)
            .attr("y", 300)
            .attr("width", barW)
            .attr("height", barH)
            .attr("fill", "blue")
            .attr("transform", "translate(0," + barH + ")")
            .attr("transform", "rotate(90)" );
            

// svg.append("rect")
// .attr("width",240)
// .attr("height",240)
// .attr("x",5)
// .attr("y",5);