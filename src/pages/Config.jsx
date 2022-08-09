import React, { Component } from 'react';
import Timer from '../components/Timer';

export default class Config extends Component {
  render() {
    return (
      <div id="config-page">
        <h3 data-testid="settings-title"> Configurações </h3>
        <Timer />
      </div>
    );
  }
}
