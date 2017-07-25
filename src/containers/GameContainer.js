import React, { Component } from 'react';
import Game from '../components/Game';
import masterWordList from '../words';

export default class GameContainer extends Component {
  constructor() {
    super();
    this.checkWinner = this.checkWinner.bind(this);
    this.chooseWord = this.chooseWord.bind(this);
    this.getIncorrect = this.getIncorrect.bind(this);
    this.guessLetter = this.guessLetter.bind(this);
    this.handleKeyEntered = this.handleKeyEntered.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.words = this.words.bind(this); //Not sure if this is right, made it a function to keep it constant
    this.state = {
      difficulty: 'medium',
      inputValue: '',
      guessed: [],
      playing: true,
      word: '',
    };
  }

  checkWinner() {
    const guessed = this.state.guessed;
    const word = this.state.word.split('');
    for (let letter of word) {
      if (!(guessed.includes(letter))) {
        return false;
      }
    }
    return true;
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

  getIncorrect() {
    const guessed = this.state.guessed;
    const word = this.state.word.split('');
    return guessed.reduce((total, letter) => {
      if (!(word.includes(letter))) {
        total.push(letter);
      }
      return total;
    }, [])
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
      inputValue: '',
      guessed: newGuess
    });
  }

  handleKeyEntered(e) {
    if (!(this.state.playing)) return;
    const key = e.key.toLowerCase();
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

  //lifecycles
  componentWillMount() {
    this.handlePlay();
  }

  componentDidUpdate() {
    let { playing, word } = this.state;
    if (word === '') return;
    console.log(this.getIncorrect().length);
    if (((playing) && (this.getIncorrect().length >= 8 || this.checkWinner()))) {
      this.setState({
        ...this.state,
        playing: false
      });
    }
  }

  render() {
    return (
      <Game
        guessed={this.state.guessed}
        incorrect={this.getIncorrect()}
        onClickPlay={this.handlePlay}
        onKeyEntered={this.handleKeyEntered}
        playing={this.state.playing}
        inputValue={this.state.inputValue}
        word={this.state.word}/>
    );
  }
}
