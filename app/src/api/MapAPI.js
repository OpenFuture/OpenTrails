import { globalPatch, trailNameComparator, toTitleCase } from '../util';
import { getAllSavedTrailIds } from './bookMarks.js';
import _ from 'lodash';
import { APP_ID, RES_NAME, BASE_URL, GET_ALL_GROUP_URL } from '../../conf/ApiConfig.js';


const appendBookMarked = (exsistingTrails) => {
    return getAllSavedTrailIds()
        .then(cachedTrailIds => {
            exsistingTrails.forEach(trailData => {
                const isMarked = _.includes(cachedTrailIds, trailData.trailId);
                trailData.isBookmarked = isMarked;
            });
            return exsistingTrails;
        });
};

export default MapAPI = {
    fetchGroups(){
        return fetch(GET_ALL_GROUP_URL)
            .then(data => data.json())
            .then(json => {
                return json.features.map(f => globalPatch(f.attributes.Name));
            });
    },

    getTrailsByName(name) {
        const urlSafeName = mapNameToURL(name);
        let url = BASE_URL + `query?f=json&where=Name%3D%27${urlSafeName}%27&outFields=%2A&returnGeometry=false`;

        return fetch(url)
            .then(data => data.json())
            .then(json => {
                return json.features
                    .map(f => f.attributes)
                    .map(cleaner)
                    .map(CajaDelRioTrailsPatch);
            })
            .then(trails => appendBookMarked(trails))
            .then(trails => trails.sort(trailNameComparator));
    },


    getGeometry(mapId, key='OBJECTID') {
        let url = BASE_URL + `query?f=json&where=${key}%3D${mapId}&returnGeometry=true`;
        url += '&outSR=4326';

        return fetch(url)
            .then(data => data.json());
    }

};


const CajaDelRioTrailsPatch = (trailInfo) => {
    if (trailInfo.groupName === "Caja Del Rio") {
        trailInfo.trailName = `${trailInfo.groupName} - ${trailInfo.trailName}`;
    }
    return trailInfo;
};


const titlePatch = (str) => {
    return toTitleCase( globalPatch(str) );
};

function cleaner(rawData){
    const {
        TRLNAME,
        ACTIVITIES,
        MILES,
        SKILL_LEVL,
        CONDITION,
        OBJECTID,
        BRIEF_DESC,
        PARKING,
        TYPE,
        Name,
    } = rawData;

    return {
        groupName: titlePatch(Name),
        trailName: titlePatch(TRLNAME),
        activities: globalPatch(ACTIVITIES),
        length: globalPatch(MILES),
        skillLevel: titlePatch(SKILL_LEVL),
        condition: titlePatch(CONDITION),
        trailId: OBJECTID,
        description: !!BRIEF_DESC.trim() ? BRIEF_DESC.trim() : "NO DESCRIPTION AVAILIBLE",
        parking: !!PARKING.trim() ? titlePatch(PARKING) : "no",
        type: titlePatch(TYPE),
        rawData
    };
}

function mapNameToURL(name) {
    return name.replace(/\s/g, '%20')
        .replace(/\'/, `''`)
        .replace(/\//, '%2F');
}
