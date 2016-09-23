import { trailNameComparator } from '../util';
import {
    AsyncStorage,
} from 'react-native';

import _ from 'lodash';



export const saveTrailData = (trailData) => {
    const { trailId } = trailData;
    const key = JSON.stringify(trailId);

    const storageData = JSON.stringify(trailData);

    return AsyncStorage.setItem(key, storageData);
};

export const removeTrailData = (trailId) => {
    const key = JSON.stringify(trailId);
    return AsyncStorage.removeItem(key);
};

export const getTrailData = (trailId) => {
    const key = JSON.stringify(trailId);
    return AsyncStorage.getItem(key)
        .then(data => JSON.parse(data));
};

export const getAllSavedTrailIds = () => {
    return AsyncStorage.getAllKeys()
        .then(keys => keys.map((key) => parseInt(key)));
};


export const getAllSavedTrails = () => {
    return AsyncStorage.getAllKeys()
        .then(keys => {
            return AsyncStorage.multiGet(keys)
        })
        .then(res => {
            return _.compact( res.map(([key, value]) => JSON.parse(value)) )
                .sort(trailNameComparator);
        });
};
