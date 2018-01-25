/* sunburst.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for the sunburst chart on the visualization page
*/

var sunburstWidth = 400,
    sunburstHeight = 400,
    radius = (Math.min(sunburstWidth, sunburstHeight) / 2) - 10;

var formatNumber = d3.format(",d");

var sunburstX = d3.scale.linear()
    	.range([0, 2 * Math.PI]);

var sunburstY = d3.scale.sqrt()
    	.range([0, radius]);

var color = d3.scale.linear()
		.range(["#fcebff", "#3f004d"]);

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, sunburstX(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, sunburstX(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, sunburstY(d.y)); })
    .outerRadius(function(d) { return Math.max(0, sunburstY(d.y + d.dy)); });
	
var percentBase = 100;

var svg2 = d3.select("#sunburstColumn").append("svg")
    .attr("width", sunburstWidth)
    .attr("height", sunburstHeight)
	.append("g")
    .attr("transform", "translate(" + sunburstWidth / 2 + "," + (sunburstHeight / 2) + ")");

// tooltip
var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

d3.json("/Data/sunburst.json", function(error, root) {
	if (error) throw error;

	var countryTotals = [];
	
	for (i = 0; i < root["children"].length; i++) {
		var countryTotal = 0;
		for (j = 0; j < root["children"][i]["children"].length; j++) {
			countryTotal += root["children"][i]["children"][j]["size"];
		}
		countryTotals.push(countryTotal);
	}
	
	
	var minDomain = Math.min(...countryTotals);
	var maxDomain = Math.max(...countryTotals);
	
	color.domain([minDomain, maxDomain]);
	path = svg2.selectAll("path")
		.data(partition.nodes(root))
		.enter().append("path")
		.attr("d", arc)
		.style("fill", function(d) { if ((d.children ? d : d.parent).name == "Europe") {
			return "#8f8f8f";}
			else { 
				return color((d.children ? d : d.parent).value);}
			})
		.on("click", clickSunburst)
		.text(function(d) { return d.name + "\n" + formatNumber(d.value); })
		.on("mouseover", function(d, i) {
			d3.select(this).style("cursor", "pointer");
			var totalSize = path.node().__data__.value;
			var percentage = Math.round(((100 * d.value / totalSize) * 100) / percentBase);
			var percentageString = percentage + "%";
			tooltip.text(d.name + ": " + percentageString)
				.style("opacity", 0.8)
				.style("left", (d3.event.pageX) + 0 + "px")
				.style("top", (d3.event.pageY) + 10 + "px");
		})
		.on("mouseout", function(d) {
			d3.select(this).style("cursor", "default")
			tooltip.style("opacity", 0);
		});
		
	function clickSunburst(d) {
		svg2.transition()
			.duration(900)
			.tween("scale", function() {
				var xd = d3.interpolate(sunburstX.domain(), [d.x, d.x + d.dx]),
				yd = d3.interpolate(sunburstY.domain(), [d.y, 1]),
				yr = d3.interpolate(sunburstY.range(), [d.y ? 20 : 0, radius]);
				return function(t) { 
					sunburstX.domain(xd(t)); sunburstY.domain(yd(t)).range(yr(t));
				};
			})
			.selectAll("path")
			.attrTween("d", function(d) { return function() { return arc(d); }; 
		});
	}
});

function clickBarchartOrMap(countryName) {
	if (typeof(countryName) == "string") {
		d3.json("/Data/sunburst.json", function(error, root) {
			var nodePartition = partition.nodes(root);
			for (i = 0; i < nodePartition.length; i++) {
				if (nodePartition[i]["name"] == countryName) {
					d = nodePartition[i]
					svg2.transition()
						.duration(900)
						.tween("scale", function() {
							var xd = d3.interpolate(sunburstX.domain(), [d.x, d.x + d.dx]),
							yd = d3.interpolate(sunburstY.domain(), [d.y, 1]),
							yr = d3.interpolate(sunburstY.range(), [d.y ? 20 : 0, radius]);
							return function(t) { 
								sunburstX.domain(xd(t)); sunburstY.domain(yd(t)).range(yr(t));
							};
						})
						.selectAll("path")
						.attrTween("d", function(d) { return function() { return arc(d); }; 
					});
				}
			}
		})
	}
}

d3.select(self.frameElement).style("height", sunburstHeight + "px");
