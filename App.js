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
      workMins: 25,
      workSecs: 0,
      breakMins: 5,
      breakSecs: 0,
    }
  }

  handleWorkSecs = (text) => {
    const secs = text % 60
    const leftOver = Math.floor(text / 60)
    this.setState(prevState => ({
      workMins: parseInt(prevState.workMins) + leftOver,
      workSecs: secs,
    }))
  }

  handleBreakSecs = (text) => {
    const secs = text % 60
    const leftOver = Math.floor(text / 60)
    this.setState(prevState => ({
      breakMins: parseInt(prevState.breakMins) + leftOver,
      breakSecs: secs,
    }))
  }

  render() {
    return (
      <View style={styles.flexRow}>
        <Text style={styles.bold}>Work Time</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>Mins:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ workMins: text })
            }}
            onSubmitEditing={() => this.props.onChangeWorkMins(this.state.workMins)}
            value={this.state.workMins.toString()}
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
              this.handleWorkSecs(text)
            }}
            onSubmitEditing={() => this.props.onChangeWorkSecs(this.state.workSecs)}
            value={this.state.workSecs.toString()}
          >
          </TextInput>
        </View>
        <Text style={styles.bold}>Break Time</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>Mins:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ breakMins: text })
            }}
            onSubmitEditing={() => this.props.onChangeBreakMins(this.state.breakMins)}
            value={this.state.breakMins.toString()}
            keyboardType={'numeric'}
          >
          </TextInput>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>Secs:</Text>
          <TextInput
            style={styles.textInput}
            keyboardType={'numeric'}
            onChangeText={(text) => this.handleBreakSecs(text)}
            onSubmitEditing={() => this.props.onChangeBreakSecs(this.state.breakSecs)}
            value={this.state.breakSecs.toString()}
          >
          </TextInput>
        </View>
      </View>
    )
  }
}

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mins: 0,
      secs: 5,
      isReset: false,
      isPaused: false,
    }
  }

  componentWillMount() {
    this.setState({
      mins: this.props.mins,
      secs: this.props.secs
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.mins == 0 && nextState.secs == 0) {
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
        mins: prevState.secs === 0 ? prevState.mins - 1 : prevState.mins,
      }))}, 1000)
  }

  componentWillUnmount() {
    this.pauseDecrement()
  }

  togglePause = () => {
    this.setState((prevState) => ({
      isPaused: !prevState.isPaused
    }), () => {
    this.state.isPaused ? this.pauseDecrement() : this.decrement()
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

  render() {
    return (
      <View style={styles.flexRow}>
        {/* <View style={styles.flexRow}> */}
          <Text style={styles.timer}>
            {this.state.mins.toString().length === 1 ? `0${this.state.mins}` : this.state.mins}:
            {this.state.secs.toString().length === 1 ? `0${this.state.secs}` : this.state.secs}
          </Text>
        {/* </View> */}
        <Button
          title={this.state.isPaused ? 'Start' : 'Pause'}
          style={styles.button}
          onPress={this.togglePause}
        />
        <Button
          title='Reset'
          style={styles.button}
          onPress={this.props.onHandleReset}
        />
      </View>
    )
  }
}

class Pomodoro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workMins: 0,
      workSecs: 5,
      breakMins: 0,
      breakSecs: 5,
      isPaused: false,
      isReset: false,
      isWorkTime: true,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isWorkTime && (this.state.breakMins !== nextState.breakMins ||
      this.state.breakSecs !== nextState.breakSecs)) {
        return false
    } else if (!this.state.isWorkTime && (this.state.workMins !== nextState.workMins ||
      this.state.workSecs !== nextState.workSecs)) {
        return false
    }
    if (nextState.isWorkTime !== this.state.isWorkTime) {
      // console.log(this.state.isWorkTime)
      return true
    }
    return true
  }

  changeWorkSecs = (secs) => {
    this.setState({ workSecs: secs })
  }

  changeWorkMins = (mins) => {
    this.setState({ workMins: mins })
  }

  changeBreakSecs = (secs) => {
    this.setState({ breakSecs: secs })
  }

  changeBreakMins = (mins) => {
    this.setState({ breakMins: mins })
  }

  handleReset = () => {
    this.setState((prevState) => ({
      isReset: !prevState.isReset
    }))
  }

  handleWorkTime = () => (
    this.setState((prevState) => ({ isWorkTime: !prevState.isWorkTime }))
  )

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pomodoro}>
          <Text style={styles.heading}>pomodoro timer</Text>
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
            title='Work Time'
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
    flex: 1,
    borderWidth: 1,
    borderColor: 'red'
  },
  flexRow: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
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
