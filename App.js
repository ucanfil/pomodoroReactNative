import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class App extends Component {
  render() {
    return <Pomodoro />
  }
}


class CounterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mins: 25,
      secs: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.isReset !== this.props.isReset ?
    this.props.onHandleReset(this.state.mins, this.state.secs) : null
  }

  handleSecs = async (text) => {
    const remaining = text % 60
    const secs = remaining
    const leftOver = Math.floor(text / 60)
    await this.setState(prevState => ({
      mins: parseInt(prevState.mins) + leftOver,
      secs: secs,
    }), () => this.props.onChangeSecs(this.state.secs))
  }

  render() {
    return (
      <View style={styles.flexRow}>
        <Text style={styles.bold}>{this.props.title}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>Mins:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ mins: text })
              this.props.isWorkTime ? this.props.onChangeMins(text) : null
            }}
            value={this.state.mins}
            keyboardType={'numeric'}
          >
          </TextInput>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>Secs:</Text>
          <TextInput
            style={styles.textInput}
            keyboardType={'numeric'}
            onChangeText={(text) => {
              this.props.isWorkTime ? this.handleSecs(text) : null
            }}
            value={this.state.secs}
          >
          </TextInput>
        </View>
      </View>
    )
  }
}

class Pomodoro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mins: 25,
      secs: 0,
      isPaused: false,
      workTime: false,
      isReset: false,
    }
  }

  componentDidMount() {
    this.decrement()
  }

  decrement = () => {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        secs: (prevState.secs + 59) % 60,
        mins: prevState.secs === 0 ? prevState.mins - 1 : prevState.mins,
        workTime: prevState.mins === 0 && prevState.secs === 0 ? !prevState.workTime : prevState.workTime
      }))
    }, 1000)
  }

  componentWillUnmount() {
    this.pauseDecrement()
  }

  togglePause = () => {
    this.setState((prevState) => ({
      isPaused: !prevState.isPaused
    }), () => {
    this.state.isPaused ? clearInterval(this.timer) : this.decrement()
    })
  }

  pauseDecrement = () => {
    clearInterval(this.timer)
  }

  resetTimer = () => {
    this.setState((prevState) => ({
      isReset: !prevState.isReset
    }))
  }

  handleReset = (mins, secs) => {
    this.setState({
      mins,
      secs
    })
  }

  changeSecs = (secs) => {
    this.setState({ secs })
  }

  changeMins = (mins) => {
    this.setState({ mins })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pomodoro}>
          <Text style={styles.heading}>pomodoro timer</Text>
          <Text style={styles.timer}>{this.state.mins}:{this.state.secs}</Text>
          <View style={styles.flexRow}>
            <Button
              title={this.state.isPaused ? 'Start' : 'Pause'}
              style={styles.button}
              onPress={this.togglePause}
            />
            <Button
              title='Reset'
              style={styles.button}
              onPress={this.resetTimer}
            />
          </View>
          <CounterForm
            title='Work Time'
            mins={this.state.mins}
            secs={this.state.secs}
            isWorkTime={this.state.workTime}
            onChangeMins={this.changeMins}
            onChangeSecs={this.changeSecs}
            onHandleReset={this.handleReset}
            isReset={this.state.isReset}
          />
          {/* <View style={styles.flexRow}>
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
          </View> */}
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
