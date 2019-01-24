import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Pomodoro />
      </View>
    );
  }
}

let timer

class Pomodoro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workMin: 25,
      workSec: 59,
      breakMin: 5,
      breakSec: 0,
      isPaused: true,
      workTime: true,
    }
  }

  componentDidMount() {
    timer = setInterval(() => {
      this.setState(state => ({
        workSec: state.workSec - 1
      }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  pauseStartTimer = () => {
    this.setState(state => ({
      isPaused: !state.isPaused,
    }))
    if (this.state.isPaused) {
      clearInterval(timer)
    }
  }

  resetTimer = () => {
    console.log(this.state.timer)
  }


  render() {
    return (
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
    padding: 25,
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
    width: 50,
    height: 30,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 10
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  time: {
    marginBottom: 5,
  },
  bold: {
    fontWeight: '700'
  }
});
