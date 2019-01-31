import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { vibrate } from './utils'

export default class App extends Component {
  render() {
    return <Pomodoro />
  }
}

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

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mins: 25,
      secs: 0,
      isReset: false,
      isPaused: false
    }
  }

  componentWillMount() {
    this.setState({
      mins: this.props.mins,
      secs: this.props.secs
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.mins == 0 && this.state.secs == 0) {
      console.log('it triggered')
      this.props.onHandleWorkTime()
      return false
    }
    return true
  }

  componentDidMount() {
    this.decrement()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mins: nextProps.mins,
      secs: nextProps.secs
    })
  }

  decrement = () => {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        secs: (prevState.secs + 59) % 60,
        mins: prevState.secs === 0 ? prevState.mins - 1 : prevState.mins
      }))
    }, 1000)
  }

  componentWillUnmount() {
    this.pauseDecrement()
  }

  togglePause = () => {
    this.setState(
      prevState => ({
        isPaused: !prevState.isPaused
      }),
      () => {
        this.state.isPaused ? this.pauseDecrement() : this.decrement()
      }
    )
  }

  pauseDecrement = () => {
    clearInterval(this.timer)
  }

  resetTimer = () => {
    this.setState(prevState => ({
      isReset: !prevState.isReset
    }))
  }

  handleReset = (mins, secs) => {
    this.setState({
      mins,
      secs
    })
  }

  render() {
    return (
      <View>
        <View style={styles.flexRow}>
          <Text style={styles.timer}>
            {this.state.mins.toString().length === 1
              ? `0${this.state.mins}`
              : this.state.mins}
            :
            {this.state.secs.toString().length === 1
              ? `0${this.state.secs}`
              : this.state.secs}
          </Text>
        </View>
        <View style={styles.flexRow}>
        <Button
          title={this.state.isPaused ? 'START' : 'PAUSE'}
          onPress={this.togglePause}
          color="#fff"
          accessibilityLabel="Start/Pause button"
        />
        <Button
          title="RESET"
          onPress={this.props.onHandleReset}
          color="#fff"
          accessibilityLabel="Reset button"
        />
        </View>
      </View>
    )
  }
}

class Pomodoro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workMins: 25,
      workSecs: 0,
      breakMins: 5,
      breakSecs: 0,
      isPaused: false,
      isReset: false,
      isWorkTime: true
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.isWorkTime &&
      (this.state.breakMins !== nextState.breakMins ||
        this.state.breakSecs !== nextState.breakSecs)
    ) {
      return false
    } else if (
      !this.state.isWorkTime &&
      (this.state.workMins !== nextState.workMins ||
        this.state.workSecs !== nextState.workSecs)
    ) {
      return false
    }
    if (nextState.isWorkTime !== this.state.isWorkTime) {
      return true
    }
    return true
  }

  changeWorkSecs = secs => {
    this.setState({ workSecs: secs })
  }

  changeWorkMins = mins => {
    this.setState({ workMins: mins })
  }

  changeBreakSecs = secs => {
    this.setState({ breakSecs: secs })
  }

  changeBreakMins = mins => {
    this.setState({ breakMins: mins })
  }

  handleReset = () => {
    this.setState(prevState => ({
      isReset: !prevState.isReset
    }))
  }

  handleWorkTime = () => {
    vibrate()
    this.setState(prevState => ({ isWorkTime: !prevState.isWorkTime }))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pomodoro}>
          <View style={styles.flexRow}>
            <Text style={[styles.flexRow, styles.heading]}>
              {this.state.isWorkTime ? 'work time' : 'break time'}
            </Text>
          </View>
          {this.state.isWorkTime ? (
            <Counter
              mins={this.state.workMins}
              secs={this.state.workSecs}
              onHandleReset={this.handleReset}
              isReset={this.state.isReset}
              onHandleWorkTime={this.handleWorkTime}
            />
          ) : (
              <Counter
                mins={this.state.breakMins}
                secs={this.state.breakSecs}
                onHandleReset={this.handleReset}
                isReset={this.state.isReset}
                onHandleWorkTime={this.handleWorkTime}
              />
            )}
          <CounterForm
            title="Work Time"
            isWorkTime={this.state.isWorkTime}
            onChangeWorkMins={this.changeWorkMins}
            onChangeWorkSecs={this.changeWorkSecs}
            onChangeBreakMins={this.changeBreakMins}
            onChangeBreakSecs={this.changeBreakSecs}
          />
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
    justifyContent: 'center'
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
    height: 400
  },
  heading: {
    fontSize: 35,
    color: '#def25c',
    textTransform: 'uppercase',
    fontWeight: '700',
    width: 300,
    textAlign: 'center'
  },
  timer: {
    fontSize: 60,
    color: '#fff',
  },
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
