import React, {
    Text,
    StyleSheet,
    View,
    Image,
} from 'react-native';

import { brickRed } from '../colors.js';
import Spacer from '../Spacer.js';
import TrailList from '../../ui/scenes/TrailList.js';

import * as Bookmarks from '../../api/bookMarks.js';

class MyTrailList extends TrailList {

    constructor(props) {
        super(props);
    }

    fetchData() {
        Bookmarks.getAllSavedTrails()
            .then(trails => {
                const rowData = this.state.trails.cloneWithRows(trails);
                this.setState({
                    trails: rowData,
                    isLoading: false,
                    count: trails.length,
                });
            })
            .catch(error => {
                this.setState({ error, isLoading: false });
            });

    }

    loadSingleView() {
        return false;
    }

    render() {
        if (this.shouldShowInstructions()) {
            return this.renderInstructions();
        } else {
            return super.render();
        }
    }

    shouldShowInstructions() {
        return this.state.count === 0;
    }

    renderInstructions() {
        return (
            <Spacer>
              <View style={styles.instructionContainer}>

                <Text style={[styles.instructionText]}>
                  You have not saved any trails yet
                </Text>

                <Image
                   style={styles.starIcon}
                   source={require('../images/star-outline.png')}/>

                <Text style={[styles.instructionText]}>
                  Any trails you save will be displayed here
                </Text>
              </View>
            </Spacer>
        );
    }

    enableRefreshControl() {
        return true;
    }

}


export default MyTrailList;


const styles = StyleSheet.create({
    instructionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    instructionText: {
        opacity: 0.8,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        margin: 16,
    },

    starIcon: {
        // marginBottom: 20,
    },

});
