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
      <div key={ index } className="ranking-item">
        <img src={ hashCode } alt="icon" className="ranking-images" />
        <p data-testid={ `player-name-${index}` } className="ranking-names">{ name }</p>
        <p data-testid={ `player-score-${index}` } className="ranking-scores">{ score }</p>
      </div>
    ));

    return (
      <main id="ranking-page">
        <GoHome history={ history } />
        <h2 id="ranking-title">Ranking</h2>
        <hr id="ranking-line" />
        <div id="ranking-list">
          {getDataGame}
        </div>
      </main>
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
