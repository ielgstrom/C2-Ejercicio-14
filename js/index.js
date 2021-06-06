/* global mapboxgl */

// Datos para las APIs
const geocodingApi = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapboxToken =
  "pk.eyJ1IjoiaWVsZ3N0cm9tIiwiYSI6ImNrcGwydDJuZDAxamYyb211Nm5kNjNiNmQifQ.JbtIYXee-aY4lwt8FDeJiA"; // Mete aquí el Token de Mapbox
const tmbApi = "https://api.tmb.cat/v1/planner/plan";
const appId = "a085011b"; // Mete aquí el app_id de TMB
const appKey = "224f575d2caadbf3bd7702dab78b21a4"; // Mete aquí el app_key de TMB
mapboxgl.accessToken = mapboxToken;
// creo informaciones extra para que la API de TMB busque mas concretamente
const today = new Date();
const date = `${
  today.getMonth() + 1
}-${today.getDate()}-${today.getFullYear()}`;
const hora = new Date();
const time = `${today.getMinutes()}":"${today.getSeconds()};`;

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

// ahora estan definidas, pero se han de ir cambiando durante el ejericio!!!!!!! (ponerlas a 0 al principio)
const coordenadas = {
  desde: {
    latitud: 41.40549,
    longitud: 2.175279,
  },
  hasta: {
    latitud: 41.42252,
    longitud: 2.187824,
  },
};

const IndicacionDummy = document.querySelector(".paso-dummy");
const Indicacion = document.querySelector(".pasos");
// Aqui empezamos con el bucle por el cual se crearan las indicaciones
fetch(
  `https://api.tmb.cat/v1/planner/plan?app_id=${appId}&app_key=${appKey}&fromPlace=${coordenadas.desde.latitud},${coordenadas.desde.longitud}&toPlace=${coordenadas.hasta.latitud},${coordenadas.hasta.longitud}&${date}&${time}&mode=TRANSIT,WALK&maxWalkDistance=300`
)
  .then((response) => response.json())
  .then((datos) => queParadaEs(datos));

const queParadaEs = (datos) => {
  const infoTMB = datos.plan.itineraries[0].legs;
  const ruta = [];
  infoTMB.forEach((tramo) =>
    ruta.push([
      tramo.distance, // distancia recorreguda
      tramo.mode, // mode de transport
      tramo.duration, // distancia recorreguda en temps
      tramo.endTime, // temps amb el que s'arriba
      tramo.to.lat, // latitud arribada tram
      tramo.to.lon, // longitud arribada tram
      tramo.to.name, // lloc d'arribada
      tramo.route, // vehicle que agafes
    ])
  );
  for (const tramos in ruta) {
    const nuevaIndicacion = IndicacionDummy.cloneNode(true);
    nuevaIndicacion.classList.remove(".paso-dummy");
    Indicacion.querySelector(".paso-numero").TextContent = ruta.distance;
    console.log(ruta[tramos]);
    Indicacion.append(nuevaIndicacion);
  }
};
