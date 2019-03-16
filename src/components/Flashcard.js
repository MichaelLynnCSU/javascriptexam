import React, { Component } from 'react';
import '../styles/main.scss';

export default class Flashcard extends Component {
  constructor() {
    super();
    this.state = {
      correct: null,
      buttonDis: false
    }

    

  }

  validateAnswer = (e) => {

    this.state.buttonDis = true;
    let { flashcard, saveToStorage } = this.props;

         // only disable the question after answer 
         this.state.buttonDis = true;
      
    let answerClicked = e.target.innerText;

    if (flashcard.answer === answerClicked) {

      this.setState({ correct: true });
  
    } else {

      this.setState({ correct: false });

      saveToStorage(flashcard);

    }
  }




  randomizeAnswers() {

    let { flashcard, flashcards } = this.props;

    var allAnswers = [];
    var test = []
    var i;
    var x

    // get list of answers from object
    for (i = 0; i < flashcards.length; i++) { 
      allAnswers[i] = flashcards[i].answer
    }

    // assign 3 random asnwers
    for (i = 0; i < 3; i++) { 
      x = Math.floor(Math.random() * (allAnswers.length - 0) + 0);
      test[i] = allAnswers[x]
    }
  
    // insert corrrect asnwer in random position
    x = Math.floor(Math.random() * (2 - 0) + 0);
    test[x] = flashcard.answer

    return test;
  }

  render() {


    const { flashcard, flashcards, category } = this.props;

    const { correct } = this.state;
    
    let currentAnswersArray = this.randomizeAnswers();
    
    let flashcardClass = 'Flashcard';
    
    let correctFeedback;
    
    let incorrectFeedback;

    let showanswer;
    // keep Incorrect review buttons disabled
    if(category == "Incorrect"){
      this.state.buttonDis = true;
    showanswer = "Correct Answer: "
     showanswer = showanswer + flashcard.answer

    }


    if (correct === true) {

        flashcardClass = 'Flashcard correct-answer'
        correctFeedback = 'show'
        incorrectFeedback = 'hide'

    } 
      else if (correct === false) {

        flashcardClass = 'Flashcard incorrect-answer'
        incorrectFeedback = 'show'
        correctFeedback = 'hide'
    } 
    else {

        incorrectFeedback = 'hide'
        correctFeedback = 'hide'
    }

    return (

      <div className={flashcardClass}>

        {/* Questions number out of total possible  */}
        <p className="question-counter">
          Question {flashcards.indexOf(flashcard) + 1} out of {flashcards.length}
        </p>

        {/*  Looped in Obiect question */}
        <p className="flashcard-question">{flashcard.question}</p>

        {/* List of answers*/}
        <div className="buttons-container">
       
          {
            // create button for each asnwer
            currentAnswersArray.map((answer, i) => {
            return <button key={i} disabled={this.state.buttonDis}  onClick={ this.validateAnswer } className="flashcard-buttons" type="button">

                { answer }

            </button>

          })

          }   

        </div>


        <p className={correctFeedback}>That's right! </p>

        <p className={incorrectFeedback}>Not quite. </p>

        <div>{showanswer}</div>

        <div className="learn-more">
          <a
            href={flashcard.mdn_link}
            className="mdn-link"
            target="_blank"
            rel="noopener noreferrer">Learn More</a>
        </div>   

      </div>
    )
  }
}