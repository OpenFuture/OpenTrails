import React, {
    Component,
    ListView,
    RefreshControl,
} from 'react-native';

import MapAPI from '../../api/MapAPI';
import Spacer from '../Spacer';
import TrailItem from '../Containers/TrailItem.js';
import Loader from '../Components/Loader.js';
import TrailDetailView from './TrailDetail.js';


export default class TrailList extends Component {

    constructor(props) {
        super(props);

        const trails = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            trails,
            isLoading: false,
            error: null,
            loadSingleView: false,
        };
    }


    componentWillMount() {
        this.fetchData();
    }


    render() {
        return (
            <Spacer>
              <Loader
                 isLoading={this.state.isLoading}
                 error={this.state.error}>

                {this.renderTrails()}

              </Loader>
            </Spacer>
        );
    }


    renderTrail(trailData) {
        return <TrailItem  {...trailData}/>;
    }

    loadSingleView() {
        return this.state.loadSingleView;
    }

    renderTrails() {
        if (this.loadSingleView()) {
            return (
                <TrailDetailView
                   trailData={this.state.loadSingleView} />
            );
        } else {
            return (
                <ListView
                   refreshControl={this._getRefreshControl()}
                   dataSource={this.state.trails}
                   renderRow={this.renderTrail}
                   />
            );
        }
    }

    _getRefreshControl() {
        if (this.enableRefreshControl()) {
            return (
                <RefreshControl
                   refreshing={false}
                   onRefresh={this.fetchData.bind(this)}
                   />
            );
        } else {
            return null;
        }
    }


    enableRefreshControl() {
        return false;
    }

    fetchData() {
        const { name } = this.props;

        this.setState({ isLoading: true });
        MapAPI.getTrailsByName(name)
            .then(trails => {
                const rowData = this.state.trails.cloneWithRows(trails);
                this.setState({
                    trails: rowData,
                    isLoading: false,
                    loadSingleView: trails.length === 1 ? trails[0] : false
                });
            })
            .catch(error => {
                this.setState({ error, isLoading: false });
            });
    }


}
