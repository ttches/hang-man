import React from 'react';

const Game = ({onClickPlay, onKeyEntered, inputValue, guessed}) => {
  return (
    <div className='game-container'>
      <div>{guessed}</div>
      <input type='text' onKeyUp={onKeyEntered} value={inputValue} />
      <button onClick={onClickPlay}>New Game</button>
    </div>
  );
}

export default Game;
