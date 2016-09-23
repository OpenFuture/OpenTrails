import React, {
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
} from 'react-native';

import { DEFAULT_EDGE_PADDING } from '../commonStyles.js';
import { brickRed, blackRed } from '../colors.js';
import { bindFns } from '../../util';
import { Actions } from 'react-native-router-flux';
import StripeButton from '../Components/StripeButton.js';
import Spacer from '../Spacer.js';
import FullWidthImage from '../../util/FullWidthImage.js';

var MountainImage = require('../images/mountains.png');


class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            renderImage: true
        };

        bindFns(this, ['onRotate']);
    }

    onRotate(event) {
        const { width, height } = Dimensions.get('window');

        const isPortrait = height > width;
        const renderImage = isPortrait && height > 480;

        this.setState({ renderImage });
    }



    render(){
        return (
            <Spacer paddingTop={18}>
              <View
                 style={{ flex: 1 }}
                 onLayout={this.onRotate}>

                {/* Text Heading Area */}
                <View style={styles.textContainer}>

                  <Text style={styles.heading2}>
                    Santa Fe County
                  </Text>

                  <Text style={styles.heading1}>
                    Trail Maps
                  </Text>

                </View>

                <View style={styles.lowerContent}>

                  {this.renderImage()}


                  <View style={styles.controller}>

                    <StripeButton onPress={Actions.groups} text={'ALL TRAILS'} />

                      <View style={styles.spacer} />

                      <StripeButton onPress={Actions.myList} text={'MY TRAILS'} />


                      <TouchableHighlight
                         onPress={Actions.info}
                         style={styles.infoBox}>

                         <Text style={styles.infoBoxText}>
                           INFO
                         </Text>

                       </TouchableHighlight>

                  </View>

                </View>

              </View>
            </Spacer>
        );
    }

    renderImage() {
        if (!this.state.renderImage) return null;

        const { width, height } = Dimensions.get('window');

        return (
            <FullWidthImage
               srcWidth={1125}
               srcHeight={744}
               source={MountainImage} />
        );

        return (
            <View style={styles.mountains}>
              <Image
                 style={{width, resizeMode: 'cover'}}
                 source={MountainImage}
                 />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    heading1: {
        color: brickRed,
        fontSize: 48,
        fontWeight: '700',
    },

    heading2: {
        color: brickRed,
        fontSize: 36,
        fontWeight: '700'
    },

    textContainer: {
        paddingLeft: DEFAULT_EDGE_PADDING,
    },

    spacer: {
        borderBottomWidth: 2,
        borderBottomColor: brickRed
    },

    lowerContent: {
        flex: 2,
        justifyContent: 'flex-end',
    },

    controller: {
        backgroundColor: brickRed,
    },

    infoBox: {
        backgroundColor: blackRed,
        padding: DEFAULT_EDGE_PADDING / 3,
        marginBottom:0,
    },

    infoBoxText: {
        fontSize: 16,
        color: '#FFFFFF77',
    },

});

export default Menu;
