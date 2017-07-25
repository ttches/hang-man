import React, { Component } from 'react';
import Game from '../components/Game';
import masterWordList from '../words';

export default class GameContainer extends Component {
  constructor() {
    super();
    this.chooseWord = this.chooseWord.bind(this);
    this.guessLetter = this.guessLetter.bind(this);
    this.handleKeyEntered = this.handleKeyEntered.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.words = this.words.bind(this); //Not sure if this is right, made it a function to keep it constant
    this.state = {
      difficulty: 'medium',
      inputValue: '',
      guessed: [],
      playing: false,
      word: '',
    };
  }

  chooseWord() {
    const filters = {
      easy: [3, 4],
      medium: [5, 6],
      hard: [7, 100]
    }
    const { difficulty } = this.state;
    const wordsFiltered = this.words().filter((word) => {
      return (word.length >= filters[difficulty][0] && word.length <= filters[difficulty][1]);
    });
    return wordsFiltered[Math.floor(Math.random() * wordsFiltered.length)];
  }

  guessLetter() {
    const {guessed, inputValue} = this.state;
    if (guessed.includes(inputValue)) {
      return;
    }
    let newGuess = [...guessed];
    newGuess.push(inputValue);
    this.setState({
      ...this.state,
      guessed: newGuess
    });
  }

  handleKeyEntered(e) {
    if (!(this.state.playing)) return;
    const key = e.key.toLowerCase();
    console.log(key);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    if (alphabet.includes(key)) {
      this.setState({
        ...this.state,
        inputValue: key,
      });
    } else if (key === 'backspace') {
      this.setState({
        ...this.state,
        inputValue: ''
      });
    } else if (key === 'enter' && alphabet.includes(this.state.inputValue)) {
      console.log('entering');
      this.guessLetter();
    }
  }

  handlePlay() {
    this.setState({
      ...this.state,
      guessed: [],
      playing: true,
      word: this.chooseWord(),
    });
  }

  words() {
    return masterWordList.split('\n');
  }


  render() {
    return (
      <Game
        guessed={this.state.guessed}
        onClickPlay={this.handlePlay}
        onKeyEntered={this.handleKeyEntered}
        inputValue={this.state.inputValue}/>
    );
  }
}
