import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  redirect = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div data-testid="ranking-title">
        Ranking
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirect }
        >
          Go-Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
