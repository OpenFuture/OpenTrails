import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    LayoutAnimation,
} from 'react-native';


let emptyStar = require('../images/star-outline.png');
let fullStar = require('../images/star.png');


const HIDDEN = 200;
const SHOW = 0;

// add the empty and full star as detault props. to make the component more modular
// really try to make it just a component. not a container

class BookmarkButton extends Component {

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    render(){

        const selectedTop = this.props.selected ? HIDDEN : SHOW;
        const unselectedTop = this.props.selected ? SHOW : HIDDEN;

        return (
            <TouchableHighlight
               activeOpacity={0.7}
               underlayColor={'#00000000'}
               onPress={this.props.onPress}>

              <View style={styles.container}>

                <Image
                   style={[styles.logo, {top: selectedTop}]}
                   source={emptyStar}
                   />

                <Image
                   style={[styles.logo, {top: unselectedTop}]}
                   source={fullStar}
                   />

              </View>

            </TouchableHighlight>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 35,
        height: 33,
    },

    logo: {
        position: 'absolute',

    }
});


export default BookmarkButton;
