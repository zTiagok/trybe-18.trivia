import React, { Component } from 'react';
import { connect } from 'react-redux';

import { disableButton as dispatchDisableButton } from '../redux/actions/actions';

class Timer extends Component {
  state = {
    second: 30,
  }

  componentDidMount() {
    this.timer = this.decrementador();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  decrementador = () => {
    const seg = 1000;
    const interval = setInterval(() => {
      this.setState((prev) => ({
        second: prev.second - 1,
      }));
    }, seg);
    return interval;
  }

  render() {
    const { second } = this.state;
    if (second <= 0) {
      clearInterval(this.timer);

      const buttons = document.querySelector('.trivia-answers').childNodes;

      buttons.forEach((button) => {
        button.disabled = true;
      });
    }
    return (
      <div id="timer-countdown">{`00:${second}`}</div>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  disableButton: () => dispatch(dispatchDisableButton()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
