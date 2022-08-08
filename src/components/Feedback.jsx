import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    return (
      <div
        id="feedback"
        data-testid="feedback-text"
      >
        Feedback
      </div>
    );
  }
}

export default connect()(Feedback);
