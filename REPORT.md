# Programming Project - Immigration in Europe  
Course: Programmeerproject  
Name: Jasper Naberman  
Student number: 10787224  
  
![](doc/homepage_(31-01).png)  
  
The idea for this product is to provide a solid and neutral basis for further debate on immigration using data from all around Europe to visualize the actual amount of immigration facing the continent. The ratio of the amount of immigrants per 1000 capita is shown, the absolute amount of immigrants per country, and the distribution of the nature of an immigration stream per country. A more comprehensive description of the product's features is given in the README.md-file of this repository.  
  
## Technical Design  
  
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
All used data originated from [Eurostat](https://ec.europa.eu/eurostat/web/main/home), the statistical office of the European Union. The exact datasets used are:
* [Immigration by age group, sex and citizenship](https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=migr_imm1ctz&lang=en)
* [Population on 1 January by age group, sex and citizenship](https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=migr_pop1ctz&lang=en)  
  
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