# Process Book
###### Documented development process as well as the finalized application. Contains my daily resume of design decisions and other considerations.

Course: Programmeerproject  
Name: Jasper Naberman  
Student number: 10787224  
  
* __Day 1 (08-01)__
    * Completed README.md. This document contains a project proposal.  
    This proposal contains a problem statement, a solution for that problem, a visual sketch of the finalized product, a list of features available for the user (separated in features for the Minimum Viable Product and optional features), data sources, a list of external components such as libraries, a review of a similar online visualization and finally, possible bottlenecks of the project.
* __Day 2 (09-01)__
    * Started working on a design document, in the DESIGN.md file.  
    This document contains a list of the data sources for the project and how they will be processed.  
    It also contains a diagram of the technical components of the finalized product. This means a flowchart of the webpages, and a closer look at the visualization page of the product.  
    In that last sketch it is exactly given how the different visualizations are interactive for the user and how they are linked with each other.  
    Next, the design document contains a section about how the application and it’s different visualizations will be implemented, and finally, which API’s and D3 plugins it will use.
* __Day 3 (10-01)__
    * Processed the feedback on the project proposal from Day 1. This more specifically means that I changed the idea of having a line chart next to a map of Europe and a bar chart to having a sunburst chart next to these other visualizations.  
    This is because I made a line chart already, during the Data Processing course. I did not make a sunburst chart yet, adding a possible extra bottleneck, but also a bit more of a challenge.  
    I also thought of a way to organize my ‘to be’ json-file.
*__Day 4 (11-01)__
    * I wrote a script to convert the .csv-extension dataset to a .json-extension. The dataset consists of 6 different values per country.  
    For example the data of Belgium:
    Country | Citizen Type | Value
    :---: | :---: | :---:
    Belgium	| Total	| 146626
    Belgium	| Reporting country	| 17864
    Belgium	| EU28 countries except reporting country | 6184
    Belgium	| Non-EU28 countries nor reporting country | 65808
    Belgium	| Stateless	| 6
    Belgium	| Unknown | 1108
    
    This was organized as Belgium adding ‘Belgium’ to a dictionary, while being a dictionary itself.  
    This way, the key-value pairs like ‘Stateless’-‘6’ could be added to the corresponding country’s dict.  
    In JSON-format, the data of Belgium looks as follows:
    ```json
    {
     "Belgium": {
      "EU28 countries except reporting country": 6184,
      "Non-EU28 countries nor reporting country":65808,
      "Reporting country": 17864,
      "Stateless": 6,
      "Total": 146626,
      "Unknown": 1108
     }
    }

    ```
    Today I also made a skeleton/first prototype of the website. The site as it is now consists of a homepage, a visualization page, and an additional information page.  
    The homepage contains some general info and a welcome message. The visualization page at the moment consists of a TopoJSON map of Europe.  
    The additional information page consists of three html columns, in which a ‘Story’ about the website can be found, a list of ‘Data Sources’ and some ‘Contact’ information.

* __Day 5 (12-01)__
    * I updated the 'Additional Information page' with a small story about the problem statement and the given solution for it.  
    The page now also contains some contact information and links to this GitHub repository. Finally a list of data sources is added, together with information on the used API's and D3 plugins.
    On the Visualization page a new barchart is added with the absolute amount of immigrants per country.  
    This barchart is already interactive, because it consists partially of a tooltip and a on mouseover function.
    The JavaScript-script for this chart is located in a seperate file, to keep an overview of all visualizations.
    The Visualization page still holds the TopoJSON map of Europe. This map is however not yet interactive, or color coded.
