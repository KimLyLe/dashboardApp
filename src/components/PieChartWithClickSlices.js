import React from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';
import { PieChart } from 'react-native-svg-charts'


 class PieChartWithClickSlices extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
      selectedSlice: {
        label: '',
        value: 0
      },
      labelWidth: 0
    }
  }

  componentDidMount = () => {
    fetch('http://10.30.0.120:8085/get/linecount/smiley', { method: 'GET' })
       .then(response => response.json() )
       .then((responseJson) => {
           this.setState({
            data: responseJson
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }

  render() {
    const { data } = this.state;
    const smileyRangeCount = data.map((key, value) => value)

    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = ['Smiley', 'Smiley', 'Smiley', 'Smiley', 'Smiley', 'Smiley', 'Smiley', 'Smiley', 'Smiley','Smiley'];
    const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff', '#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff']
    const smileyData = keys.map((key, index) => {
        return {
          key,
          value: smileyRangeCount[index],
          svg: { fill: colors[index] },
          arc: { outerRadius: (90 + smileyRangeCount[index]) + '%', padAngle: label === key ? 0.05 : 0 },
          onPress: () => this.setState({ selectedSlice: { label: key, value: smileyRangeCount[index] } })
        }
      })
    const deviceWidth = Dimensions.get('window').width

    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
          const { labelCentroid, pieCentroid, data } = slice;
          return (
              <Text
                  key={index}
                  x={pieCentroid[ 0 ]}
                  y={pieCentroid[ 1 ]}
                  fill={'black'}
                  textAnchor={'middle'}
                  alignmentBaseline={'middle'}
                  fontSize={8}
                  stroke={'black'}
                  strokeWidth={0.2}
              >
                  {data.SmileyRange}
              </Text>
          )
      })
  }

    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <PieChart
          style={{ height: 300 }}
          outerRadius={'80%'}
          innerRadius={'45%'}
          data={smileyData}>
            <Labels/>
          </PieChart>
        <Text
          onLayout={({ nativeEvent: { layout: { width } } }) => {
            this.setState({ labelWidth: width });
          }}
          style={{
            position: 'absolute',
            left: deviceWidth / 2 - labelWidth / 2,
            textAlign: 'center'
          }}>
          {`${label} \n ${value}`}
        </Text>
      </View>
    )
  }
}

export default PieChartWithClickSlices;