# Programming Project - Immigration in Europe  
Course: Programmeerproject  
Name: Jasper Naberman  
Student number: 10787224  
  
![](doc/homepage_(31-01).png)  
  
The idea for this product is to provide a solid and neutral basis for further debate on immigration using data from all around Europe to visualize the actual amount of immigration facing the continent. The ratio of the amount of immigrants per 1000 capita is shown, the absolute amount of immigrants per country, and the distribution of the nature of an immigration stream per country. A more comprehensive description of the product's features is given in the README.md-file of this repository.  
  
## Technical Design  
#### HTML and Bootstrap  
This repository knows 4 HTML-files. One for each page of the website; the homepage (index.html), the visualization page (visualizations.html), the story page (story.html) and the additional information page (additional-info.html). The pages are linked with each other through a Bootstrap navigation bar on each of the pages. All the pages hold the same title to be displayed in the website-tab of the browser. The tab will also show a silhouette of Europe as favicon.  
For the guise design of the pages a lot of Bootstrap is used. How to use these elements and all possibilities of Bootstrap I mainly learned from w3schools.com. However, I did not use a pre-made template.  
Next to the navigation bar I used jumbotrons, wells, the grid system and hero images (and hero text inside).  
The visualization page also holds 2 radiobuttons, which will sort the bar chart as the user requests, and a dropdown menu which will zoom in on a country (or zoom out for entire Europe) in the sunburst.  
  
#### CSS  
This repository knows 3 CSS-files. One for the homepage, one for the bar chart and one for the sunburst.  
The file for the homepage mainly sets some attributes for the image, the text in the image and the jumbotron below, which are basically all the elements on the page.  
The file for the bar chart does dome more work, setting the (hover)color of the bars, styling the tooltip of the chart and setting the layout of the radio buttons.  
The file for the sunburst chart sets the color of the paths of the cells and styles the tooltip and title.
  
#### JavaScript  
This repository knows 4 JavaScript-files. One file for the sunburst chart, one file for the bar chart, one file for the map of Europe and one file for the legend of the map. All these files are imported in one HTML-file; visualizations.html. This HTML-file calls all the scripts of the visualizations and places relevant div's and svg's at the correct location.  
  
* map.js: this script loads the data for the map and initiates a 'Datamap' using a custom TopoJSON-file. It specifies a popupTemplate as tooltip with the relevant information. It also holds some .on("click")-events, where the country on which the user clicks is zoomed in on in the sunburst, and the name of the country is shown in the dropdown menu. At the top of the file a function is specified which will highlight the relevant country when the function is called from a different file (i.e. when hovering over a country in the bar or sunburst chart this function is called, and the corresponding country will be highlighted in the map). This script also computes the maximum and minimum value in the map, and processes it to be displayed in a text string next to the legend of the map.  
    * mapLegend.js: initializes a canvas element on which a gradient is drawn with the same maximum and minimum color scale as the map.  
* sunburst.js: this script first declares some variables as the width, height, and several radiusus, later to be used to create the sunburst. Than it appends a svg-element with these properties the the correct Bootstrap-column in the DOM. After a tooltip is specified the script loads the data for the sunburst. It computes the correct color in the scale for each element of the data separately.  
On hovering the mouse over the sunburst the tooltip is shown with some data information about the element that is hovered over. This will disappear when the mouse no longer hovers over the element. Also, when hovering over a country in the sunburst, the corresponding country will be highlighted in the map.  
When a country is clicked in the sunburst, a function is called, which is defined later in the script, and which will zoom in on the clicked element, to let the user take a closer look at that element.  
When an element is clicked the name of that element of it's parent is also displayed in the dropdown menu. When the inout of the dropdown menu changes, the sunburst will zoom in on the requested country.  
Also a function is defined to be called by other scripts such as the map or the bar chart, which will also zoom in on the corresponding country.  
* barchart.js: after setting some general variables this script appends a svg-element to the body with the declared properties. It loads the data from the datafile and pushes the whished values to an array as if it was a dict. It appends a title to the chart and appends the axes of the chart to the svg. Then it adds all the bars, which the height representing the value of that country in the data (i.e. the amount of immigrants of that country). Then the script defines a function which is called when the user clicks on the radio buttons and which will sort the bar chart either alphabetically with the names of the countries, or reversed numerical (from high to low), based on the amount of immigrants of the countries. When a bar is clicked on the bar chart, a function is called to zoom in at the sunburst on the corresponding country.  
  
#### Data  
This repository knows 4 data files.  
The eu.topojson file contains all the paths and id's for DataMaps to draw the map of Europe, while mapData.json is used to compute the ratio of immigrants per 1000 capita. This ratio is used to color code the map. Each country in mapData.json is oraganized as a dict, which holds a key-value pair for the population-number, immigration-number and the country's three letter code.  
The sunburst.json file is used, as the name suggests, for the sunburst, and therefore has a very specific layout. The file is a dict which holds a key-value pair for the name of an element, and it's children. The first name encountered is "Europe", where the 'children' of Europe is an array of dicts. Every dict represents a country in the dataset. All these countries also have names and children, where the children are arrays of dicts as well. These dicts hold the final two key-value pairs, with as names the categories of immigrants (such as "Stateless" or "Reporting country") and as values the size of each of those categories. The sunburst the sizes of the countries on the basis of these values, which is why they do not have to be put in the data separately.  
The immigrationData.json is used by the bar chart and also holds information about all the different categories of immigrants per country. These categories are added up for each country to compute one total value to be displayed as the height of a bar in the bar chart.  
  
