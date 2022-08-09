import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const scoreMin = 3;
    const { score } = this.props;
    return (
      <div
        id="feedback"
        data-testid="feedback-text"
      >
        Feedback
        { score < scoreMin ? <h2>Could be better...</h2> : <h2>Well Done!</h2>}
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
