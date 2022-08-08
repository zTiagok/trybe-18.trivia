import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getTrivia } from '../API/getInfo';

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
    this.setState({ nextCategory: true });
    target.classList.add('correct-answer-ok');

    const incorrectAnswers = document.querySelectorAll('.incorrect');
    incorrectAnswers.forEach((answer) => {
      answer.classList.add('incorrect-answer-ok');
    });
  }

  incorrectAnswers = () => {
    this.setState({ nextCategory: true });

    const correctAnswer = document.querySelector('.correct');
    correctAnswer.classList.add('correct-answer-nok');

    const incorrectAnswers = document.querySelectorAll('.incorrect');
    incorrectAnswers.forEach((answer) => {
      answer.classList.add('incorrect-answer-nok');
    });
  }

  render() {
    const { APIcode, APIresults, APIanswers, currentCategory, nextCategory } = this.state;
    const { history } = this.props;
    const errorNumber = 3;

    if (APIcode === errorNumber) {
      history.push('/');
    }

    const nextCategoryButton = (
      <button
        type="button"
        onClick={ this.nextCategoryEvent }
      >
        Próxima Questão
      </button>
    );

    const trivia = APIresults.map((results, index) => (
      <div className="trivia-game" key={ results.category + index }>
        <h3
          className="trivia-category"
          data-testid="question-category"
        >
          {results.category}
        </h3>
        <h4
          className="trivia-text"
          data-testid="question-text"
        >
          {results.question}
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
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({ push: propTypes.func }),
};

Game.defaultProps = {
  history: propTypes.shape({}),
};

export default connect()(Game);
