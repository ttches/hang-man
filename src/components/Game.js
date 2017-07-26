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
    return className;
  }

  const formatCorrect = () => {
    return word.split('').map((letter, i) => {
      let value = letter;
      if ((playing) && !(guessed.includes(letter))) {
        value = '_'
      }
      return (
        <span className={addClasses(letter)} key={i}>{value}</span>
      );
    });
  }

  const showHint = () => {
    if(!(playing)) return;
    const wordSplit = word.split('');
    const placeHolders = document.querySelectorAll('.correct');
    let index;
    for (let i = 0; i < wordSplit.length; i++) {
      if (!(guessed.includes(wordSplit[i]))) {
        index = i;
        break;
      }
    }
    placeHolders[index].innerHTML = `<span class='hint'>${wordSplit[index]}</span>`;
  }


  return (
    <div className='game-container'>
      <div className='countdown'>{8 - incorrect.length}</div>
      <div className='word-container'>{formatCorrect()}</div>
      <input type='text' onKeyUp={onKeyEntered} value={inputValue} />
      <div className='button-container'>
        <button className='new-game' onClick={onClickPlay}>New Game</button>
        <button className='hint-button' onClick={showHint} title='Show hint'>?</button>
      </div>
      <div className='incorrect-container'>{formatIncorrect}</div>
    </div>
  );
}

export default Game;
