// my logic.js file
// see https://docs.mapbox.com/help/glossary/ for mapbox help

// confirm link is working
console.log("working");

// get API_KEY
const API_KEY = MapboxApiKey;

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

// Alternate method (pick one)
// Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

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

// add dark
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Then we add our 'streets' tile layer to the map.
dark.addTo(map);

//  Add a marker to the map for Los Angeles, California.
// see https://leafletjs.com/reference-1.6.0.html#marker
let marker = L.marker([34.0522, -118.2437]).addTo(map);

// add a circle
// see https://leafletjs.com/reference-1.6.0.html#circle
// also see https://leafletjs.com/reference-1.6.0.html#circlemarker
// see https://www.w3schools.com/cssref/css_colors.asp for colors examples
L.circle([34.0522, -118.2437], {
  color: 'black',
  fillColor: 'LightYellow',
  fillOpacity: 0.7,
  radius: 300
}).addTo(map);