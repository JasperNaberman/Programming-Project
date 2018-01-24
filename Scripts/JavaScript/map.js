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
	
	// total = 0
// 	for (i = 0; i < mapPopu.length; i++) {
// 		total += mapImmi[i]
// 	}
// 	console.log("total: ", total)
// 	for (i = 0; i < mapPopu.length; i++) {
// 		relative = mapImmi[i] / total
// 		console.log(mapCountries[i], relative * 100)
// 	}

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

	// create color palette function
    var paletteScale = d3.scale.sqrt()
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
				.scale(300)
				.translate([element.offsetWidth / 2 - 50, element.offsetHeight + 150]);
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
				'<br>No Information Available.</div>'].join(''); }
				// tooltip content
				return ['<div class="hoverinfo">',
				'<strong>', geo.properties.name, '</strong>',
				'<br>Immigrants per 1000 capita: <strong>', data.immigrants, '</strong>',
				'</div>'].join('');
			}
		},
		done: function(datamap) {
			datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
				alert(geography.properties.name);
			});
		}
	})
});
