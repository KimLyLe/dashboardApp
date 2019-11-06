import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import TAappSmileys from '../src/components/TAappsSmileys';
import TAWords from '../src/components/TAWords';
import { ScrollView } from 'react-native-gesture-handler';
import TACatDistr from '../src/components/TACatDistr';

export default class TextAnalytics_Activity extends Component {
  static navigationOptions = {
    title: 'Text analytics',
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View>
            <Text style={styles.text}>Average smiley per app</Text>
            <TAappSmileys/>
          </View>
          <View>
            <Text style={styles.text}>Category distribution</Text>
            <TACatDistr/>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    padding: 10,
    fontWeight: "bold",
  }
});