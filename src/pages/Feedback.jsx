import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveGame } from '../redux/actions/actions';

class Feedback extends Component {
  componentDidMount() {
    this.saveGame();
  }

  redirect = ({ target }) => {
    const { history, arrGame } = this.props;
    const { id } = target;
    // salva o array no localStorage
    localStorage.setItem('ranking', JSON.stringify(arrGame));
    return (id === 'btn-play-again' ? history.push('/') : history.push('/ranking'));
  }

  // salva os dados do Game após finalizado a partida
  saveGame = () => {
    const { name, score, hashCode, savedGameUser } = this.props;
    // salva os dados do Game após finalizado a partida num array
    const ranking = {
      name,
      score,
      hashCode,
    };
    // guarda os dados no array do reducer
    savedGameUser(ranking);
  }

  render() {
    const { score, assertions } = this.props;
    const scoreMin = 3;
    return (
      <div id="game-page">
        <div
          id="feedback"
          data-testid="feedback-text"
        >
          Feedback
          { assertions < scoreMin ? <h2>Could be better...</h2> : <h2>Well Done!</h2>}
        </div>
        <div>Pontuação Total:</div>
        <div data-testid="feedback-total-score">{ score }</div>
        <div>Respostas Corretas:</div>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirect }
          id="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          id="btn-ranking"
          data-testid="btn-ranking"
          onClick={ this.redirect }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  hashCode: PropTypes.string.isRequired,
  savedGameUser: PropTypes.func.isRequired,
  arrGame: PropTypes.arrayOf().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  arrGame: state.player.saveGame,
  name: state.player.name,
  hashCode: state.player.hashcode,
});

const mapDispatchToProps = (dispatch) => ({
  savedGameUser: (payload) => dispatch(saveGame(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
