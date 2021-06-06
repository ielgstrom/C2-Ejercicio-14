/* global mapboxgl */

// Datos para las APIs
const geocodingApi = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapboxToken =
  "pk.eyJ1IjoiaWVsZ3N0cm9tIiwiYSI6ImNrcGwydDJuZDAxamYyb211Nm5kNjNiNmQifQ.JbtIYXee-aY4lwt8FDeJiA"; // Mete aquí el Token de Mapbox
const tmbApi = "https://api.tmb.cat/v1/planner/plan";
const appId = ""; // Mete aquí el app_id de TMB
const appKey = ""; // Mete aquí el app_key de TMB
mapboxgl.accessToken = mapboxToken;

// aqui hacemos que aparezca una barra de busqueda en los botones
const formulario = document.querySelector("form");
formulario.querySelector("#a-direccion").addEventListener("change", (b) => {
  if (b.target.value === "on") {
    formulario.querySelector(".a-direccion-definitiva").classList.add("on");
  }
});
formulario.querySelector("#a-mi-ubicacion").addEventListener("change", (e) => {
  if (e.target.value === "on") {
    formulario.querySelector(".a-direccion-definitiva").classList.remove("on");
  }
});
formulario.querySelector("#de-direccion").addEventListener("change", (e) => {
  if (e.target.value === "on") {
    formulario.querySelector(".de-direccion-definitiva").classList.add("on");
  }
});
formulario.querySelector("#de-mi-ubicacion").addEventListener("change", (e) => {
  if (e.target.value === "on") {
    formulario.querySelector(".de-direccion-definitiva").classList.remove("on");
  }
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
