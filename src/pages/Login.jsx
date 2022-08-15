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

  saveDataLogin = async () => {
    const { history, saveUser } = this.props;
    const { userValue, emailValue } = this.state;
    const data = await getToken();
    localStorage.setItem('token', [data.token]);
    saveUser(userValue, emailValue);
    history.push('/play');
  }

  handleButton = ({ target }) => {
    const { history } = this.props;
    const { id } = target;
    return (id === 'btn-play' ? this.saveDataLogin() : history.push('/config'));
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
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
          <babel htmlFor="login-name" id="user-label">
            Usuário
          </babel>
          <input
            type="text"
            value={ userValue }
            onChange={ this.handleInput }
            name="userValue"
            id="login-name"
            data-testid="input-player-name"
            autoComplete="off"
            placeholder="Seu Nome"
            required
          />

          <babel htmlFor="login-email" id="email-label">
            Email
          </babel>
          <input
            type="email"
            value={ emailValue }
            onChange={ this.handleInput }
            name="emailValue"
            id="login-email"
            data-testid="input-gravatar-email"
            autoComplete="off"
            placeholder="seu@email.com"
            required
          />

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

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user, email) => (
    dispatch(dispatchSaveUser(user, email))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
