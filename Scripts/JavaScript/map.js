/* map.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for the map of Europe on the visualization page
*/

mapCounter = 0
mapPopu = []
mapImmi = []
mapCountries = []
mapCode = []

d3.json("/Data/mapData.json", function(error, data) { Object.keys(data).forEach(function(key) {
	if (error) throw error;
	mapPopu[mapCounter] = data[key]["population"];
	mapImmi[mapCounter] = data[key]["immigrants"];
	mapCountries[mapCounter] = key;
	mapCode[mapCounter] = data[key]["code"];
	mapCounter++
	});
	
	function highlightCountryBarchart(countryName) {
		for (i = 0; i < mapCountries.length; i++) {
			if (mapCountries[i] == countryName) {
				console.log(mapCountries[i], mapCode[i])
			}
		}
	}
	
	// highlightCountryBarchart("Denmark")
	
	mapData = []
	for (i = 0; i < mapPopu.length; i++) {
		country = []
		quotient = mapPopu[i] / 1000
		ratio = mapImmi[i] / quotient
		country[0] = mapCode[i]
		country[1] = ratio
		mapData[i] = country
	}

	var dataset = {};
	var onlyValues = mapData.map(function(obj){ return obj[1]; });
    var minValue = Math.min.apply(null, onlyValues);
	var maxValue = Math.max.apply(null, onlyValues);
	
	
	// add text to gradient legend
	var textMin = Math.round(minValue * 10) / 10
	var textMax = Math.round(maxValue * 10) / 10
	
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

	var node1 = document.createTextNode(textMax + " - Highest amount"),
		node2 = document.createTextNode("of immigrants "),
		node3 = document.createTextNode("per 1000 capita"),
		node4 = document.createTextNode(textMin + " - Lowest amount"),
		node5 = document.createTextNode("of immigrants "),
		node6 = document.createTextNode("per 1000 capita");

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

	var element = document.getElementById("mapLegendText");
	element.appendChild(para);
	
	// create color palette function
    var paletteScale = d3.scale.log()
            .domain([minValue, maxValue])
            .range(["#fcebff", "#3f004d"]);

	// fill dataset in appropriate format
	mapData.forEach(function(item){
		var iso = item[0];
		var value = item[1];
		dataset[iso] = { immigrants: Math.round(value * 10) / 10, fillColor: paletteScale(value) };
	});

	// render map
	var map = new Datamap({
		element: document.getElementById('mapEurope'),
		scope: 'europe',
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
			dataUrl: '/Data/eu.topojson',
			borderColor: '#dedede',
			borderWidth: .5,
			highlightBorderWidth: 3,
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
			datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
				if (geography.id.length == 3) {
					zoomSunburst(geography.properties.name)
					selectDropdownCountry(geography.properties.name)
				} else {
					zoomSunburst("Europe")
					selectDropdownCountry("Europe")
				}
			});
		}
		
	})
	d3.select(".datamap").style("width", "500px")
});
