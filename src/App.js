import React, { Component } from 'react'
import Keyboard from './Keyboard.js'
import Riddle from './Riddle.js'
import './App.css'
import words from './resources/words_EN.js'
import HangmanCanvas from './HangmanCanvas.js'

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
const STATUS = new Map([['won', '🤗'],['lost', '😤']])

class App extends Component {
  state = {
    attemptedKeys: [],
    wordToGuess: this.randomWord(),
    maxErrorsAuthorized: 5,
  }

  // Putting an arrow function to bind this here...
  clickKey = (key) => {
    const { attemptedKeys } = this.state
    if (!attemptedKeys.includes(key)) {
      const newAttemptedKeys = [...attemptedKeys, key]
      this.setState({ attemptedKeys: newAttemptedKeys })
    }
  }

  // Putting an arrow function to bind this here...
  isRevealed = (key) => {
    const { attemptedKeys } = this.state
    return attemptedKeys.includes(key)
  }

  // Putting an arrow function to bind this here...
  getStatus = (key) => {
    const { attemptedKeys } = this.state
    if (attemptedKeys.includes(key)) {
      return "clicked"
    }
    return "unclicked"
  }

  randomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex].split('')
  }

  resetGame = () => {
    this.setState({
      attemptedKeys: [],
      wordToGuess: this.randomWord(),
    })
  }

  render() {
    const { wordToGuess, attemptedKeys, maxErrorsAuthorized } = this.state
    const numberOfErrors = attemptedKeys.filter(key => !wordToGuess.includes(key)).length
    const won = wordToGuess.every(key => attemptedKeys.includes(key))
    const lost = numberOfErrors === maxErrorsAuthorized
    const gameStatus = won ? 'won' : lost ? 'lost' : 'playing'
    return (
      <div className="pendu">
        <div className="controls">
          <Riddle word={wordToGuess} isRevealed={this.isRevealed} />
          <div className="reset">
            { gameStatus !== 'playing' && (
              <div className="status">
                <p className={gameStatus}>{STATUS.get(gameStatus)} You {gameStatus.toUpperCase()} {STATUS.get(gameStatus)}</p>
                { lost && <p>The word to guess was: {wordToGuess}</p> }
              </div>
            )}
            { (lost || won) && <button className="button" onClick={this.resetGame}>RESET</button> }
          </div>
        { gameStatus === 'playing' && <Keyboard keys={LETTERS} onClick={this.clickKey} status={this.getStatus} /> }
        </div>
        <HangmanCanvas numberOfErrors={numberOfErrors} maxErrorsAuthorized={maxErrorsAuthorized} />
      </div>
    )
  }

}
export default App;
