import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { getToken } from '../API/getInfo';
import { saveUser as dispatchSaveUser } from '../redux/actions/actions';

class Login extends Component {
  state = {
    userValue: '',
    emailValue: '',
  }

  handleButton = async ({ target }) => {
    const { history, saveUser } = this.props;
    const { userValue, emailValue } = this.state;

    if (target.id === 'btn-play') {
      const data = await getToken();

      localStorage.setItem('token', [data.token]);

      saveUser(userValue, emailValue);

      history.push('/play');
    }

    if (target.id === 'btn-settings') {
      history.push('/config');
    }
  };

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
            onClick={ this.handleButton }
            disabled={ btnDisabled }
            id="btn-play"
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleButton }
            id="btn-settings"
          >
            Settings
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({ push: propTypes.func }),
  saveUser: propTypes.func.isRequired,
};

Login.defaultProps = {
  history: propTypes.shape({}),
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user, email) => dispatch(dispatchSaveUser(user, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
