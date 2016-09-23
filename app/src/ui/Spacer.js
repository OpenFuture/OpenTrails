import React, {
    Component,
    View,
    Text,
    StyleSheet
} from 'react-native';

import { backgroundTint } from './colors.js';

export default class Spacer extends Component {
    render() {

        const moreStyles = {};

        if (this.props.paddingTop) {
            moreStyles.paddingTop = this.props.paddingTop;
        }

        return (
            <View style={[styles.container, moreStyles]}>
              {this.props.children}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 64,
        flex: 1,
        backgroundColor: backgroundTint,
    }
});
