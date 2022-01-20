// Add console.log to check to see if our code is working.
console.log("working");

const API_KEY = MapboxApiKey;

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// D3 - 1. create the third tile layer that will be the background of our map.
// see https://docs.mapbox.com/api/maps/styles/
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30.7, -20.5],
  zoom: 3,
  layers: [streets]
});

// Create a base layer that holds all available maps.
let baseMaps = {
  "Streets": streets,
  // D3 - 2: add to baseMaps
  "Satellite": satelliteStreets,
  "Dark": dark,
};

// create a L.LayerGroup() object for allEarthquakes
// D1 - 1. Add a 2nd layer group for the tectonic plate data.
// D2 - 1. Add a 3rd layer group for the major earthquake data.
let allEarthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();
let majorEarthquakes = new L.LayerGroup();


// D1 - 2. Add a reference to the tectonic plates group to the overlays object.
// D2 - 2. Add a reference to the major earthquake group to the overlays object.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Techtonic Plates": tectonicPlates,
  "Major Earthquakes": majorEarthquakes,
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
// make control layer visible using collapsed: false
L.control.layers(baseMaps, overlays, {
  collapsed: false
}).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,

    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  allEarthquakes.addTo(map);

  // ########## Insert D2 - steps 3 through 9 here
  // 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
  // see https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php and select Past 7 Days M4.5+
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function (majorData) {

    // 4. Use the same style as the earthquake data.
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }


    // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
    function getColor(magnitude) {
      if (magnitude > 6) {
        return "#c71e1e";
      }
      else if (magnitude > 5) {
        return "#ea2c2c";
      }
      else {
        return "#ea822c";
      }      
    }

    // 6. Use the function that determines the radius of the earthquake marker based on its magnitude.
    function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
      return magnitude * 4;
    }

    // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
    // sets the style of the circle, and displays the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    L.geoJson(majorData, {

      // Turn each feature into a circleMarker on the map using pointToLayer and the L.circleMarker(latlng) method
      pointToLayer: function(feature, latlng) {
        console.log(majorData);
        return L.circleMarker(latlng);
      },

      // Style each circle with styleInfo() function
      style: styleInfo,

      // Create a popup for the circle to display the magnitude and location of the earthquake using onEachFeature and bindPopup() method
      // This should be the same as used for allEarthquakes
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }

      // Add the major earthquake layer group variable you created in Step 1 to the map, i.e., .addTo(majorEQ)   
    }).addTo(majorEarthquakes);

    // 8. Add the major earthquakes layer to the map.
    majorEarthquakes.addTo(map);

    // 9. Close the braces and parentheses for the major earthquake data.
  });

  // ########## End of D2 - steps 3 through 9

  // Here we create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  // modified using choropleth tutorial
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");    
    
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    // add label for legend
    div.innerHTML += '<h6>Magnitude</h6>';

    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " + 
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);


  // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  // get GeoJSON from https://github.com/fraxen/tectonicplates github repository
  // select GeoJSON folder and open the PB2002_boundaries.json file and select the "Raw" button to view the data in json format.
  // copy the link https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json and pass to the d3.json() method
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (tectonicData) {
    console.log(tectonicData);

    // pass the tectonic plate data (tectonicData) to the geoJSON() layer using L.geoJson method
    // Style the lines with a color and weight that will make it stand out on all maps
    L.geoJSON(tectonicData, {
      color: "blue",
      weight: 2.5,
    })
      // Add the tectonic layer group variable you created in Step 1 to the map, i.e., .addTo(tectonicPlates) and close the geoJSON() layer.
      .addTo(tectonicPlates);

    // Next, add the tectonic layer group variable to the map, i.e, tectonicPlates.addTo(map).
    tectonicPlates.addTo(map);

    // Finally, close the d3.json() callback for tectonic plates
  });

  // close the d3.json() callback for USGS earthquake data
});