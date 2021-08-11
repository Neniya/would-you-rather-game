import React, { Component } from "react";
import Question from "./Question";

class QuestionsList extends Component {
  render() {
    return (
      <ul className="list">
        {this.props.questions.map((questionId) => (
          <li key={questionId}>
            <Question
              id={questionId}
              answered={this.props.answered}
              forList={true}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default QuestionsList;
