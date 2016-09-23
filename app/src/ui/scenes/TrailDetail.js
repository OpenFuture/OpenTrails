import React, {
    Component,
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

var Button = require('react-native-button');

import { brickRed } from '../colors.js';
import { Actions } from 'react-native-router-flux';
import { headerTextStyle } from '../commonStyles.js';
import { DEFAULT_EDGE_PADDING } from '../commonStyles.js';
import { numberFormatter } from '../../util';
import BookmarkButton from '../Containers/BookMarkButton.js';
import  * as bookmarks  from '../../api/bookMarks.js';

const lookups = [
    {
        text:  "Description",
        attr: 'description',
    },
    {
        text: "Length (miles)",
        attr: 'length',
        formatter: numberFormatter
    },
    {
        text: 'Skill Level',
        attr: 'skillLevel'
    },
    {
        text: 'Condition',
        attr: 'condition',
    },
    {
        text: 'Activities',
        attr: 'activities',
    },
    {
        text: "Surface Type",
        attr: 'type'
    }
];


console.log("bookmarks", bookmarks);

export default class TrailDetailView extends Component {

    constructor(props) {
        super(props);

        const { trailData } = this.props;


        // this is a hack! need to implement flux arch
        // as to not transfer props to state
        this.state = {
            isBookmarked: trailData.isBookmarked
        };
    }


    checkBookMark() {
        const { trailId } = this.props.trailData;

        bookmarks.getTrailData(trailId)
            .then(res => {
                this.setState({
                    isBookmarked: !! res
                });
            });
    }


    componentWillMount() {
        this.checkBookMark();
    }

    toggleBoookMarked() {
        const willBeMarked = ! this.state.isBookmarked;

        this.setState({
            isBookmarked: willBeMarked,
        });


        const save = willBeMarked;
        const { trailData } = this.props;
        const { trailId } = trailData;

        trailData.isBookmarked = save;

        if (save) {
            bookmarks.saveTrailData(trailData)
                .catch(err => console.warn(err));
        } else {
            bookmarks.removeTrailData(trailId)
        }

    }

    renderDetails() {
        const { trailData } = this.props;

        return lookups.map( c => {

            const attr = c.formatter
                      ? c.formatter(trailData[c.attr])
                      : trailData[c.attr];

            return (
                <View key={c.attr}>
                  <Text style={styles.h2}>
                    {c.text}
                  </Text>
                  <Text style={styles.body}>
                    {attr}
                  </Text>
                </View>
            );
        });
    }

    render() {

        const {
            trailName,
            trailId,
            description,
            activities
        } = this.props.trailData;


        return (
            <View style={styles.wrapper}>
              <ScrollView style={styles.scrollContainer}>

                <Text style={[headerTextStyle, styles.title]}>
                  {trailName}
                </Text>

                {this.renderDetails()}

              </ScrollView>

              <View style={styles.controls}>

                <Button
                   style={{fontSize: 16, color: brickRed, fontWeight: '100'}}
                   onPress={() => Actions.map({ trailId })}>
                  MAP
                </Button>

                <BookmarkButton
                   selected={this.state.isBookmarked}
                   onPress={this.toggleBoookMarked.bind(this)}
                   />

              </View>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    scrollContainer: {
        padding: DEFAULT_EDGE_PADDING,
    },

    title: {
        fontSize: 40,
        fontWeight: '800',
        marginBottom: 16,
    },

    h2: {
        fontSize: 30,
        fontWeight: '300',
        color: brickRed,
        marginBottom: 3,
    },

    body: {
        fontSize: 16,
        marginBottom: 23
    },

    controls: {
        flexDirection: 'row',

        justifyContent: 'space-around',

        alignItems: 'center',
        backgroundColor: '#E4B47B44',
        height: 44,

        borderTopColor: '#777',
        borderTopWidth: StyleSheet.hairlineWidth,
    }
});
