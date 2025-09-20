import React from 'react';
import type { Clue } from '../../../../types';
import './GuessRow.css';

interface GuessRowProps {
  item: Clue;
}

export const GuessRow: React.FC<GuessRowProps> = ({ item }) => {
  return (
    <div className="guess-row">
      <div className="guess-row__text">
        {item.displayText}
      </div>
      <div className="guess-row__language">
        {item.lang.label.toUpperCase()}
      </div>
    </div>
  );
};

export default GuessRow;
