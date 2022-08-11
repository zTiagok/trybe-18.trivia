import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  redirect = ({ target }) => {
    const { history } = this.props;
    const { id } = target;
    return (id === 'btn-play-again' ? history.push('/') : history.push('/ranking'));
    // falta corrigir a lógica no game quando redireciona para o componente Feedback
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
          data-testid="btn-ranking"
          onClick={ this.redirect }
          id="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
