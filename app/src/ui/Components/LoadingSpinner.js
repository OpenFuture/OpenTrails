import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

import { brickRed } from '../colors.js';
import Spinner from 'react-native-spinkit';

class LoadingSpinner extends Component {

    render(){
        const marginOffset = height * 0.2;

        return (
            <View style={[styles.spinnerContainer, { marginTop: -marginOffset }]}>

              <Text style={styles.loadingText}>
                {`( loading ... )`}
              </Text>

              {this.renderSpinner()}

            </View>
        );
    }


    renderSpinner() {
        const { width, height } = Dimensions.get('window');
        const size = Math.min(width, height) * 0.50;
        if (Platform.OS === 'ios'){
            return (
                <View style={styles.spinner}>
                  <Spinner
                     type={'9CubeGrid'}
                     size={size}
                     color={brickRed}
                     />
                </View>
            );
        } else {
            return null;
        }
    }
}


const styles = StyleSheet.create({

    spinnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    spinner: {
        marginTop: 60
    },

    loadingText: {
        color: brickRed,
        fontSize: 20,
        fontWeight: '100',
    }
});

export default LoadingSpinner;
