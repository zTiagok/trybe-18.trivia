import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { timer } from '../redux/actions/actions';

import { disableButton, saveTimer } from '../redux/actions/actions';

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
    const { sendTimer } = this.props;
    sendTimer(second);
    if (second <= 0) {
      clearInterval(this.timer);
      // desabilita os buttons quando o timer chega em 0;
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

Timer.propTypes = {
  sendTimer: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  disableButton: () => dispatch(disableButton()),
  sendTimer: (payload) => dispatch(saveTimer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
