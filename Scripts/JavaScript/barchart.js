/* barchart.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for the barchart of the visualization page
*/

// set the dimensions of the canvas
margin = {top: 80, right: 20, bottom: 70, left: 70}, width = 1200 - margin.left - margin.right,
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
	.attr("id", "svgBarchart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
// svg repositioning
$("#svgBarchart").css({top: 550, position:'absolute'});
	
tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) { return "<span style = 'color: #ca85ff'>" + d.value.toLocaleString() + "</span>";
})

svg.call(tip);

// load the data
bc_counter = 0
bc_data_total = []
bc_countries = []
d3.json("/Data/immigrationData.json", function(error, data) { Object.keys(data).forEach(function(key) {
	if (error) throw error;
	
	if (data[key]["Total"] != "No Data Available") {
		bc_data_total[bc_counter] = data[key]["Total"];
		bc_countries[bc_counter] = key;
		bc_counter++
		}
	});

	bc_data = []
	for (i = 0; i < bc_data_total.length; i++){
		bc_data.push({"id" : bc_countries[i], "value" : bc_data_total[i]})
	}
	
	svg.append("text")
		.attr("x", (width / 2))             
		.attr("y", 0 - (margin.top / 2))
		.attr("text-anchor", "middle")  
		.style("font-size", "20px")
		.style("font-family", "sans-serif")
		.text("The amount of immigrants that has entered a country in 2015");

	// scale chart
	x.domain(bc_data.map(function(d) { return d.id; }));
	y.domain([0, (Math.floor(d3.max(bc_data_total) / 200000) + 1) * 200000]);
	
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
		
	// initialize y-axis
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
		.data(bc_data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.id); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); })
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)
	
	// call 'sort'-function when change in sorting checkbox
	d3.select("#sortingCheckbox").on("change", sortBarchart);
	
	// d3.select("#sortingRadio1").on("change", sortBarchart);
	// d3.select("#sortingRadio2").on("change", sortBarchart);
	
	// sort or unsort the barchart
    function sortBarchart() {
    	var x0 = x.domain(bc_data.sort(this.checked
        	? function(a, b) { return b.value - a.value; }
        	: function(a, b) { return d3.ascending(a.id, b.id); })
        	.map(function(d) { return d.id; }))
        	.copy();

    	svg.selectAll(".bar")
        	.sort(function(a, b) { return x0(a.id) - x0(b.id); });

    	var transition = svg.transition().duration(1500),
        delay = function(d, i) { return i * 50; };

    	transition.selectAll(".bar")
        	.delay(delay)
        	.attr("x", function(d) { return x0(d.id); });

    	transition.select(".x.axis")
			.call(axisX)
			.selectAll("text")
			.style("font-size", "10px")
			.style("font-family", "sans-serif")
			.attr("dx", "-.8em")
			.attr("dy", "-.180em")
			.style("text-anchor", "end")
			.attr("transform", "rotate(-55)")
			.selectAll("g")
			.delay(delay);
	}
});
