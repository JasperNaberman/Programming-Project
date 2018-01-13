/* barchartV2.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for the barchart of the visualization page
*/

// set the dimensions of the canvas
margin = {top: 80, right: 20, bottom: 70, left: 70}, width = 1000 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;


// set the ranges
x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);

y = d3.scale.linear().range([height, 0]);

// define the x-axis
axisX = d3.svg.axis()
	.scale(x)
	.orient("bottom")

// define the y-axis
axisY = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickSize(-width)
	.ticks(10);

// add the SVG element
svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		return "<span style = 'color: salmon'>" + d.value + "</span>";
})

svg.call(tip);
	

// load the data
counter = 0
data_total = []
countries = []
d3.json("/Data/data.json", function(data) { Object.keys(data).forEach(function(key) {
	if (data[key]["Total"] != "No Data Available") {
		data_total[counter] = data[key]["Total"];
		countries[counter] = key;
		counter++
	}

});
	bar_data = []
	for (i = 0; i < data_total.length; i++){
		bar_data.push({"id":countries[i], "value":data_total[i]})
	}
	
	svg.append("text")
		.attr("x", (width / 2))             
		.attr("y", 0 - (margin.top / 2))
		.attr("text-anchor", "middle")  
		.style("font-size", "20px")
		.style("font-family", "sans-serif")
		.text("The amount of immigrants that has entered a country in 2015");
	
	domainY = d3.max(data_total)
		
	domainY = 0
	if (Math.ceil(d3.max(bar_data, function(d) { return d.maxTemp; })) % 200000 == 0){
		domainY = Math.ceil(d3.max(bar_data, function(d) { return d.value; }))
	}
	else {
		domainY = Math.ceil(d3.max(bar_data, function(d) { return d.value; })) // + 100000
	}

	// scale chart
	x.domain(countries);
	y.domain([0, domainY]);
	
	// initialize x-axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(axisX)
		// append x-axis tick labels
		.selectAll("text")
        .style("font-size", "10px")
		.style("font-family", "sans-serif")
		.attr("dx", "-.8em")
		.attr("dy", "-.180em")
		.style("text-anchor", "end")
		.attr("transform", "rotate(-55)")
	
	// append x-axis title
	svg.append("text")
	    .attr("text-anchor", "end")
	    .attr("transform", "translate(" + (width) + "," + (height + margin.bottom) + ")")
	    .style("font-size", "10px")
		.style("font-family", "sans-serif")
	    .text("Countries");
		
	// initialize-y axis
	svg.append("g")
		.attr("class", "y axis")
		.call(axisY)
		// append y-axis title
		.append("text")
		.attr("y", -60)
		.attr("dy", ".69em")
		.style("text-anchor", "end")
        .style("font-size", "10px")
		.style("font-family", "sans-serif")
		.attr("transform", "rotate(-90)")
		.text("Amount of Immigrants");
		
	// add bars to chart
	svg.selectAll("bar")
		.data(bar_data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.id); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); })
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)
});




