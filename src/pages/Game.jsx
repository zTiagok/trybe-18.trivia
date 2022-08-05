import React, { Component } from 'react';
import Header from '../components/Header';

export default class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <div id="game-page">
          Game
        </div>
      </>
    );
  }
}
