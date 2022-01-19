// my logic.js file
// see https://docs.mapbox.com/help/glossary/ for mapbox help

// confirm link is working
console.log("working");

// get API_KEY
const API_KEY = MapboxApiKey;

// Create the map object with a center and zoom level.
// Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([37.5, -122.5], 10);

// Create the map object with center and zoom level.
let map = L.map('mapid').setView([43.7, -79.3], 11);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/<GitHub_name>/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/jamie-miller-rva/Demo_Mapping_Earthquakes/main/Mapping_GeoJSON_Points/static/data/majorAirports.json";

// Accessing the Toronto airline routes GeoJSON URL.
// let torontoData = "https://raw.githubusercontent.com/jamie-miller-rva/Demo_Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/static/data/torontoRoutes.json";

// // Create a style for the lines.
// let myStyle = {
//   color: "#ffffa1",
//   weight: 2
// }

// // Grabbing our GeoJSON data.
// d3.json(torontoData).then(function(data) {
//   console.log(data);
// // Creating a GeoJSON layer with the retrieved data.
// L.geoJSON(data, {
//   style: myStyle,
//   onEachFeature: function(feature, layer) {
//     layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr> <h3> Destination: " + feature.properties.dst + "</h3>");
//   }
// })
// .addTo(map);
// });

// Alternate method (pick one)
// Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// mapping GeoJSON Point
// Add GeoJSON data.


// To display data on a map with a popup marker, we have to bind the marker with the GeoJSON layer, 
// L.geoJSON(), using a callback function.
// L.geoJson(data, {
//   pointToLayer: function(feature, latlng) {
//     return L.marker(latlng);
//    }
// });

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function (feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.city + ", " + feature.properties.state + "</h2> <hr> <h3>" + feature.properties.name);
//   }
  
// }).addTo(map);

// // alternative method
// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>Airport Code: " + feature.properties.faa + "<hr> <h3>Airport name: " + feature.properties.name);
//    }
// }).addTo(map);

//  mapping lines
// The starting point for our line will be the Los Angeles International Airport (LAX), with the coordinates [33.9416, -118.4085]. 
// The ending point for our line will be the San Francisco International Airport (SFO), with the coordinates [37.6213, -122.3790].

// add two more airport stops to our line variable: Salt Lake City International Airport (SLC) and Seattle-Tacoma International Airport (SEA).

// Coordinates for each point to be used in the line.
// Coordinates for each point to be used in the polyline.
// let line = [
//   [33.9416, -118.4085],
//   [37.6213, -122.3790],
//   [40.7899, -111.9791],
//   [47.4502, -122.3088]
// ];

// Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//   color: "yellow"
// }).addTo(map);

// We create the tile layer that will be the background of our map.
// see https://docs.mapbox.com/api/maps/styles/#mapbox-styles
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/satellite-streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

// add dark
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/dark-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

// add light map
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/light-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

// Then we add our 'streets' tile layer to the map.
satelliteStreets.addTo(map);

//  Add a marker to the map for Los Angeles, California.
// see https://leafletjs.com/reference-1.6.0.html#marker
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// add a circle
// see https://leafletjs.com/reference-1.6.0.html#circle
// also see https://leafletjs.com/reference-1.6.0.html#circlemarker
// see https://www.w3schools.com/cssref/css_colors.asp for colors examples
// L.circle([34.0522, -118.2437], {
//   color: 'black',
//   fillColor: 'LightYellow',
//   fillOpacity: 0.7,
//   radius: 300
// }).addTo(map);

// add marker for each city in citie
// Loop through the cities array and create one marker for each city.
// cities.forEach(function(city) {
//   console.log(city);
//   L.circleMarker(city.location, {
//     color: 'orange',
//     fillColor: 'orange',
//     weight: 4,
//     fillOpacity: 0.3,
//     radius: (city.population - 200000) /100000
//   })
//   .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//   .addTo(map);
//  });

