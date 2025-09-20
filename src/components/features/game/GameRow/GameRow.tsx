import React from 'react';
import type { Clue } from '../../../../types';
import './GameRow.css';

interface GameRowProps {
  item: Clue;
}

export const GameRow: React.FC<GameRowProps> = ({ item }) => {
  return (
    <div className="game-row">
      <div className="game-row__text">
        {item.displayText}
      </div>
      <div className="game-row__language">
        {item.lang.label.toUpperCase()}
      </div>
    </div>
  );
};

export default GameRow;
