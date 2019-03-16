import React, { Component } from 'react';
import '../styles/main.scss';
import FlashcardContainer from './FlashcardContainer';
import PlayerControl from './PlayerControl';
import NavBar from './NavBar';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      category: null,
      error: null,
      flashcards: [],
      incorrectFlashcards: []
    }
 
    this.updateCategory = this.updateCategory.bind(this); 
    this.filterCardsByCategory = this.filterCardsByCategory.bind(this); 
    this.saveToStorage = this.saveToStorage.bind(this); 
    this.jsonTree = this.jsonTree.bind(this); 
    this.deleteAllStorage = this.deleteAllStorage.bind(this);
  }

  jsonTree(){

    var test = []
    var test2 = []
    var test3 = []
    var test4 = []

    console.log(JSON.stringify(this.state.flashcards));

    this.state.flashcards.forEach((answer, i) => {
        test.push(answer)
        })
        console.log("apptest1", test);

    this.state.flashcards.forEach(answer => {
        test2.push(answer)
        })

        console.log("apptest2", test2);

    this.state.flashcards.forEach(answer => {
          test3.push(answer.answer)
          })

        console.log("apptest3", test3);

        test4 = this.state.flashcards.map(answer => {
          return answer.id
          })

          console.log("apptest4", test4);

  }

  async componentDidMount()  {
    try {

      const response = await fetch('http://memoize-datasets.herokuapp.com/api/v1/flashCardData')
      const json = await response.json();
      const flashcards = json.flashcardData
      this.setState({ flashcards, category: 'Choose your Exam Category'});
      this.jsonTree()
    } catch (error) {
      console.log(error);
      this.setState({ error: true })

    }
  }


  updateCategory(clickedCategory) {

    this.setState({ category: clickedCategory })

  }

  filterCardsByCategory() {

    console.log("category area", this.state.category);
    if (this.state.category === 'Incorrect') {

      let filteredCards = this.state.incorrectFlashcards;
      return filteredCards;

    } else if (this.state.category === 'Empty') {

      // return same cards, no change
      let filteredCards = [];
      return filteredCards;

    } else if (this.state.category !== null && this.state.category !== 'RandomQuestion') {

      // filter out category cards
      let filteredCards = this.state.flashcards.filter(flashcard => {
        return this.state.category.toLowerCase() === flashcard.type;
      })
      return filteredCards;
      
    } else {

      // display all cards randomly/ may change format
      let filteredCards = this.state.flashcards;
      return filteredCards;

    }

  }

  // Initiating the React App for Local Storage
  // create-react-app feature when there no backend support for storage
  saveToStorage(flashcard) {

    console.log("saving", flashcard);

    let { flashcards } = this.state;
  
    let incorrectFlashcards = [];

 

    // if storage is not empty gey items
    if (JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'))) {
      incorrectFlashcards = JSON.parse(localStorage.getItem('incorrectFlashcardsStorage'));
    }
   
    // check if incorrect already exists, if not add it
    var i
    var match = false
    for (i = 0; i < incorrectFlashcards.length; i++) { 
      if (incorrectFlashcards[i].id == (flashcard.id)) {
          match = true
      }
    }
    if(match == false){
      incorrectFlashcards.push(flashcard);
    }

    console.log("incorrectFlashcardIDS", incorrectFlashcards);

    //  updated stroage 
    localStorage.setItem('incorrectFlashcardsStorage', JSON.stringify(incorrectFlashcards));
    
    // set new list of cards
    this.setState({ incorrectFlashcards })
  }

  deleteAllStorage() {
     localStorage.removeItem('incorrectFlashcardsStorage');
     this.setState({ incorrectFlashcards: [] });
   }

  render() {

    let { flashcards, error, category, incorrectFlashcards } = this.state;

    return (
      <div className="App">
        {!error ? (
          <div>


             {/* A JSX comment */}{/* updage category name */}
            <NavBar updateCategory = {this.updateCategory} />

            <div className="main-page">
{            
              <PlayerControl
                incorrectFlashcards={incorrectFlashcards}
                filteredCards={this.filterCardsByCategory()}
                updateCategory={this.updateCategory}
                deleteAllStorage={this.deleteAllStorage} 
                /> 
                }

              <FlashcardContainer

// <--------- Assign values to FlashcardContainer Object --------->

                flashcards = {flashcards}

                // pass category names
                category = {category}

                // filter correct cards to pass
                filteredCards = {this.filterCardsByCategory()}

                 saveToStorage = {this.saveToStorage}


// <--------- Assign values to FlashcardContainer Object --------->

                 />

            </div>
          </div>
        ) : (
            <span role={"img"} aria-label="error">Oops, something went wrong. </span>
          )}
      </div>
    )
  }
}