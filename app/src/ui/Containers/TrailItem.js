import React, {
    Component,
    View,
    Text,
    StyleSheet,
} from 'react-native';


import { Actions } from 'react-native-router-flux';
import SelectableListItem from '../Components/SelectableListItem.js';
import Attribute from '../Components/Attribute.js';
import { headerTextStyle } from '../commonStyles.js';
import { numberFormatter as nf } from '../../util';


class TrailItem extends Component {
    render() {
        const {
            trailName,
            activities,
            length,
            skillLevel,
            condition
        } = this.props;


        return (
            <SelectableListItem onPress={() => Actions.detail({ trailData: this.props })}>

              <View style={styles.container}>

                <Text style={[headerTextStyle, styles.trailName]}>
                  {trailName}
                </Text>

                <Text style={styles.activities}>
                  {activities}
                </Text>

              </View>

            </SelectableListItem>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },

    trailName: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 6
    },

    activities: {
        marginRight: 30,
        fontWeight: '100',
        fontSize: 18,
    },

});



export default TrailItem;
