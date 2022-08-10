import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class GoHome extends Component {
  handleButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ this.handleButton }
      >
        Home
      </button>
    );
  }
}

GoHome.propTypes = {
  history: propTypes.shape({ push: propTypes.func }),
};

GoHome.defaultProps = {
  history: propTypes.shape({}),
};
