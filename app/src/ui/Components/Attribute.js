import React, {
    Component,
    View,
    Text,
    StyleSheet,
} from 'react-native';


const Attribute = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            <Text style={styles.key}>
              {props.attName}
            </Text>

            <Text style={styles.key}> : </Text>

            <Text style={styles.value}>
              {props.value}
            </Text>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },

    draw: {
        borderWidth: 2,
        borderColor: 'red'
    },

    key: {
        fontSize: 14,
        fontWeight: '100'
    },

    value: {
        fontSize: 14,
        fontWeight: '900'
    }
});


export default Attribute;
