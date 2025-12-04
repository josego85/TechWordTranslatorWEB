/**
 * Domain Types - Word and Translation entities
 *
 * These types match the API response structure from the backend
 * after the database normalization refactor.
 */

export interface Word {
  id: number;
  word: string;
  created_at: string;
  updated_at: string;
}

export interface Translation {
  id: number;
  word_id: number;
  language: string; // ISO 639-1 code (en, es, de, fr, etc)
  translation: string;
  created_at: string;
  updated_at: string;
}

export interface WordWithTranslations extends Word {
  translations: Translation[];
}

/**
 * Type guard to check if a word has translations
 */
export function hasTranslations(word: Word): word is WordWithTranslations {
  return 'translations' in word && Array.isArray((word as WordWithTranslations).translations);
}

/**
 * Helper to get translation for a specific language
 */
export function getTranslationByLanguage(
  word: WordWithTranslations,
  language: string
): Translation | undefined {
  return word.translations.find((t) => t.language === language);
}
