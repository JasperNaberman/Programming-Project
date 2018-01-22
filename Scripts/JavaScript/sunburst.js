/* sunburst.js
*
* Jasper Naberman
* 10787224
* Programming Project
*
* A .js-script for the sunburst chart on the visualization page
*/

// load the data
sb_counter = 0
sb_countries = []
sb_data_total = []
sb_data_EU28 = []
sb_data_non_EU28 = []
sb_data_reporting = []
sb_data_stateless = []
sb_data_unknown = []


d3.json("/Data/immigrationData.json", function(error, data) { Object.keys(data).forEach(function(key) {
	if (data[key]["Total"] != "No Data Available") {
		sb_countries[sb_counter] = key;
		sb_data_total[sb_counter] = data[key]["Total"];
		sb_data_EU28[sb_counter] = data[key]["EU28 countries except reporting country"];
		sb_data_non_EU28[sb_counter] = data[key]["Non-EU28 countries nor reporting country"];
		sb_data_reporting[sb_counter] = data[key]["Reporting country"];
		sb_data_stateless[sb_counter] = data[key]["Stateless"];
		sb_data_unknown[sb_counter] = data[key]["Unknown"];
		sb_counter++
		}
	});
	// console.log(countries[0])
	// console.log(data_total[0])
	// console.log(data_EU28[0])
	// console.log(data_non_EU28[0])
	// console.log(data_reporting[0])
	// console.log(data_stateless[0])
	// console.log(data_unknown[0])

});