import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import QuestionForm from "./QuestionForm";

class QuestionPage extends Component {
  state = {
    option: "",
  };
  switchOption = (option) => {
    this.setState(() => ({
      option,
    }));
  };

  handleAnswerSubmit = (e) => {
    e.preventDefault();
    // Todo: add functionality process answer
  };
  render() {
    const { question } = this.props;

    if (question === null) {
      return <p>This question doesen't exist</p>;
    }
    const { name, avatar, optionOne, optionTwo, id, answered } = question;
    const answersOptionOne = optionOne.votes.length;
    const answersOptionTwo = optionTwo.votes.length;
    const answers = answersOptionOne + answersOptionTwo;
    const persentOptionOne = (answersOptionOne * 100) / answers;
    const questionText = answered ? (
      <div>
        <p>{optionOne.text}</p>
        <progress
          id="percentOne"
          value={`${persentOptionOne}`}
          max="100"
        ></progress>
        <br />
        <label htmlFor="percentOne">
          {answersOptionOne} out of {answers} votes
        </label>
        <p>{optionTwo.text}</p>
        <progress
          id="percentTwo"
          value={`${100 - persentOptionOne}`}
          max="100"
        ></progress>
        <br />
        <label htmlFor="percentTwo">
          {answersOptionTwo} out of {answers} votes
        </label>
      </div>
    ) : (
      <div>
        <form className="answers" onSubmit={(e) => this.handleAnswerSubmit(e)}>
          <div>
            <input
              type="radio"
              name="question"
              value="optionOne"
              id="option-one"
            />
            <label htmlFor="option-one">{optionOne.text}</label>
          </div>
          <div>
            <input
              type="radio"
              name="question"
              value="optionTwo"
              id="option-two"
              onChange={(e) => this.switchOption(e.target.value)}
            />
            <label htmlFor="option-one">{optionTwo.text}</label>
          </div>
          <button className="btn"> Submit</button>
        </form>
      </div>
    );
    console.log(questionText);
    return (
      <QuestionForm question={question} questionText={questionText} />
      //             {: (
      //               <div>
      //                 (
      //
      //                 )}
      //               </div>
      //             )}
      //           </div>
      //         </div>}
    );
  }
}

function mapStateToProps({ questions, authedUser, users }, props) {
  const { id } = props.match.params;
  console.log(props);
  const question = questions[id];
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

export default connect(mapStateToProps)(QuestionPage);
