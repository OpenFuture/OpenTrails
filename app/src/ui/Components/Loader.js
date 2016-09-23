import React, {
    Component,
    View,
    Text,
    StyleSheet,
} from 'react-native';


import LoadingSpinner from './LoadingSpinner.js';
import ErrorScreen from './ErrorScreen.js';

class Loader extends Component {
    render(){
        if (this.props.error) {
            return <ErrorScreen error={this.props.error} />;
        }

        return (this.props.isLoading)
            ? this.renderLoader()
            : this.props.children;
    }

    renderLoader() {
        return (
            <View style={styles.container}>
              <LoadingSpinner />
            </View>
        );
    }
}



Loader.propTypes = {
    isLoading: React.PropTypes.bool.isRequired
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Loader;
