import { useState, useCallback } from 'react';
import type { Game, GameState, Clue } from '../types';

export const useGameState = (initialGame: Game) => {
  const [game, setGame] = useState<Game>(initialGame);
  const [gameState, setGameState] = useState<GameState>({
    displayIndex: 3
  });

  const updateGame = useCallback((updates: Partial<Game>) => {
    setGame(prevGame => ({ ...prevGame, ...updates }));
  }, []);

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prevState => ({ ...prevState, ...updates }));
  }, []);

  const addClue = useCallback((clue: Clue) => {
    setGame(prevGame => ({
      ...prevGame,
      rows: [...prevGame.rows, clue]
    }));
  }, []);

  const removeClue = useCallback((index: number) => {
    setGame(prevGame => ({
      ...prevGame,
      rows: prevGame.rows.filter((_, i) => i !== index)
    }));
  }, []);

  const revealNextClue = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      displayIndex: Math.min(prevState.displayIndex + 1, game.rows.length)
    }));
  }, [game.rows.length]);

  return {
    game,
    gameState,
    updateGame,
    updateGameState,
    addClue,
    removeClue,
    revealNextClue
  };
};
