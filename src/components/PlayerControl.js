import React, { Component } from 'react';
import '../styles/main.scss';

export default class PlayerControl extends Component {

  passCategory() {
    if (JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'))) {
      let clickedCategory = 'Incorrect';
      this.props.updateCategory(clickedCategory);
    } else {
      let clickedCategory = 'Empty'
      this.props.updateCategory(clickedCategory);      
    }
  }

  render() {
    let { incorrectFlashcards, deleteAllStorage } = this.props;
    return (
      <div className="PlayerControl">
        <h2 className="player-options">Player Options</h2>
        <button
          onClick={this.passCategory.bind(this)}
          className="view-incorrect-button buttons"
          type="button">Review Incorrect ({incorrectFlashcards.length})</button>
        <button
          onClick={deleteAllStorage}                    
          className="reset-button buttons"
          type="button">Reset Review</button>
      </div>
    );
  }
}