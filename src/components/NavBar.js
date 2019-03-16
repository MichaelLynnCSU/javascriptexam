import React, { Component } from 'react';
import '../styles/main.scss';

export default class NavBar extends Component {
  constructor() {
    super();
    this.passCategory = this.passCategory.bind(this); 
  }

  passCategory(e) {   
    let clickedCategory = e.target.innerText;
    this.props.updateCategory(clickedCategory);
  }

  render() {
    let categories = ['Mutator', 'Accessor', 'Iteration', 'RandomQuestion']
    return (
      <div className="NavBar">
        <h1 className="quizzy-title">JavaScript Exam</h1>
        <div className="filter-section">
            {
              categories.map((category, i) => {
              return (

                <button
                  key={i}
                  onClick={this.passCategory}
                  className="buttons filter-button"
                  type="button">{category}
                </button>

              )
            })
            }
        </div>
      </div>
    );
  }
}