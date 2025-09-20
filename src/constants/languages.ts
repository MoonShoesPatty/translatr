import languagesData from '../assets/languages.json';
import { Language } from '../types/common';

export const LANGUAGES: Language[] = languagesData;

export const getRandomLanguage = (): string => {
  const index = Math.floor(Math.random() * LANGUAGES.length);
  return LANGUAGES[index].code;
};

export const getLanguageByCode = (code: string): Language | undefined => {
  return LANGUAGES.find(lang => lang.code === code);
};
