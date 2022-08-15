import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveIcon } from '../redux/actions/actions';

class Header extends Component {
  state = {
    hashCode: '',
  }

  componentDidMount() {
    this.generateGravatarIcon();
  }

  generateGravatarIcon = () => {
    const { savedIcon, gravatarEmail } = this.props;
    const hashEmail = md5(gravatarEmail);
    const hashCode = `https://www.gravatar.com/avatar/${hashEmail.toString()}`;

    this.setState({ hashCode });
    // salva o iconGravatar no reducer
    savedIcon(hashCode);
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
  gravatarEmail: propTypes.string.isRequired,
  savedIcon: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  hashCode: state.player.hashcode,
});

const mapDispatchToProps = (dispatch) => ({
  savedIcon: (icon) => dispatch(saveIcon(icon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
