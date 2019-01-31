import React, { Component } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

const styles = StyleSheet.create({
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
})

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

export default Counter