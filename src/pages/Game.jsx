import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Feedback from './Feedback';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { getTrivia } from '../API/getInfo';
import { calculateScore } from '../redux/actions/actions';

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
    const arrBtn = [];

    // lógica pra renderizar as 4 questions da chamada da API
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
          value={ result.difficulty }
          className="correct"
        >
          { result.correct_answer }
        </button>
      );

      incorrectElement.push(correctElement);
      incorrectElement = incorrectElement.sort(() => Math.random() - randomizer);
      arrBtn.push(incorrectElement);
    });

    // alimenta o estado do Componente
    this.setState({ APIcode: trivia.response_code,
      APIresults: trivia.results,
      APIanswers: arrBtn });
  }

  // altera as categorias trazidas pela API
  nextCategoryEvent = () => {
    this.setState((prevState) => ({ currentCategory: prevState.currentCategory + 1,
      nextCategory: false }));
  }

  correctAnswer = ({ target }) => {
    const { sendScore } = this.props;

    this.setState({ nextCategory: true });
    target.classList.add('correct-answer-ok');

    const incorrectAnswers = document.querySelectorAll('.incorrect');
    incorrectAnswers.forEach((answer) => {
      answer.classList.add('incorrect-answer-ok');
    });
    // Adicionar action que calcular score -> o parametro é a dificuldade da pergunta
    sendScore(target.value);
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

    // trata o erro de requisição da Api
    if (APIcode === errorNumber) {
      history.push('/');
    }

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

    // renderiza as categoria/questions/respostas na tela
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
        <div id="game-page" data-testid="game-page">
          {APIresults
            ? trivia[currentCategory]
            : 'Carregando...'}
          { nextCategory
            && nextCategoryButton}

          {currentCategory >= showFeedback
            && <Feedback history={ history } />}
          {/* history.push('/feedback') */}
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({ push: propTypes.func }),
  sendScore: propTypes.func.isRequired,
};

Game.defaultProps = {
  history: propTypes.shape({}),
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  sendScore: (score) => dispatch(calculateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
