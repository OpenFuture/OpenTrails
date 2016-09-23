import React, {
    Component,
    View,
    Text,
    ListView,
} from 'react-native';

import Spacer from '../Spacer.js';
import MapAPI from '../../api/MapAPI.js';
import GroupItem from '../Containers/GroupItem.js';
import Loader from '../Components/Loader.js';
import TrailDetailView from './TrailDetail.js';


class TrailGroups extends Component {

    constructor(props) {
        super(props);

        const groups = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            groups,
            loading: false,
            error: null,
        };
    }

    render(){
        return (
            <Spacer>
              <Loader
                 isLoading={this.state.loading}
                 error={this.state.error}
                 >
                <ListView
                   dataSource={this.state.groups}
                   renderRow={this.renderGroupItem}
                   />
              </Loader>
            </Spacer>
        );
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        this.setState({ loading: true });
        MapAPI.fetchGroups()
            .then(groups => {
                groups = this.state.groups.cloneWithRows(groups);
                this.setState({ groups, loading: false, error: null });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }


    renderGroupItem(name) {
        return <GroupItem name={name} />;
    }

    renderGroups() {
        let comps = this.state.groups.map( gn => <Text key={gn}>{toTitleCase(gn)}</Text>);
        return comps;
    }
}

export default TrailGroups;
