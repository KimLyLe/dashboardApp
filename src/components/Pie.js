import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { View, Text } from 'react-native';
import ajax from '../../ajax';


class Pie extends React.PureComponent {

    state = {
        data: []
    }
    
    componentDidMount = () => {
        fetch('http://100.71.8.76:8085/get', { method: 'GET' })
           .then(response => response.json() )
           .then((responseJson) => {
               console.log(responseJson);
               this.setState({
                data: responseJson
               })
            })
            .catch((error) => {
               console.error(error);
            });
         }

render() {
    // Count the amount of smileys and display it
    const { data } = this.state
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    const smiley = data.length !== 0 ? (data.map((key, value) => (key.smiley)) ) : ( [20, 43, 45] );

    const pieData = smiley
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: randomColor(),
            onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
    }))

    return(
        <View>
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
                svg={{ fill: randomColor }}>
            </PieChart>
        </View>
    )
}

}

export default Pie;