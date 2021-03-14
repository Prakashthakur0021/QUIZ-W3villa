import React, { useState } from 'react';
import './App.css';
import CountDown from './components/Timer'
import {easyQuestions} from "./Questions/EasyQuestions"
import {mediumQuestions} from "./Questions/MediumQuestions"
import {hardQuestions} from "./Questions/HardQuestions"

const App = () => {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quit, setQuit] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState({});
  const [levelSected, setLevelSelected] = useState(false);

  //  To check correct answer
  const answerHandler = (isCorrect) => {
    if(isCorrect) {
      setScore(score+1)
    }
    const nextQuestion = currentQuestion +1;
    if(nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuit(true)
    }
  }


  //  To show questions according to level
  const levelHandler = (value) => {
    console.log(value)
    if(value === "easy") {
      setQuestions(easyQuestions)
      setLevelSelected(true)
    } else if(value === "medium") {
      setQuestions(mediumQuestions)
    } else {
      setQuestions(hardQuestions)
    }
    setLevelSelected(true)
  }

  // To play new Game
  const newGameHandler = () => {
    setQuit(false)
    setQuestions({})
    setCurrentQuestion(0)
    setScore(0)
    setLevelSelected(false)
  }

  // To Select levels
  const levels = (
    <div className="level">
      <div className="level-header">
        <h1>Level?</h1>
      </div>
      <div className="level-choice">
        <button className="level-option" value="easy" onClick={() => levelHandler("easy")}>Easy</button>
        <button className="level-option" value="medium" onClick={() => levelHandler("medium")}>Medium</button>
        <button className="level-option" value="hard" onClick={() => levelHandler("hard")}>Hard</button>
      </div>

    </div>
  )

  // To evaluate score
  const evaluation = () => {
    if(score === 5) {
      return "VERY STRONG"
    } else if(score === 4) {
      return "STRONG"
    } else if(score === 3) {
      return "GOOD"
    } else if(score === 2) {
      return "BAD"
    } else {
      return "POOR"
    } 
  }

  return (
    <div className="App">

      <div className="heading">
        <h1>Quiz</h1>      
      </div>
      <div className="container">
        { !levelSected ? levels : quit ? 

          //  Scoreboared Checking
          (<div className="scoreboard">
            <h1>You Scored {score} out of 5</h1>
            <h2>{evaluation()}</h2>
            <div className="newGameButton"><button onClick={newGameHandler}>Play Again?</button></div>
          </div>) : (
        <>
         {/* Quiz */}
          <div className="container-header">
            <div>
              <h1>Question {currentQuestion+1}</h1>
            </div>
            <div className="countdown">
              <CountDown stop={setQuit} />
            </div>
          </div>
          <div className="quiz-container">
            <div className="questions">
              <h2>{questions[currentQuestion].questionText}</h2>
            </div>
            <div className="answers">
              {questions[currentQuestion].answerOptions.map( (answer) => {
                return <button key={answer.answerText} onClick={() => answerHandler(answer.isCorrect)}>{answer.answerText}</button>
              })}
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
