import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getTrivia } from '../API/getInfo';

class Game extends Component {
  state = {
    APIcode: '',
    APIresults: [],
  };

  componentDidMount() {
    this.renderTrivia();
  }

  renderTrivia = async () => {
    const token = localStorage.getItem('token');
    const trivia = await getTrivia(token);

    console.log(trivia);

    this.setState({ APIcode: trivia.response_code, APIresults: trivia.results });
  }

  render() {
    const { APIcode, APIresults } = this.state;
    const { history } = this.props;
    const errorNumber = 3;

    if (APIcode === errorNumber) {
      history.push('/');
    }

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

          <button type="button" data-testid="correct-answer">
            {results.correct_answer}
          </button>

          {results.incorrect_answers.map((answers, index2) => (
            <button type="button" key={ index2 } data-testid={ `wrong_answer-${index2}` }>
              {answers}
            </button>
          ))}

        </div>
      </div>
    ));

    return (
      <>
        <Header />
        <div id="game-page">
          {APIresults
            ? trivia
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
