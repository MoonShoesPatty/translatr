import { FormEvent } from 'react';
import { GameRow } from '../../components/features/game/GameRow/GameRow';
import { GuessRow } from '../../components/features/game/GuessRow/GuessRow';
import { Button } from '../../components/ui/Button/Button';
import { Input } from '../../components/ui/Input/Input';
import { useGameState } from '../../hooks/useGameState';
import type { Game, Clue } from '../../types';
import './Game.css';

const sourceGame = {
  category: 'General',
  rows: [
    {
      displayText: 'Phrase #1',
      lang: {
        code: 'l1',
        label: 'Language 01'
      }
    },
    {
      displayText: 'Phrase #2',
      lang: {
        code: 'l2',
        label: 'Language 02'
      }
    },
    {
      displayText: 'Phrase #3',
      lang: {
        code: 'l3',
        label: 'Language 03'
      }
    },
    {
      displayText: 'Phrase #4',
      lang: {
        code: 'l4',
        label: 'Language 04'
      }
    },
    {
      displayText: 'Phrase #5',
      lang: {
        code: 'l5',
        label: 'Language 05'
      }
    },
    {
      displayText: 'Phrase #6',
      lang: {
        code: 'l6',
        label: 'Language 06'
      }
    }
  ]
}

function Game() {
  const { game, gameState } = useGameState(sourceGame);

  const buildClueRows = (items: Clue[]) => {
    return items.slice(0, gameState.displayIndex).map((item, index) => {
      return (<GameRow key={index} item={item} />)
    });
  }

  const buildGuessRows = (items: Clue[]) => {
    return items.slice(gameState.displayIndex).map((item, index) => {
      return (<GuessRow key={index} item={item} />)
    });
  }

  const buildGuesses = () => {
    return (
      <ul className='guessContainer'>
        {game.rows.map((_item: Clue, index: number) => {
          return (<li key={index}>O</li>)
        })}
      </ul>
    )
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(e);
    return;
  }

  return (
    <div className="game">
      <h1>Translatr</h1>
      <p><b>Category: </b>{game.category}</p>
      <div className="contentContainer">
        <div className='rowsContainer'>
          {buildClueRows(game.rows)}
        </div>
        <form className='inputForm' onSubmit={handleSubmit}>
          <div className="inputContainer">
            <Input
              label="Origin Phrase"
              type='text'
              placeholder="Enter your guess"
            />
            <Button type="submit">Guess</Button>
          </div>
          <div className="guessTracker">
            <p><b>Guesses</b></p>
            {buildGuesses()}
          </div>
        </form>
        <div className='guessesContainer'>
          <p><b>Previous</b></p>
          {buildGuessRows(game.rows)}
        </div>
      </div>
    </div>
  )
}

export default Game;
