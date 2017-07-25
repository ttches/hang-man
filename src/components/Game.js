import React from 'react';

const Game = ({onClickPlay, onKeyEntered, inputValue, guessed, word,
  incorrect}) => {

  const formatIncorrect = incorrect.map((letter, i) => {
    return (
      <span className='incorrect' key={i}>{letter}</span>
    )
  })

  return (
    <div className='game-container'>
      <div className='countdown'>{8 - incorrect.length}</div>
      <div>{formatIncorrect}</div>
      <input type='text' onKeyUp={onKeyEntered} value={inputValue} />
      <button onClick={onClickPlay}>New Game</button>
    </div>
  );
}

export default Game;
