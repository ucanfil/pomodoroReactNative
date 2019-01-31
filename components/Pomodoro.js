import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { vibrate } from '../utils'
import CounterForm from './CounterForm'
import Counter from './Counter'

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
  flexRow: {
    flexDirection: 'row',
    height: 80,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

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

export default Pomodoro