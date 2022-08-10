import React, { Component } from 'react';
import propTypes from 'prop-types';

import GoHome from '../components/GoHome';

export default class Config extends Component {
  render() {
    const { history } = this.props;

    return (
      <div id="config-page">
        <h3 data-testid="settings-title"> Configurações </h3>
        <GoHome history={ history } />
      </div>
    );
  }
}

Config.propTypes = {
  history: propTypes.shape({ push: propTypes.func }),
};

Config.defaultProps = {
  history: propTypes.shape({}),
};
