import React, {
    Platform,
    Component,
    Linking,
    StyleSheet,
} from 'react-native';

import Mapbox from 'react-native-mapbox-gl';
import Spacer from '../Spacer.js';
import MapApi from '../../api/MapAPI.js';
import Loader from '../Components/Loader.js';
import { MAP_TOKEN } from '../../../conf/ApiConfig.js';

const TOKEN = MAP_TOKEN;

export default class TrailDetailView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            geometry: null
        };
    }

    componentWillMount(){
        MapApi.getGeometry(this.props.trailId)
            .then(data => {
                this.setState({
                    loaded: true,
                    geometry: data.features[0].geometry
                });
            });
    }

    render(){
        return (
            <Spacer>
              <Loader isLoading={!this.state.loaded}>
                {this.state.loaded ? this.renderMap() : null}
              </Loader>
            </Spacer>
        );
    }

    renderMap() {
        return (
            <Mapbox
               showsUserLocation={true}
               style={styles.map}
               zoomLevel={12}
               onLongPress={this.handelLongPress}
               centerCoordinate={this.renderCenterPoint()}
               annotations={this.getAnnotations()}
               accessToken={TOKEN}/>
        );
    }

    getMapCenterPoint() {
        // this is fairly arbitrary
        const coords = this.state.geometry.paths[0];
        return coords.map(([lon, lat]) => [lat, lon]);
    }

    renderCenterPoint() {
        const newCenter = this.getMapCenterPoint()[0];
        return {
            latitude: newCenter[0],
            longitude: newCenter[1],
        };
    }

    getAnnotations() {
        const annotations = this.state.geometry.paths.map( (path, i) => {
            return {
                coordinates: thinArray(path.map(([lon, lat]) => [lat, lon])),
                type: 'polyline',
                strokeWidth: 2,
                id: `${i}`
            };
        });

        return annotations;
    }

    handelLongPress(location) {
        const { latitude, longitude} = location;

        if (Platform.OS == 'ios') {
            Linking.openURL(`http://maps.apple.com/?daddr=${latitude},${longitude}`);
        }
    }

}





function thinArray(array) {
    const length = array.length;

    if (length < 500) {
        return array;
    }

    // return array;
    cleanArray(array);
    return DouglasPeuckerReduction(array, getEpsilonVal(length));
}


function getEpsilonVal(length) {
    if (length < 1000) {
        return 1e-7;
    }

    if (length < 5000) {
        return 1.e-4;
    }

    return 1.e-3;
}

function cleanArray(array) {
    const p1 = array[0];
    const p2 = array[array.length - 1];

    if (eqPoints(p1, p2)) {
        // jitter point val, just a tad
        p1[0] += 0.0000000001;
    }
}


function eqPoints(p1, p2) {
    return p1[0] === p2[0] && p2[1] === p2[1];
}


function DouglasPeuckerReduction(arrayOfPoints, epsilon) {
    // 1) find point with maximum distance
    let dmax = 0;
    let index = 0;
    const length = arrayOfPoints.length;

    for(var i = 1; i < length - 1; i++) {
        let d = perpendicularDistance(arrayOfPoints[i], [arrayOfPoints[0], arrayOfPoints[length-1]]);
        if (d > dmax) {
            index = i;
            dmax = d;
        }
    }

    // 2) if max distance is greater than epsilon recursively simplify
    let ResultList;
    if (dmax > epsilon) {
        // Recur
        let recurResults1 = DouglasPeuckerReduction( arrayOfPoints.slice(0, index), epsilon );
        let recurResults2 = DouglasPeuckerReduction( arrayOfPoints.slice(index, length), epsilon );

        ResultList = [
            ...recurResults1,
            ...recurResults2,
        ];

    } else {
        ResultList = [arrayOfPoints[0], arrayOfPoints[length-1]];
    }

    return ResultList;
}


function perpendicularDistance(point, line) {
    point = pointTransform(point);
    const p1 = pointTransform(line[0]);
    const p2 = pointTransform(line[1]);


    const a = p1.lon - p2.lon;
    const b = p2.lat - p1.lat;
    const c = (p1.lat - p2.lat) * p1.lon + (p2.lon - p1.lon) * p1.lat;

    const numerator = Math.abs(a * point.lat + b * point.lon + c);
    const demon = Math.sqrt(a*a + b*b);

    if (demon === 0) {
        throw new Error("degenerate line definition");
    }

    return numerator / demon;
}

function pointTransform(point) {
    return {
        lat: point[0],
        lon: point[1]
    };
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
