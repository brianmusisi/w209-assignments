var data = [
    {
      x: 10,
      y: 8.04,
      size: 10,
      category: 1
    },
    {
      x: 8,
      y: 6.95,
      size: 5,
      category: 2
    },
    {
      x: 13,
      y: 7.58,
      size: 7,
      category: 1
    },
    {
      x: 9,
      y: 8.81,
      size: 15,
      category: 3
    },
    {
      x: 11,
      y: 8.33,
      size: 6,
      category: 1
    },
    {
      x: 14,
      y: 9.96,
      size: 8,
      category: 3
    },
    {
      x: 6,
      y: 7.24,
      size: 6,
      category: 3
    },
    {
      x: 4,
      y: 4.26,
      size: 10,
      category: 2
    },
    {
      x: 12,
      y: 10.84,
      size: 10,
      category: 2
    },
    {
      x: 7,
      y: 4.82,
      size: 7,
      category: 1
    },
    {
      x: 5,
      y: 5.68,
      size: 9,
      category: 1
    }
  ];
  
  var svg = d3.select("svg");
  
  svg.append("rect")
  .attr("width",240)
  .attr("height",240)
  .attr("x",5)
  .attr("y",5);
  
  svg
    .selectAll("path.pt")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "pt")
    .attr("d", d3.symbol().type(d3.symbolCircle))
    .attr("transform", function(d) {
      return "translate(" + (d.x * 15) + "," + (250 - d.y * 15 ) + ")";
    });
  
  // tip: define a function callback for the "d" attribute and
  // use d3.symbol.size(), and if statements for the categories
  // see https://github.com/d3/d3-shape#symbols
  
  var xValues = data.map(ob => ob.x)
  var yValues = data.map(ob => ob.y)
  var x = d3.scaleLinear()
            .domain([0, d3.max(xValues)+1])
            .range([0, 250])
  
  var y = d3.scaleLinear()
            .domain([0, d3.max(yValues)+1])
            .range([0, 250])
  
  var xAxis = d3.axisBottom(x);
  
  var yAxis = d3.axisRight(y)
  
  svg.append("g")
      .attr("transform", "translate(0,"+ 230 +")")
      .call(xAxis)
  
  svg.append("g")
      // .attr("transform", "translate(0,"+ 230 +")")
      .call(yAxis)