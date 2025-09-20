import type { TranslationParams, TranslationResult } from '../types';
import { TranslationAPI } from './api';

export class TranslationService {
  /**
   * Translates text through a chain of languages using Google Translate API
   * @param params - Translation parameters including source language, text, and target rows
   * @returns Promise with translated rows and final text
   */
  static async doTranslation(params: TranslationParams): Promise<TranslationResult> {
    const { sourceLang, queryText, rows } = params;
    let currentSourceLang = sourceLang;
    let currentQueryText = queryText;
    const translatedRows = [...rows];

    for (let i = 0; i < translatedRows.length; i++) {
      const destLang = translatedRows[i].language;
      
      try {
        const translatedText = await TranslationAPI.translateText(currentQueryText, currentSourceLang, destLang);
        translatedRows[i].text = translatedText;

        // Update for next iteration
        currentSourceLang = translatedRows[i].language;
        currentQueryText = translatedRows[i].text;
      } catch (error) {
        console.error(`Translation failed for row ${i}:`, error);
        translatedRows[i].text = `Translation failed: ${currentQueryText}`;
      }
    }

    return {
      translatedRows,
      finalText: currentQueryText
    };
  }
}