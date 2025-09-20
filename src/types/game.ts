import { Language } from './common';

export interface Clue {
  lang: Language;
  displayText: string;
  [s: string]: any;
}

export interface Game {
  rows: Clue[];
  category: string;
  [s: string]: any;
}

export interface GameState {
  displayIndex: number;
}
