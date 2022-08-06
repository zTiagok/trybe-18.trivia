import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// import { MD5 } from 'crypto-js';

import { saveGravatar as dispatchSaveGravatar } from '../redux/actions/actions';

class Header extends Component {
  state = {
    hashCode: '',
  }

  componentDidMount() {
    this.generateGravatarIcon();
  }

  generateGravatarIcon = () => {
    // const { email, saveGravatar } = this.props;

    // const hashCode = `https://www.gravatar.com/avatar/${MD5(email).toString()}`;
    const hashCode = 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc';

    this.setState({ hashCode });
    // saveGravatar(hashCode);
  }

  render() {
    const { username } = this.props;
    const { hashCode } = this.state;

    return (
      <header>
        <p
          id="header-username"
          data-testid="header-player-name"
        >
          { username || 'Usuário'}
        </p>
        <img
          src={ hashCode }
          alt="Icon"
          id="header-icon"
          data-testid="header-profile-picture"
        />
        <p
          id="header-score"
          data-testid="header-score"
        >
          0
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  username: propTypes.string.isRequired,
  // email: propTypes.string.isRequired,
  // gravatarEmail: propTypes.string.isRequired,
  // saveGravatar: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.player.name,
  email: state.player.email,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  saveGravatar: (url) => dispatch(dispatchSaveGravatar(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
