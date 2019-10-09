
var data_url = 'https://gist.githubusercontent.com/brianmusisi/76fa49b5f8267ec6754eed3854d7202f/raw/8c2bba9298fde15fb5d782eb4e99c2b07019e959/fitness_data.csv'

var data_url = "https://gist.githubusercontent.com/brianmusisi/b81a71abf2a98f992efcb355143b035c/raw/709dff6fbe7a82e72d3b98e2b7143bd9bc38f150/daily_activities.json"
d3.csv(data_url, function(error, data){
    if (error){
        console.log('An error occcurred');
    }

    else {
    console.log(data)
    // bar width
    var barW = 25

    // margin and width objects
    var margin = {top: 20, right: 50, bottom: 30, left: 80},
        width = 960 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // x and y axis variables
    //var x = d3.scaleBand()
    //        .range([0, width])
    //        .padding(0.1);
    
    
    var x = d3.scaleTime()
              .range([0, width])

    var y = d3.scaleLinear()
            .range([height, 0]);

    // select and set attributes of the svg element       
    var svgBar = d3.select("svg#bar")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom + 30)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")" )

    var parseDate = d3.timeParse("%Y-%m-%d")

    data.forEach( function(d){
        d.fitness_date = parseDate(d.date);
        d.reduce_steps = d.total_steps /1000
        
    })


    xValues = data.map(d=>d.date);


    // Scale the range of the data in the domains
    //x.domain(d3.extent(dataDates));
    x.domain(d3.extent(data, function(d) { return d.fitness_date; }));
    y.domain([0, d3.max(data, function(d) { return d.reduce_steps; })]);


    // Define the tool tip
    var div = d3.select("body").append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);

    //create colors
    var blues = d3.scaleOrdinal(d3.schemeBlues[9]).domain([0, d3.max(data, function(d) { return d.steps; })]);
    
    // create the bars
    var bars = svgBar.selectAll("rect")
                .data(data, function(d, i){ return i; })
                .enter()
                .append("rect")
                .attr("x", function(d){ return x(d.fitness_date)})
                .attr("y", function(d){ return y(d.reduce_steps)})
                .attr("width", barW)
                .attr("height", function(d) { return height - y(d.reduce_steps); })
                .attr("fill", function(d) { return blues(d.steps)});
                //.attr("fill", "steelblue");
    
    
    // create mouse over effect
    bars.on('mouseover', function(d,i){

        d3.select(this).attr("fill", "red")
                       .style("opacity", 0.6);
        div.transition()		
            .duration(200)		
            .style("opacity", .9)

            div.html("Steps:  " + d.steps + "<br>" + "Distance:  " + Math.round(d.total_distance))
            div
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (y(d.reduce_steps) + 2 *(margin.top + margin.bottom)) + "px");
    })
    .on('mouseout', function(d,i){
        d3.select(this).attr("fill", "steelblue")
                       .style("opacity", 1);
        
        div.transition()		
            .duration(200)		
            .style("opacity", 0)
    })

    // x axis
    svgBar.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    //y axis
    svgBar.append("g")
        .call(d3.axisLeft(y));

    svgBar.append("text")      
          .attr("y",30 - margin.left)
          .attr("x",50 - (height / 2))
          .attr("transform", "rotate(-90)")
          .style("text-anchor", "end")
          .style("font-size", "16px")
          .text("Number of Steps ('000s)");


    svgBar.append("text")      
       .attr("x", (width / 2)+ 10)
       .attr("y",  height + margin.bottom * 2)
       .style("text-anchor", "middle")
       .text("Date");

    }
});