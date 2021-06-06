const arrayProva = [1, 2, 3];
const IndicacionDummy = document.querySelector(".paso-dummy");
const Indicacion = document.querySelector("pasos");

for (const lista in arrayProva) {
  const nuevaIndicacion = IndicacionDummy.cloneNode(true);
  nuevaIndicacion.clasList.remove(".paso-dummy");
  Indicacion.querySelector(".paso-numero").TextContent = lista;

  Indicacion.append(nuevaIndicacion);
}
