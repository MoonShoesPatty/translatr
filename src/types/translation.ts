import { Language } from './common';

export interface Row {
  id: string;
  language: string;
  setLanguage?: (lang: string) => void;
  text: string;
}

export interface TranslationParams {
  sourceLang: string;
  queryText: string;
  rows: Row[];
}

export interface TranslationResult {
  translatedRows: Row[];
  finalText: string;
}
