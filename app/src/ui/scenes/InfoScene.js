import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableHighlight,
    Linking,
} from 'react-native';

import { MIND_SHARE_URL } from '../../../conf/strings.js';
import { DEFAULT_EDGE_PADDING } from '../commonStyles.js';
import Spacer from '../Spacer.js';

export default class InfoScene extends Component {

    render() {
        return (
            <Spacer>
              <View style={styles.wraper}>

                <Image
                   style={styles.backgroundImage}
                   source={require('../images/info_background.png')} />

                <View style={styles.contentContainer}>

                  <ScrollView style={styles.scrollView}>

                    <InfoText>
                      This app is designed to highlight the hiking, mountain biking, horseback riding trails in Santa Fe County.
                    </InfoText>

                    <InfoText>
                      For additional information, please contact Santa Fe County GIS: (505) 995-2753 or Economic Development: (505) 995-2728
                    </InfoText>

                    <InfoText>
                      DISCLAIMER:
                    </InfoText>

                    <InfoText style={styles.disclaimer}>
                      Individuals who use these trails assume responsibility for
                      their own actions and safety. Always be prepared for all
                      wilderness conditions, including weather. Trail conditions
                      change from day to day and from season to season.
                      Therefore, any information on this application is subject to
                      change without warning, and Santa Fe County has no
                      obligation to update the information.

                      The description for each trail has been done by experienced
                      hikers and outdoor enthusiasts. If you are not an experienced
                      hiker/outdoor enthusiast, the trails may seem more difficult
                      than described. Hiking and outdoor activities can be dangerous,
                      and it is up to each individual to know their limits, abilities,
                      and level of expertise before attempting any outdoor activity.

                      Santa Fe County is not responsible for any accidents,
                      injuries, inconvenience, or loss or damage to property or
                      life by any person attempting to hike or do other
                      activities on the trails described on this application. The
                      County disclaims any and all liability for accidents,
                      loss, injury, or damage that may be sustained by anyone
                      using these trails. Santa Fe County disclaims any and
                      all warranties concerning the accuracy of the information
                      contained on this application or concerning the suitability of
                      the trails for any purpose. If you use the information
                      contained on this application, you do so at your own risk.
                    </InfoText>

                  </ScrollView>


                  <TouchableHighlight
                     onPress={this.navToMindshare}>
                    <View style={styles.mindsharecredit}>

                      <Image
                         style={styles.mslogo}
                         source={require('../images/mslogo.png')} />

                      <InfoText style={styles.creditText}>
                        Built By Mindshare labs
                      </InfoText>

                    </View>
                  </TouchableHighlight>

                </View>

              </View>
            </Spacer>
        );
    }



    navToMindshare() {
        Linking.openURL(MIND_SHARE_URL);
    }

}


const InfoText = (props) => {
    return (
        <Text style={[styles.infoText, props.style]}>
          {props.children}
        </Text>
    );
};




const styles = StyleSheet.create({
    scrollView: {
        padding: DEFAULT_EDGE_PADDING,
    },

    wraper: {
        justifyContent: 'space-between',
        flex:1,
    },

    contentContainer: {
        flex:1
    },

    backgroundImage: {
        flex:1,
        position: 'absolute'
    },

    infoText: {
        color: 'white',
        backgroundColor: '#0000',
        fontSize: 16,
        marginBottom: DEFAULT_EDGE_PADDING,
    },

    disclaimer: {
        fontSize: 12.3,
    },

    mindsharecredit: {
        padding: DEFAULT_EDGE_PADDING,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333333',
    },

    creditText: {
        alignSelf: 'flex-end',
        marginBottom: 0,
    },
});
