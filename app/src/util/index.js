/**
 * converts A stRing -> To Title Case.
 */

import numeral from 'numeral';
import { GLOBAL_PATCH } from '../../conf/strings.js';


export function toTitleCase(string){
    return string
        .split(' ')
        .map( w => w.toLocaleLowerCase())
        .map( x => x.slice(0,1).toUpperCase() + x.slice(1))
        .join(' ');

}

export function numberFormatter(number, format='0.00') {
    return numeral(number).format(format);
}

export const globalPatch = (str) => GLOBAL_PATCH[str] || str;

export const bindFns = (obj, fns = []) => {
    fns.forEach(fn => {
        obj[fns] = obj[fns].bind(obj);
    });
};


export const trailNameComparator = (a,b) => {
    return (a.trailName < b.trailName) ? -1 : 1;
};
