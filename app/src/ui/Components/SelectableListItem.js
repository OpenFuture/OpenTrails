import React, {
    Component,
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
} from 'react-native';

import { brickRed, highlight } from '../colors.js';
import { DEFAULT_EDGE_PADDING } from '../commonStyles.js';

const selectArrow = require('../images/forwardArrow.png');


class SelectableListItem extends Component {

    renderArrow(){
        return (
            <View style={styles.arrowContainer}>
              <Image source={selectArrow} />
            </View>
        );
    }

    render(){
        return (
            <TouchableHighlight
               onPress={this.props.onPress}
               underlayColor={highlight + "7f"}
               activeOpacity={0.5}>

              <View style={styles.container}>

                <View style={styles.childrenContainer}>
                  {this.props.children}
                </View>

                {this.renderArrow()}

              </View>
            </TouchableHighlight>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderBottomColor: brickRed+"55",
        borderBottomWidth: StyleSheet.hairlineWidth,

        padding: DEFAULT_EDGE_PADDING,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    childrenContainer: {
        flex: 1
    },

    arrowContainer: {
        justifyContent: 'center'
    }
});


export default SelectableListItem;
