/* barchart.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for the barchart of the visualization page
*/

window.onload = function() {
	drawBarchart();
}

/*
* This function is imported by visualizations.html
* It appends an svg-element to the body of the page and draws a bar chart on it.
*/
function drawBarchart() {
	// set the dimensions of the canvas
	var margin = {top: 80, right: 20, bottom: 70, left: 70}, 
		width = 1200 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// set the ranges
	var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
	var y = d3.scale.linear().range([height, 0]);

	// define the x-axis
	var axisX = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	// define the y-axis
	var axisY = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickSize(-width)
		.ticks(10);

	// add the SVG element
	var svg = d3.select("body").append("svg")
		.attr("id", "svgBarchart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	// initialize a tooltip
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) { return "<center><span style = 'color: #b08db8'>" + d.id.toLocaleString() + "<br>" + 
			d.value.toLocaleString() + "</span></center>"; });
	svg.call(tip);

	// load the data
	var bc_counter = 0;
	var bc_data_total = [];
	var bc_countries = [];
	
	d3.json("../../Data/immigrationData.json", function(error, data) { Object.keys(data).forEach(function(key) {
		if (error) throw error;
		
		// store all the data in arrays
		if (data[key]["Total"] != "No Data Available") {
			var bc_data_EU28 = data[key]["EU28 countries except reporting country"];
			var bc_data_non_EU28 = data[key]["Non-EU28 countries nor reporting country"];
			var bc_data_reporting = data[key]["Reporting country"];
			var bc_data_stateless = data[key]["Stateless"];
			var bc_data_unknown = data[key]["Unknown"];
			bc_data_total[bc_counter] = bc_data_EU28 + bc_data_non_EU28 + bc_data_reporting + bc_data_stateless + bc_data_unknown;
			bc_countries[bc_counter] = key;
			bc_counter++
			}
		});
		
		// convert the data to a dict-like structure
		var bc_data = [];
		for (i = 0; i < bc_data_total.length; i++){
			bc_data.push({"id" : bc_countries[i], "value" : bc_data_total[i]});
		}
		
		
		// append a title to the chart
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
			.attr("transform", "rotate(-55)");
	
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
			.on('click', function(d) { zoomSunburst(d.id); selectDropdownCountry(d.id) })
			.on('mouseover', function(d) { d3.select(this).style("cursor", "pointer"); tip.show(d); highlightCountryChart(d.id, "highlight") })
			.on('mouseout', function(d) { tip.hide(d); highlightCountryChart(d.id, "de-highlight") });
	
		// call 'sort'-function when radio button is clicked
		d3.select("#sorting-radio1").on("click", sortBarchart);
		d3.select("#sorting-radio2").on("click", sortBarchart);
	
		// sort or unsort the barchart
	    function sortBarchart() {
	    	var x0 = x.domain(bc_data.sort(this.value == "2"
	        	? function(a, b) { return b.value - a.value; }
	        	: function(a, b) { return d3.ascending(a.id, b.id); })
	        	.map(function(d) { return d.id; }))
	        	.copy();

	    	svg.selectAll(".bar")
	        	.sort(function(a, b) { return x0(a.id) - x0(b.id); });
			
			// set the duration of the visualization
			var transition = svg.transition().duration(1500);
	        var delay = function(d, i) { return i * 50; };

	    	transition.selectAll(".bar")
	        	.delay(delay)
	        	.attr("x", function(d) { return x0(d.id); });
			
			// sort the axis tick labels
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
}
