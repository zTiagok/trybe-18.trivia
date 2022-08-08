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
          className="wrong-answers"
        >
          {answer}
        </button>
      ));

      const correctElement = (
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.correctAnswer }
          className="correct-answer"
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

  correctAnswer = () => {
    this.setState((prevState) => ({ currentCategory: prevState.currentCategory + 1 }));
  }

  wrongAnswer = () => {

  };

  render() {
    const { APIcode, APIresults, APIanswers, currentCategory } = this.state;
    const { history } = this.props;
    const errorNumber = 3;

    if (APIcode === errorNumber) {
      history.push('/');
    }

    // const trivia = APIresults.map((results, index) => (
    //   <div className="trivia-game" key={ results.category + index }>
    //     <h3
    //       className="trivia-category"
    //       data-testid="question-category"
    //     >
    //       {results.category}
    //     </h3>
    //     <h4
    //       className="trivia-text"
    //       data-testid="question-text"
    //     >
    //       {results.question}
    //     </h4>
    //     <div className="trivia-answers" data-testid="answer-options">

    //       <button
    //         type="button"
    //         data-testid="correct-answer"
    //         onClick={ this.correctAnswer }
    //       >
    //         {results.correct_answer}
    //       </button>

    //       {results.incorrect_answers.map((answers, index2) => (
    //         <button
    //           type="button"
    //           key={ index2 }
    //           data-testid="wrong-answer"
    //         >
    //           {answers}
    //         </button>
    //       ))}

    //     </div>
    //   </div>
    // ));

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
