import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Timer from '../components/Timer';
import Header from '../components/Header';
import Feedback from '../components/Feedback';
import { getTrivia } from '../API/getInfo';
import { saveScore as dispatchSaveScore } from '../redux/actions/actions';

class Game extends Component {
  state = {
    APIcode: '',
    APIresults: [],
    APIanswers: [],
    currentCategory: 0,
    nextCategory: false,
  };

  componentDidMount() {
    this.renderTrivia();
  }

  componentDidUpdate() {
    this.button = document.querySelector('.correct');
  }

  renderTrivia = async () => {
    const token = localStorage.getItem('token');
    const trivia = await getTrivia(token);
    const randomizer = 0.5;
    console.log(trivia);
    const array = [];

    trivia.results.forEach((result) => {
      let incorrectElement = result.incorrect_answers.map((answer, index) => (
        <button
          type="button"
          key={ index }
          data-testid="wrong-answer"
          onClick={ this.incorrectAnswers }
          className="incorrect"
        >
          {answer}
        </button>
      ));

      const correctElement = (
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.correctAnswer }
          className="correct"
        >
          { result.correct_answer }
        </button>
      );

      incorrectElement.push(correctElement);
      incorrectElement = incorrectElement.sort(() => Math.random() - randomizer);
      array.push(incorrectElement);
    });

    this.setState({ APIcode: trivia.response_code,
      APIresults: trivia.results,
      APIanswers: array });
  }

  nextCategoryEvent = () => {
    this.setState((prevState) => ({ currentCategory: prevState.currentCategory + 1,
      nextCategory: false }));
  }

  correctAnswer = ({ target }) => {
    const { saveScore } = this.props;

    this.setState({ nextCategory: true });
    target.classList.add('correct-answer-ok');

    const incorrectAnswers = document.querySelectorAll('.incorrect');
    incorrectAnswers.forEach((answer) => {
      answer.classList.add('incorrect-answer-ok');
    });

    // AUMENTAR A QUANTIDADE DE SCORE DEPOIS______________________________________________________________________
    saveScore(1);
  }

  incorrectAnswers = () => {
    this.setState({ nextCategory: true });

    const correctAnswer = document.querySelector('.correct');
    correctAnswer.classList.add('correct-answer-ok');

    const incorrectAnswers = document.querySelectorAll('.incorrect');
    incorrectAnswers.forEach((answer) => {
      answer.classList.add('incorrect-answer-ok');
    });
  }

  render() {
    const { APIcode, APIresults, APIanswers, currentCategory, nextCategory } = this.state;
    const { history } = this.props;
    const errorNumber = 3;
    const showFeedback = 5;

    if (APIcode === errorNumber) {
      history.push('/');
    }

    // const result = timer.contains('00:0');

    const nextCategoryButton = (
      <button
        type="button"
        onClick={ this.nextCategoryEvent }
        data-testid="btn-next"
        className="trivia-next-question"
      >
        Próxima Questão
      </button>
    );

    const trivia = APIresults.map((results, index) => (
      <div id="trivia-game" key={ results.category + index }>
        <Timer />
        <h3
          className="trivia-category"
          data-testid="question-category"
        >
          { results.category }
        </h3>
        <div className="trivia-line" />
        <h4
          className="trivia-text"
          data-testid="question-text"
        >
          { results.question }
        </h4>
        <div className="trivia-answers" data-testid="answer-options">
          {APIanswers[index]}
        </div>
      </div>
    ));

    return (
      <>
        <Header />
        <div id="game-page">
          {APIresults
            ? trivia[currentCategory]
            : 'Carregando...'}
          { nextCategory
            && nextCategoryButton}

          {currentCategory >= showFeedback
            && <Feedback />}
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({ push: propTypes.func }),
  saveScore: propTypes.func.isRequired,
};

Game.defaultProps = {
  history: propTypes.shape({}),
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(dispatchSaveScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
