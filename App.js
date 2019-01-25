import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class App extends Component {
  render() {
    return <Pomodoro />
  }
}

class Pomodoro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workMin: 25,
      workSec: 0,
      breakMin: 5,
      breakSec: 0,
      isPaused: false,
      workTime: true,
    }
  }

  componentDidMount() {
    this.decrement()
  }

  decrement = () => {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        workSec: (prevState.workSec + 59) % 60,
        workMin: prevState.workSec === 0 ? prevState.workMin - 1 : prevState.workMin
      }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  pauseStartTimer = () => {
    this.setState(state => ({
      isPaused: !state.isPaused,
    }))
    if (this.state.isPaused) {
      clearInterval(this.timer)
    }
  }

  resetTimer = () => {
    console.log(this.state.timer)
  }

  handleSecs = (text) => {
    const remaining = text % 60
    const secs = remaining === 0 ? 60 : remaining
    const leftOver = Math.floor(text / 60)
    this.setState(prevState => ({
      workMin: parseInt(prevState.workMin) + leftOver,
      workSec: secs,
    }))
  }

  handleMins = () => {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pomodoro}>
          <Text style={styles.heading}>pomodoro timer</Text>
          <Text style={styles.timer}>{this.state.workMin}:{this.state.workSec}</Text>
          <View style={styles.flexRow}>
            <Button title={this.state.isPaused ? 'Start' : 'Pause'} style={styles.button} onPress={this.pauseStartTimer} />
            <Button title='Reset' style={styles.button} onPress={this.resetTimer} />
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.bold}>Work Time</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>Mins:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => this.setState({ workMin: text })
                }
                value={this.state.workMin}
                keyboardType={'numeric'}
              >
              </TextInput>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>Secs:</Text>
              <TextInput
                style={styles.textInput}
                keyboardType={'numeric'}
                onChangeText={(text) => this.handleSecs(text)}
                value={this.state.workSec}
              >
              </TextInput>
            </View>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.bold}>Break Time</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>Mins:</Text>
              <TextInput
                style={styles.textInput}
                keyboardType={'numeric'}
              >
              </TextInput>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>Secs:</Text>
              <TextInput
                style={styles.textInput}
                keyboardType={'numeric'}
              >
              </TextInput>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2705c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pomodoro: {
    flex: 0,
    padding: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomRightRadius: 400,
    borderTopRightRadius: 400,
    borderBottomLeftRadius: 400,
    borderTopLeftRadius: 400,
    borderWidth: 3,
    borderColor: '#fff',
    width: 400,
    height: 400,
  },
  heading: {
    fontSize: 35,
    color: '#def25c',
    textTransform: 'uppercase',
    fontWeight: '700',
    width: 300,
    textAlign: 'center',
  },
  timer: {
    fontSize: 40,
    color: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    width: 200,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 30,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 50,
    textTransform: 'uppercase',
    color: '#fff'
  },
  textInput: {
    paddingLeft: 5,
    width: 50,
    height: 30,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 10,
    color: '#def25c',
    fontWeight: '700',
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
