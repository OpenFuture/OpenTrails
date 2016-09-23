import React, {
    Navigator,
    Component
} from 'react-native';

const backIcon = require('./ui/images/backArrow.png');


import { Actions, Scene, Router } from 'react-native-router-flux';
import TrailList from './ui/scenes/TrailList';
import TrailDetailView from './ui/scenes/TrailDetail';
import MapView from './ui/scenes/MapScene.js';
import TrailGroups from './ui/scenes/TrailGroups.js';
import Spacer from './ui/Spacer.js';
import { navigationBarStyle } from './ui/commonStyles.js';
import Menu from './ui/scenes/Menu.js';
import MyTrailList from './ui/scenes/MyTrailList.js';
import InfoScene from './ui/scenes/InfoScene.js';

const SpacedTrailDetailView = (props) => {
    return (
        <Spacer>
          <TrailDetailView {...props} />
        </Spacer>
    );
};

const sceneConfig = {
    navigationBarStyle,
    backButtonImage: backIcon,
    titleStyle: { color: 'white', fontWeight: '700' },
    backButtonTextStyle: { color: '#E4B47B', fontWeight: '100' },
};

const infoBarStyle = navigationBarStyle;
infoBarStyle.borderBottomWidth = 0;

export default class Root extends Component {
    render() {
        return (
            <Router>
              <Scene key='root'>

                <Scene
                   key='menu'
                   component={Menu}
                   hideNavBar={true}
                   />

                <Scene
                   key='groups'
                   component={TrailGroups}
                   title={'All Trails'}
                   {...sceneConfig}
                   />

                <Scene
                   key='myList'
                   component={MyTrailList}
                   title={'My Trails'}
                   {...sceneConfig}
                   />

                <Scene
                   key='detailList'
                   component={TrailList}
                   {...sceneConfig}
                   />

                <Scene
                   key='detail'
                   component={SpacedTrailDetailView}
                   {...sceneConfig}
                   />

                <Scene
                   key='map'
                   panHandlers={null}
                   component={MapView}
                   {...sceneConfig}
                   />

                <Scene
                   key='info'
                   component={InfoScene}
                   {...sceneConfig}
                   navigationBarStyle={infoBarStyle}
                   />

              </Scene>
            </Router>
        );
    }
}
