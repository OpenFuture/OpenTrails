import React, {
    Component,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

import { highlight } from '../colors.js';

class StripeButton extends Component {
    render(){
        return (
            <TouchableHighlight
               underlayColor={highlight}
               onPress={this.props.onPress}
               style={styles.stripeButton}>

              <Text style={styles.buttonText}>
                {this.props.text}
              </Text>

            </TouchableHighlight>
        );
    }
}




const styles = StyleSheet.create({
    stripeButton: {
        backgroundColor: "#FFFFFF44",
        alignItems:'center',
        padding: 15,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 35,
        fontWeight: '200',
    },
});

export default StripeButton;
