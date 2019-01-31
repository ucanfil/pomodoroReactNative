import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    height: 80,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    paddingLeft: 5,
    width: 50,
    height: 30,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 10,
    color: '#def25c',
    fontWeight: '700'
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  time: {
    marginBottom: 5,
    color: '#def25c'
  },
  bold: {
    fontWeight: '700',
    color: '#def25c'
  }
})
class CounterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workMins: 25,
      workSecs: 0,
      breakMins: 5,
      breakSecs: 0
    }
  }

  handleWorkSecs = text => {
    const secs = text % 60
    const leftOver = Math.floor(text / 60)
    this.setState(prevState => ({
      workMins: parseInt(prevState.workMins) + leftOver,
      workSecs: secs
    }))
  }

  handleBreakSecs = text => {
    const secs = text % 60
    const leftOver = Math.floor(text / 60)
    this.setState(prevState => ({
      breakMins: parseInt(prevState.breakMins) + leftOver,
      breakSecs: secs
    }))
  }

  render() {
    return (
      <View>
        <View style={styles.flexRow}>
          <Text style={styles.bold}>Work Time</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>Mins:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                this.setState({ workMins: text })
              }}
              onSubmitEditing={() =>
                this.props.onChangeWorkMins(this.state.workMins)
              }
              value={this.state.workMins.toString()}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>Secs:</Text>
            <TextInput
              style={styles.textInput}
              keyboardType={'numeric'}
              onChangeText={text => {
                this.handleWorkSecs(text)
              }}
              onSubmitEditing={() =>
                this.props.onChangeWorkSecs(this.state.workSecs)
              }
              value={this.state.workSecs.toString()}
            />
          </View>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.bold}>Break Time</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>Mins:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                this.setState({ breakMins: text })
              }}
              onSubmitEditing={() =>
                this.props.onChangeBreakMins(this.state.breakMins)
              }
              value={this.state.breakMins.toString()}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>Secs:</Text>
            <TextInput
              style={styles.textInput}
              keyboardType={'numeric'}
              onChangeText={text => this.handleBreakSecs(text)}
              onSubmitEditing={() =>
                this.props.onChangeBreakSecs(this.state.breakSecs)
              }
              value={this.state.breakSecs.toString()}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default CounterForm