## Process and Development  
#### Challenges  
Some challenges I encountered while developing this product where design, interactivity and code linking.  
For the design I used a lot of Bootstrap, something I never used before. I was also never this involved with HTML, which I used a lot for this product. This was hard in the beginning, but got easier with the time.  
In the data processing course I failed to deliver a linked views visualization in the last week, so linking three visualization with each other was certainly an obstacle.  
This was almost the first time I worked with multiple code files for visualizations, so to link them I had quite some research to do.  
  
#### Acquired Skills  
I learned a lot of dexterity with data formatting. For each visualization in this product a different dataset is used, so getting handy with organizing .json-files and traversing dictionaries in JavaScript was a must.  
Next to a general improvement in coding skills in HTML, CSS and JavaScript and a deeper understanding of D3, I also learned how to build a sunburst chart with D3, and how to organize data for such a chart.  
I made a map before in the data processing course, but in this product I used a custom TopoJSON file of Europe, and I added a lot of supplemental functionality. Therefore I can conclude that I learned with DataMaps a lot better as well.  
I also overcame all of the challenges stated above, so I also acquired some skills in terms of design (specifically Bootstrap), interactivity and code linking.
  
## Comparison to DESIGN.md
#### Changes  
* The only thing changed to the HTML structure of the website in comparison to the initial design is that the 'story' about the site is now at a separate page, instead of implemented in the 'Additional Information' page.  
* The visualizations are all the same, but they display different data than initially thought.  
    * At the moment the color in the map represents the amount of immigrants per 1000 capita of that country. In DESIGN.md it is described to represent the absolute amount of immigrants.  
    * The bar chart displays the same data as initially thought. However, the radiobuttons to update this chart changed in functionality. At this moment they sort the bar chart to the user's request, while it was initially thought that they would update the bar chart to display the amount of immigrants per 1000 capita.
    * It was described in DESIGN.md that the inner ring would show the composition of the entire immigration stream of Europe, and that the outer ring would display the ratio of immigrants and original citizens. At this moment this has changed a lot. The inner ring of the sunburst now displays all the countries of Europe, and how much percent of the immigration stream of Europe they have absorbed. The outer ring shows for each country individually how the immigration stream is composed.  
* The organisation of the main functions has stayed more or less intact. Relating to the content this means that each visualization has it's own separate JavaScript file, which are imported in the HTML-file of the 'Visualization Page'.  
* The helper-function are not as explicitly implemented as is described in DESIGN.md, but since these functionalities are actually mathematical equations which are only used one time, they are implemented inside the JavaScript-files of the different visualizations.  
  
#### Defence  
I think that the current choices of data to be visualized and the way that it is visualized is more informative than the choices described in DESIGN.md. I think that the grouping and division of main- and helper-functions is perhaps slightly better in DESIGN.md. Given more time I would have streamlined the code layout more.  
  
## Sources  
#### Code Sources  
Note: a lot of these materials have their own respective licenses.
* Bootstrap related elements:
    * Navigation bar: [click here](https://www.w3schools.com/bootstrap/bootstrap_navbar.asp)
    * Jumbotron: [click here](https://www.w3schools.com/bootstrap/bootstrap_jumbotron_header.asp)
    * Wells: [click here](https://www.w3schools.com/bootstrap/bootstrap_wells.asp)
    * Rows and columns: [click here](https://www.w3schools.com/bootstrap/bootstrap_grid_basic.asp)
* Map of Europe:
    * TopoJSON map (paths and coördinates): [click here](https://github.com/leakyMirror/map-of-europe/blob/master/TopoJSON/europe.topojson)
    * The idea for a color coded map: [click here](http://datamaps.github.io/)
    * Legend gradient: [click here](https://www.w3schools.com/tags/canvas_createlineargradient.asp)
* Sunburst chart:
    * The idea for a zoomable sunburst: [click here](https://bl.ocks.org/mbostock/4348373)
    * The idea for rounded corners in the sunburst: [click here](https://bl.ocks.org/mbostock/aff9e559c5c9968b7ac6)
* Bar chart:
    * The idea for a highlight-able bar chart in D3: [click here](https://bost.ocks.org/mike/bar/3/)
    * The idea for the sort function for the bar chart: [click here](https://bl.ocks.org/mbostock/3885705)
    * The idea of a tooltip for the bar chart: [click here](http://bl.ocks.org/Caged/6476579)  
  
#### Data Sources  
All used data originated from [Eurostat](http://ec.europa.eu/eurostat), the statistical office of the European Union. The exact datasets used are:
* [Immigration by age group, sex and citizenship](http://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=migr_imm1ctz&lang=en)
* [Population on 1 January by age group, sex and citizenship](http://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=migr_pop1ctz&lang=en)  
  
#### API's and D3 Plugins  
* [D3](https://d3js.org)
* [D3 tip library](https://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js)
* [jQuery](https://jquery.com)
* [Bootstrap](https://getbootstrap.com)
* [TopoJSON](https://github.com/topojson/topojson)
* [DataMaps](https://datamaps.github.io/)  
  
#### Images
* Homepage image: [click here](https://www.chathamhouse.org/expert/comment/syrian-refugees-are-not-security-threat-they-are-feared-be)
* Story page image 'Problem': [click here](https://pixabay.com/nl/eritrea-landschap-tenten-hutten-105081/)
* Story page image 'Response': [click here](https://commons.wikimedia.org/wiki/File:Refugees_on_a_boat_crossing_the_Mediterranean_sea,_heading_from_Turkish_coast_to_the_northeastern_Greek_island_of_Lesbos,_29_January_2016.jpg)  
  
  
<p align="center"><i>
This project is licensed under the terms of the MIT license.</br>
Jasper Naberman, 2018
</i></p>