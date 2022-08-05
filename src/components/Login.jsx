import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    userValue: '',
    emailValue: '',
  }

  handleInput = ({ target }) => {
    if (target.type === 'text') {
      this.setState({ userValue: target.value });
    }

    if (target.type === 'email') {
      this.setState({ emailValue: target.value });
    }
  }

  render() {
    const { userValue, emailValue } = this.state;
    let btnDisabled = true;

    if (userValue && emailValue.includes('@' && '.com')) {
      btnDisabled = false;
    } else {
      btnDisabled = true;
    }

    return (
      <div id="login-page">
        <form id="login-form">

          <label htmlFor="login-name">
            Usuário:
            <input
              type="text"
              value={ userValue }
              onChange={ this.handleInput }
              name="login-name"
              id="login-name"
              data-testid="input-player-name"
              required
            />
          </label>

          <label htmlFor="login-email">
            Email:
            <input
              type="email"
              value={ emailValue }
              onChange={ this.handleInput }
              name="login-email"
              id="login-email"
              data-testid="input-gravatar-email"
              required
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            disabled={ btnDisabled }
          >
            Play
          </button>

        </form>
      </div>
    );
  }
}
