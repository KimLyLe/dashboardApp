import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import ajax from '../../ajax';

class FeedbackDetail extends React.Component {
  static propTypes = {
    feedback: PropTypes.object,
  };
  state = {
    feedback: this.props.initialFeedbackData,
  };

  async componentDidMount() {
    const fullFeedback = await ajax.getFeedbackDetail(this.state.feedback.id);
    this.setState({
      FeedbackDetail: fullFeedback,
    });
  }

  render() {
    const {feedback} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 5}}>
            <Text style={styles.header1}>Feedback form details</Text>
            <Text style={styles.ptb20}>CURRENT TAGS</Text>
          </View>
          <View style={styles.panel}>
            <Text style={{paddingVertical: 15, fontWeight: 'bold'}}>Date </Text>
            <Text style={styles.ptb20}>{feedback.time}</Text>
            <View
              style={{
                borderBottomColor: '#e9e9e9',
                borderBottomWidth: 1,
              }}
            />
            <Text style={styles.pt20}>
              <Text style={styles.fontBold}>Category: </Text>{' '}
              {feedback.category}
            </Text>
          </View>
          <View style={styles.panel}>
            <Text style={{paddingVertical: 25}}>
              <Text style={styles.fontBold}>Smiley: </Text> {feedback.smiley}
            </Text>
            <View
              style={{
                borderBottomColor: '#e9e9e9',
                borderBottomWidth: 1,
              }}
            />
            <Text style={{paddingVertical: 15, fontWeight: 'bold'}}>
              Feedback{' '}
            </Text>
            <Text style={styles.lineHeights}>{feedback.feedback}</Text>
          </View>
          <View style={styles.panel}>
            <Text style={{paddingVertical: 25}}>
              <Text style={styles.fontBold}>Feedback metadata</Text>
            </Text>
            <View
              style={{
                borderBottomColor: '#e9e9e9',
                borderBottomWidth: 1,
              }}
            />
            <Text style={{paddingVertical: 15}}>
              <Text style={{fontWeight: 'bold'}}>OS: </Text>
              <Text>{feedback.os}</Text>
            </Text>
            <Text style={{paddingVertical: 15}}>
              <Text style={{fontWeight: 'bold'}}>Device: </Text>
              <Text>{feedback.device}</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  panel: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    margin: 5,
  },
  header1: {
    fontSize: 30,
    fontWeight: '100',
    marginVertical: 20,
  },
  ptb20: {
    paddingBottom: 20,
  },
  pt20: {
    paddingTop: 20,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  lineHeights: {
    paddingVertical: 10,
    lineHeight: 23,
  },
});

export default FeedbackDetail;