import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// import { MD5 } from 'crypto-js';

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
    const { username, score } = this.props;
    const { hashCode } = this.state;

    return (
      <header>
        <div id="header-user">
          <img
            src={ hashCode }
            alt="Icon"
            id="header-icon"
            data-testid="header-profile-picture"
          />
          <p
            id="header-username"
            data-testid="header-player-name"
          >
            { username || 'Usuário'}
          </p>
        </div>
        <p id="header-score">Pontuação:</p>
        <p
          id="header-score"
          data-testid="header-score"
        >
          { score }
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  username: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
