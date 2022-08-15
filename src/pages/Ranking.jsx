import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoHome from '../components/GoHome';

class Ranking extends Component {
  redirect = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const dataRanking = JSON.parse(localStorage.getItem('ranking'));
    const rankingOrder = dataRanking.sort((a, b) => b.score - a.score);
    const { history } = this.props;
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
        <GoHome history={ history } />
        <div>
          {getDataGame}
        </div>
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
