import React, {
    Image,
    Text,
    Dimensions,
} from 'react-native';



module.exports = React.createClass({

    render() {
        let { srcWidth, srcHeight, source } = this.props;
        const scale = makeScaler(srcWidth, srcHeight);
        width = scale.getWidth();
        height = scale.getHeight();

        return (
            <Image
               style={{ width, height}}
               resizeMode='contain'
               source={source}
               />
        );
    }
});


function makeScaler(imgWidth, imgHeight) {
    const { width, height } = Dimensions.get('window');

    const offset = imgWidth / width;
    const scaledHeight = Math.round(imgHeight / offset);

    return {
        getWidth() {
            return width;
        },

        getHeight() {
            return scaledHeight;
        }
    };
};
