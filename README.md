# Programming Project - Immigration in Europe  
Course: Programmeerproject  
Name: Jasper Naberman  
Student number: 10787224 
  
## [GitHub Pages](https://jaspernaberman.github.io/Programming-Project/Scripts/HTML/index.html)  
  
## Product Goal  
In the current social media environment, a lot of arguing about immigration takes place. Both left- and right-wing opinions are spat out using assumptions, sophistry and false information. Seldom is looked at the relevance of data and, perhaps even more important, the relations within it. This leads to a widespread discussion based on foul sources in both modern society and politics.  
The idea for this product is to provide a solid and neutral basis for further debate using data from all around Europe to visualize the actual amount of immigration facing the continent. The ratio of the amount of immigrants per 1000 capita is shown, the absolute amount of immigrants per country, and the distribution of the nature of an immigration stream per country.  
  
## Website Walkthrough  
#### Homepage  
The website consists of a main homepage that shows the title and subtitle of the product, projected on an image. At the top of the page is a navigation bar, which contains links with symbols to the other webpages of the site.  
![](doc/homepage_(31-01).png)  
  
At the bottom of the page (when scrolled down) some general information is displayed. Some of the text is hyperlinked.  
  
![](doc/homepageBottom_(31-01).png)  
  
#### Visualization Page  
This page is the most interesting page of the website. It contains all the data visualizations that have been made. At the left is a map of Europe. The countries are color coded to the amount of immigrants per 1000 capita of that country. A darker shade means a higher amount of immigrants per 1000 capita. The map holds a tooltip, which will show the exact amount of immigrants per 1000 capita of the country which is hovered over with the mouse.  
At the right is a sunburst which in the middle shows the whole of Europe. The first layer (all the children of Europe) contains all the countries that are colored on the map. These are color coded to the percentage of immigrants that they took up in comparison to the rest of Europe. The second layer tells the user about the nature of the immigrants per country. These cells are color coded to the percentage of that country. This information, together which the absolute amount of immigrants is displayed per country with a tooltip, while hovering over it with the mouse.  
At the top left is a dropdown menu, which will let the user select a country, on which is than zoomed in at the sunburst. At the top of the page is a navigation bar, which contains links with symbols to the other webpages of the site.  
![](doc/vispage1_(31-01).png)  
When scrolling down at this page the user will see a bar chart. This chart displays the absolute amount of immigrants per country. The chart is sortable in different ways. The requested way can be selected using the radio buttons above the chart. The barchart also contains a tooltip which tells the user the exact amount of immigrants.  
While hovering over the bars in the bar chart or the cells in the sunburst, the border of the relevant country in the map will become wider, therefore indicating where that country is on the map.  
![](doc/vispage2_(31-01).png)  
  
#### Story Page  
On this page a summary of the goal of the website is given. This is done with a problem statement and a response to that statement. Both text areas are joined by an image on the right. At the top of the page is a navigation bar, which contains links with symbols to the other webpages of the site.  
![](doc/storypage_(31-01).png)  
  
#### Additional Information Page  
On this page some additional information about the website is displayed. On the left the sources for coding and data are displayed. On the right some contact information about me, the creator, is displayed. At the top of the page is a navigation bar, which contains links with symbols to the other webpages of the site.  
![](doc/addinfopage_(31-01).png)  
  
## Sources  
#### Data Sources  
All used data originated from [Eurostat](https://ec.europa.eu/eurostat/web/main/home), the statistical office of the European Union. The exact datasets used are:
* [Immigration by age group, sex and citizenship](https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=migr_imm1ctz&lang=en)
* [Population on 1 January by age group, sex and citizenship](https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=migr_pop1ctz&lang=en)  
  
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