import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timer } from '../redux/actions/actions';

const initialState = {
  second: 30,
};

class Timer extends React.Component {
  constructor() {
    super();

    this.state = initialState;
  }

  componentDidMount() {
    this.decrementador = this.decrementador();
  }

  componentWillUnmount() {
    this.decrementador.clearTimeout();
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
    const { changeTime } = this.props;
    const { second } = this.state;
    if (second === 0) {
      this.setState(() => initialState);
    }
    changeTime(second);
    return (
      <div>{`00:${second}`}</div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeTime: (payload) => (
    dispatch(timer(payload))),
});

Timer.propTypes = {
  changeTime: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
