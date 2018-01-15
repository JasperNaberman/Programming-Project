/* mapV1.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for drawing the map of Europe
*/

window.onload = function(){
	drawMap();
}

function drawMap(){
	body = d3.select('body');
	div = body.append('div');
	div.attr('id', 'map')
	
	var center, countries, height, path, projection, scale, svg, width;
	width = 800;
	height = 700;
	center = [13, 71.5];
	scale = 600;
	projection = d3.geo.mercator().scale(scale).translate([width / 2, 0]).center(center);
	path = d3.geo.path().projection(projection);
	svg = d3.select("#map").append("svg").attr("height", height).attr("width", width);
	countries = svg.append("g");
	d3.json("/Data/eu.topojson", function(data) {
	countries.selectAll('.country')
		.data(topojson.feature(data, data.objects.europe).features)
		.enter()
		.append('path')
		.attr('class', 'country')
		.attr('d', path);
	return;
	});
	
	// d3.json("/Data/immigrationData.json", function(data) {
	// 	console.log(data);
	// 	Object.keys(data).forEach(function(key) {
	// 	    console.log(key, data[key]["Total"]);
	// 	});
	// });
	//
	// d3.json("/Data/populationData.json", function(data) {
	// 	console.log(data)
	// });
}