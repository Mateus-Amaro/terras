// GEE Script - Processamento de Terras Agrícolas
var table = ee.FeatureCollection("users/SEU_USUARIO/NOME_DO_KML"); // substitua pelo caminho do seu KML
var year = 2023;

// Função para filtrar Sentinel-2 com <10% nuvem
function getSentinelImage(dateStart, dateEnd) {
  var image = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterBounds(table)
    .filterDate(dateStart, dateEnd)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .map(function(img) {
      return img.clip(table);
    })
    .median();
  return image;
}

// Datas fixas
var octImg = getSentinelImage(year + "-10-01", year + "-10-31");
var decImg = getSentinelImage(year + "-12-01", year + "-12-31");
var janImg = getSentinelImage(year + "-01-15", year + "-01-31");

// NDVI
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
}

var ndviOct = addNDVI(octImg);
var ndviDec = addNDVI(decImg);
var ndviJan = addNDVI(janImg);

// Exportar para Drive
Export.image.toDrive({
  image: ndviOct.select('NDVI'),
  description: 'NDVI_OCT',
  scale: 10,
  region: table.geometry(),
  maxPixels: 1e13
});

// Repetir exportações conforme necessário