/* global mapboxgl */

// Datos para las APIs
const geocodingApi = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapboxToken =
  "pk.eyJ1IjoiYmFyb3NxdWl4eiIsImEiOiJja3BpODRhN28wMGJ6MnBuaTN5NmN4ZWR1In0.PhqZXoAD4H3HdtHRlY3Dcw"; // Mete aquí el Token de Mapbox
const tmbApi = "https://api.tmb.cat/v1/planner/plan";

const mapboxgl = "mapbox-gl/dist/mapbox-gl.css";
const appId = "https://api.tmb.cat/v1/planner/plan? app_id=&app_key=&b9fcb5f5"; // Mete aquí el app_id de TMB
const appKey = "9aa6e03d06e9c2fccd6c3cfe598bb58e"; // Mete aquí el app_key de TMB

mapboxgl.accessToken = mapboxToken;

console.log(typeof Map);

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFyb3NxdWl4eiIsImEiOiJja3BpN3p4dTkwZ20zMm9wY3I3Nm03M3hmIn0.FHmrjm4s8vS_ZGUCLYZayg";
const map = new Map({
  container: "YOUR_CONTAINER_ELEMENT_ID",
  style: "mapbox://styles/mapbox/streets-v11",
});

// LLama a esta función para generar el pequeño mapa que sale en cada paso
// Le tienes que pasar un array con las dos coordenadas y el elemento HTML donde tiene que generar el mapa
const generaMapa = (coordenadas, mapa) => {
  const mapbox = new mapboxgl.Map({
    container: mapa,
    style: "mapbox://styles/mapbox/streets-v11",
    center: coordenadas,
    zoom: 14,
  });
};

// Coordenadas que se mandarán a la API de TMB. Tienes que alimentar este objeto a partir de las coordenadas que te dé la API de Mapbox
const coordenadas = {
  desde: {
    latitud: 0,
    longitud: 0,
  },
  hasta: {
    latitud: 0,
    longitud: 0,
  },
};
