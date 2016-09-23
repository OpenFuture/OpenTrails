import React, {
    Component,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import SelectableListItem from '../Components/SelectableListItem.js';
import { Actions } from 'react-native-router-flux';
import { brickRed } from '../colors.js';
import { GROUP_NAME_LOOKUP } from '../../../conf/strings.js';
import { toTitleCase } from '../../util';
import { headerTextStyle } from '../commonStyles.js';


/**
 * Responsible for rendering the Group Trail Item.
 */
class GroupItem extends Component {
    render() {
        const { name } = this.props;
        return (
            <SelectableListItem
               onPress={() => Actions.detailList({ name })}>

              <Text style={styles.groupName}>
                {mapToDisplayName(name)}
              </Text>

            </SelectableListItem>
        );
    }
}



/**
 * Implements a Dictionary Patch -> sketchy Data
 */
function mapToDisplayName(name){
    if (GROUP_NAME_LOOKUP[name]){
        return GROUP_NAME_LOOKUP[name];
    } else {
        return toTitleCase(name);
    }
}


const styles = StyleSheet.create({
    groupName: {
        marginTop: 4,
        fontSize: 28,
        color: brickRed,
        fontWeight: '300',
        marginRight: 30,
    }
});

export default GroupItem;
