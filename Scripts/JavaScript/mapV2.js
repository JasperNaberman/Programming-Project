var map = new Datamap({
  element: document.getElementById('europe'),
  geographyConfig: {
    dataUrl: '/Data/eu.topojson'
  },
  scope: 'europe',
  fills: {
    defaultFill: '#bada55',
    someKey: '#fa0fa0'
  },
  setProjection: function(element) {
    var projection = d3.geo.mercator()
      .scale(300)
      .translate([element.offsetWidth / 2 - 50, element.offsetHeight + 150]);
     var path = d3.geo.path().projection(projection);
     return {path: path, projection: projection};
  }
});