# Project Proposal

Course: Programmeerproject  
Name: Jasper Naberman  
Student number: 10787224  

## Problem Statement
This is a statement concerning the problem the finished product will solve.

In the current social media environment, a lot of arguing about immigration takes place. Both left- and right-wing opinions are spat out using assumptions, sophistry and false information. Seldom is looked at the relevance of data and, perhaps even more important, the relations within it. This leads to a widespread discussion based on foul sources in both modern society and politics.

## Solution
The idea for this product is to provide a solid and neutral basis for further debate using data from all around Europe to visualize the actual amount of immigration facing the continent.

A visual sketch of the final product:
![](doc/TechComp_VisualisationPage)

A list of main features available to users:

Features for the minimum viable product (MVP):
* Selecting a country on the D3-map
* Show visualisations linked to that specific country
* Show an interactive crosshair on the line chart
* Select a bar on the bar chart, shows the corresponding country on the map
* Drop down menu to select a country's history of immigration in the line graph
* A button to show different datasets seperating refugees and other immigrants

Optional features:
* A second bar chart showing the countries the immigrants originated from.

## Prerequisites
#### Data Sources
* [Immigration in EU over the years by age group, sex and citizenship - Eurostat](http://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=migr_imm1ctz&lang=en)
* [Population and other demographics in EU countries - Eurostat](http://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=migr_pop1ctz&lang=en). This dataset and the dataset above need to be combined to calculate the amount of immigrants per 1,000 citizens.
* [Distribution of citizenship among immigrants, seperation nationals and non-nationals - Eurostat](http://ec.europa.eu/eurostat/statistics-explained/images/2/2f/Migration_and_migrant_population_statistics_YB2017.xlsx)

#### External Components
* [D3 tip library](https://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js)
* [TopoJSON](https://github.com/topojson/topojson)
* [jQuery](https://jquery.com), [Bootstrap](https://getbootstrap.com)

#### Review
Here a will review [a visualisation by the BBC](http://www.bbc.com/news/world-europe-34131911) concerning the migrant crisis in Europe.
The visualisation also aims to provide a factual basis for the discussion concerning this subject. However, the BBC provides each visualisation with a small paragraph of text, in which their own ideology might (intentional or not) slip through.
A second point of criticism is that  the visualisations provided are not in any way interactive. An interactive element might help the user understanding the data better. Also the visualisations are only linked with each other through story, not in any technical aspects or programmed features. My finished product will have both interaction and linked visualisations, aiming to be more informative than the visualisation by the BBC.

#### Bottlenecks
This is a list of the hardest parts of implementing:
* link a topographical map to the other two visualisations
* link the two non-topographical visualisations to each other and to the map
* create a tooltip and interactive crosshair on the line chart
* create a button/menu to seperate refugees and other immigrants
