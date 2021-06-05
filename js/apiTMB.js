const appID = "a085011b";
const appKey2 = "224f575d2caadbf3bd7702dab78b21a4";
const today = new Date();
const date = `${
  today.getMonth() + 1
}-${today.getDate()}-${today.getFullYear()}`;
const deDonde = `fromPlace=41.405490,2.175279`;
const haciaDonde = `toPlace=41.422520,2.187824`;
const hora = new Date();
const time = `${today.getMinutes()}":"${today.getSeconds()};`;

fetch(
  `https://api.tmb.cat/v1/planner/plan?app_id=${appID}&app_key=${appKey2}&${deDonde}&${haciaDonde}&${date}&${time}&mode=TRANSIT,WALK&maxWalkDistance=300`
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
  return ruta;
};
