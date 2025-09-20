import { API_ENDPOINTS } from '../../constants/api';

export class TranslationAPI {
  private static readonly API_URL = API_ENDPOINTS.GOOGLE_TRANSLATE;

  /**
   * Translates a single text from source language to target language
   * @param text - Text to translate
   * @param sourceLang - Source language code
   * @param targetLang - Target language code
   * @returns Promise with translated text
   */
  static async translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
    const reqUrl = `${this.API_URL}&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(reqUrl);
    
    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (!result || !result[0] || !result[0][0] || !result[0][0][0]) {
      throw new Error('Invalid translation response format');
    }
    
    return result[0][0][0] as string;
  }
}
