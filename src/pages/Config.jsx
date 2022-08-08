import React, { Component } from 'react';

const initialState = {
  timer: 0,
};
export default class Config extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  componentDidMount() {
    this.incremento = this.incrementador();
  }

  componentWillUnmount() {
    this.incremento.clearTimeout();
  }

  incrementador = () => {
    const seg = 1000;
    const interval = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer + 1,
      }));
    }, seg);
    return interval;
  }

  // resetar os dados do forms
  // this.setState(() => initialState);

  render() {
    const { timer } = this.state;
    return (
      <div id="config-page">
        <h3 data-testid="settings-title"> Configurações </h3>
        <p>Teste do cronometro</p>
        <div>{ timer }</div>
        {/* <div>{ this.incremetador() }</div> */}
      </div>
    );
  }
}
