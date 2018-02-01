/* map.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for the map of Europe on the visualization page
*/

// initialize a few variables for data storage
var mapCounter = 0;
var mapPopu = [];
var mapImmi = [];
var mapCountries = [];
var mapCode = [];
var highlightCountryBarchart;

// load the data
d3.json("../../Data/mapData.json", function(error, data) { Object.keys(data).forEach(function(key) {
	if (error) throw error;
	
	// store the data in arrays
	mapPopu[mapCounter] = data[key]["population"];
	mapImmi[mapCounter] = data[key]["immigrants"];
	mapCountries[mapCounter] = key;
	mapCode[mapCounter] = data[key]["code"];
	mapCounter++
	});
	
	/*
	* This function is called by the bar and sunburst charts
	* It highlights the requested country by making it's border bigger.
	*/
	highlightCountryChart = function(countryName, highlight) {
		for (i = 0; i < mapCountries.length; i++) {
			if (mapCountries[i] == countryName) {
				if (highlight == "highlight") {
					d3.selectAll('.datamaps-subunit.' + mapCode[i]).style('stroke-width', '2px').style('stroke-color', '#dedede');
				} else {
					d3.selectAll('.datamaps-subunit.' + mapCode[i]).style('stroke-width', '.5px');
				}
			}
		}
	}
		
	// compute the correct ratio for every country
	var mapData = [];
	for (i = 0; i < mapPopu.length; i++) {
		var country = [];
		var quotient = mapPopu[i] / 1000;
		var ratio = mapImmi[i] / quotient;
		country[0] = mapCode[i];
		country[1] = ratio;
		mapData[i] = country;
	}
	
	// retrieve the highest and lowest values in the map
	var onlyValues = mapData.map(function(obj){ return obj[1]; });
    var minValue = Math.min.apply(null, onlyValues);
	var maxValue = Math.max.apply(null, onlyValues);
	
	// round the max and min values to 1 decimal
	var textMin = Math.round(minValue * 10) / 10;
	var textMax = Math.round(maxValue * 10) / 10;
	
	// create enters for in the legend text
	var para = document.createElement("p");
	var enter1 = document.createElement("br"),
		enter2 = document.createElement("br"),
		enter3 = document.createElement("br"),
		enter4 = document.createElement("br"),
		enter5 = document.createElement("br"),
		enter6 = document.createElement("br"),
		enter7 = document.createElement("br"),
		enter8 = document.createElement("br"),
		enter9 = document.createElement("br");
	
	// create the legend text
	var node1 = document.createTextNode(textMax + " - Highest amount"),
		node2 = document.createTextNode("of immigrants "),
		node3 = document.createTextNode("per 1000 capita"),
		node4 = document.createTextNode(textMin + " - Lowest amount"),
		node5 = document.createTextNode("of immigrants "),
		node6 = document.createTextNode("per 1000 capita");
	
	// set the text in the right order
	para.appendChild(node1);
	para.appendChild(enter1);
	para.appendChild(node2);
	para.appendChild(enter2);
	para.appendChild(node3);
	para.appendChild(enter3);
	para.appendChild(enter4);
	para.appendChild(enter5);
	para.appendChild(enter6);
	para.appendChild(enter7);
	para.appendChild(node4);
	para.appendChild(enter8);
	para.appendChild(node5);
	para.appendChild(enter9);
	para.appendChild(node6);
	
	// append the text to the legend text area
	var element = document.getElementById("mapLegend-text");
	element.appendChild(para);
	
	// create color palette function
    var paletteScale = d3.scale.sqrt()
            .domain([minValue, maxValue])
            .range(["#e9f5ef", "#16512f"]);
	
	// fill dataset in appropriate format
	var dataset = {};
	mapData.forEach(function(item){
		var iso = item[0];
		var value = item[1];
		dataset[iso] = { immigrants: Math.round(value * 10) / 10, fillColor: paletteScale(value) };
	});
	
	// render map
	var map = new Datamap({
		element: document.getElementById('map-europe'),
		scope: 'europe',
		// set the projection and location of the map
		setProjection: function(element) {
			var projection = d3.geo.mercator()
				.scale(400)
				.translate([element.offsetWidth / 2 - 70, element.offsetHeight + 230]);
				var path = d3.geo.path().projection(projection);
			return {path: path, projection: projection};
		},
		fills: { defaultFill: '#8f8f8f' },
		data: dataset,
		geographyConfig: {
			dataUrl: '../../Data/eu.topojson',
			borderColor: '#dedede',
			borderWidth: .5,
			highlightBorderWidth: 2,
			highlightBorderColor: '#dedede',
			// don't change color on mouse hover
			highlightFillColor: function(geo) {
				return geo['fillColor'] || '#8f8f8f';
			},
			// show desired information in tooltip
			popupTemplate: function(geo, data) {
				// show different tooltip if data of country isn't present in dataset
				if (!data) { return ['<div class="hoverinfo">',
					'<strong>', geo.properties.name, '</strong>',
					'<br>No Information Available.</div>'].join('');
				}
				// tooltip content
				return ['<div class="hoverinfo">',
				'<strong>', geo.properties.name, '</strong>',
				'<br>Immigrants per 1000 capita: <strong>', data.immigrants, '</strong>',
				'</div>'].join('');
			}
		},
		done: function(datamap) {
			// set sunburst and dropdown on click
			datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
				if (geography.id.length == 3) {
					zoomSunburst(geography.properties.name);
					selectDropdownCountry(geography.properties.name);
				} else {
					zoomSunburst("Europe");
					selectDropdownCountry("Europe");
				}
			});
		}
	})
	d3.select(".datamap").style("width", "500px");
});
