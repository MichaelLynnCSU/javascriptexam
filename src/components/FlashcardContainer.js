import React from 'react';
import Flashcard from './Flashcard'
import '../styles/main.scss';

export default function FlashcardContainer(props) {

  console.log("from app to container props", props.filteredCards)

  return (
    <div className="FlashcardContainer">

    {/* Display Category Title*/}
      <h2 className="all-flashcards-header">{props.category}</h2>
      {
      
// <---------Create multiple instances of each Flashcard Oject-------->
        props.filteredCards.map(flashcard =>

        <Flashcard
// <--------- Assign values to Flashcard Object --------->

          flashcard = {flashcard}
          key = {flashcard.id}
          flashcards = {props.flashcards}
          saveToStorage = {props.saveToStorage}
          category = {props.category}

// <--------- Assign values to Flashcard Object --------->
          />
      )

// <---------Create multiple instances of each Flashcard Oject-------->
      }

    </div>
  );
}