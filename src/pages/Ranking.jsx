import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  redirect = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const dataRanking = JSON.parse(localStorage.getItem('ranking'));
    const rankingOrder = dataRanking.sort((a, b) => b.score - a.score);
    const getDataGame = rankingOrder.map(({ name, score, hashCode }, index) => (
      <div key={ index }>
        <p data-testid={ `player-name-${index}` }>{ name }</p>
        <img src={ hashCode } alt="icon" />
        <p data-testid={ `player-score-${index} ` }>{ score }</p>
      </div>
    ));

    return (
      <div data-testid="ranking-title">
        <h2>Ranking</h2>
        <div>
          {getDataGame}
        </div>
        <button type="button" data-testid="btn-go-home" onClick={ this.redirect }>
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
  // dataGame: PropTypes.arrayOf().isRequired,
};

export default Ranking;
