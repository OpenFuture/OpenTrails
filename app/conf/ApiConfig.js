var map_config = require('../map-config.json');

const APP_ID = map_config.MAP_ID;
const RES_NAME = map_config.RES_NAME;
const BASE_URL = `http://services3.arcgis.com/${APP_ID}/arcgis/rest/services/${RES_NAME}/FeatureServer/0/`;
const GET_ALL_GROUP_URL = BASE_URL + 'query?f=json&where=1%3D1&returnGeometry=false&outFields=Name&returnDistinctValues=true&returnM=false&returnZ=false';

const MAP_TOKEN = map_config.MAP_TOKEN;


export { APP_ID, RES_NAME, BASE_URL, GET_ALL_GROUP_URL, MAP_TOKEN };
