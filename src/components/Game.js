import React from 'react';

const Game = ({onClickPlay, onKeyEntered, inputValue, guessed, word,
  incorrect, playing}) => {

  const formatIncorrect = incorrect.map((letter, i) => {
    return (
      <span className='incorrect' key={i}>{letter}</span>
    )
  });

  const addClasses = (letter) => {
    let className ='correct';
    if (!(playing)) {
      className += (guessed.includes(letter) ? '' : ' missing')
    }
    return className
  }

  const getCorrect = () => {
    const wordSplit = word.split('');
    return wordSplit.reduce((total, letter) => {
      if ((guessed.includes(letter))) {
        total.push(letter);
      }
      return total;
    }, [])
  }

  const formatCorrect = (guessed.length > 0)
    ?
      word.split('').map((letter, i) => {
        let value;
        let correct = [...getCorrect()];
        if (correct.includes(letter)) {
          value = letter;
        } else {
          value = '_';
        }
        return (
          <span className={addClasses(letter)} key={i}>{value}</span>
        )
      })
    :
      word.split('').map((letter, i) => {
        return (
          <span className={addClasses()} key={i}>{'_'}</span>
        )
      });




  return (
    <div className='game-container'>
      <div className='countdown'>{8 - incorrect.length}</div>
      <div className='word-container'>{formatCorrect}</div>
      <input type='text' onKeyUp={onKeyEntered} value={inputValue} />
      <button onClick={onClickPlay}>New Game</button>
      <div className='incorrect-container'>{formatIncorrect}</div>
    </div>
  );
}

export default Game;
