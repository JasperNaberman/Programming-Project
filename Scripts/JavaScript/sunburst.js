/* sunburst.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for the sunburst chart on the visualization page
*/

var width = 600,
    height = 600,
    radius = (Math.min(width, height) / 2) - 10;

var formatNumber = d3.format(",d");

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var color = d3.scale.category20c();

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

var svg2 = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
	.append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

d3.json("/Data/sunburst.json", function(error, root) {
	if (error) throw error;
	
	// compute the total amount of immigrants in Europe
	var totalEurope = 0
	for (i = 0; i < root["children"].length; i++){
		for (j = 0; j < root["children"][i]["children"].length; j++){
			totalEurope += root["children"][i]["children"][j]["size"]
		}
	}
	console.log(totalEurope)
	
	svg2.selectAll("path")
		.data(partition.nodes(root))
		.enter().append("path")
		.attr("d", arc)
		.style("fill", function(d) { return color((d.children ? d : d.parent).name); })
		.on("click", click)
		.append("title")
		.text(function(d) { return d.name + "\n" + formatNumber(d.value);
	});
});

function click(d) {
	svg2.transition()
		.duration(900)
		.tween("scale", function() {
			var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
			yd = d3.interpolate(y.domain(), [d.y, 1]),
			yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
			return function(t) { 
				x.domain(xd(t)); y.domain(yd(t)).range(yr(t));
			};
		})
		.selectAll("path")
		.attrTween("d", function(d) { return function() { return arc(d); }; });
}

d3.select(self.frameElement).style("height", height + "px");