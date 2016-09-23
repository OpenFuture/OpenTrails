import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';

import { ERROR_MESSAGE } from '../../../conf/strings.js';
import { brickRed } from '../colors.js';
const bug = require('../../ui/images/bug.png');

class ErrorScreen extends Component {


    constructor(props) {
        super(props);

        const { width, height } = Dimensions.get('window');

        this.state = {
            bugWidth: new Animated.Value(100),
            bugOpacity: new Animated.Value(0.3),
        };
    }

    componentDidMount() {
        const animations = [];

        const bugOpacityAnim = Animated.timing(
            this.state.bugOpacity,
            {
                toValue: 0.7,
                duration: 600,
            }
        );

        const growAnimation = Animated.spring(
            this.state.bugWidth,
            {
                toValue: this.getMaxBugWidth(),   // Returns to the start
                velocity: 10,  // Velocity makes it move
                tension: 0, // Slow
                friction: 2,  // Oscillate a lot
            }
        );

        animations.push(
            growAnimation
        );


        Animated.sequence(animations).start();
    }

    render(){

        console.log("this.props", this.props);
        const width = this.state.bugWidth;
        const opacity = this.state.bugOpacity;

        return (

            <View style={styles.container}>


              <Text style={styles.errorText}>
                {ERROR_MESSAGE}
              </Text>


              <Animated.Image
                 style={[styles.bugImage, { width, opacity}]}
                 source={bug} />
            </View>
        );
    }

    getMaxBugWidth() {
        const { width, height } = Dimensions.get('window');
        return Math.min(width, height) * 0.3;
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
    },

    bugImage: {
        opacity: 0.7,
        flex: 1,
        height: null,
        resizeMode: 'contain',
    },

    errorText: {
        color: brickRed,
        fontSize: 18,
        textAlign: 'center',
    }
});

export default ErrorScreen;
