/**
 * Domain Types - Word and Translation entities
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
    language: string;
    translation: string;
    created_at: string;
    updated_at: string;
}

export interface WordWithTranslations extends Word {
    translations: Translation[];
}
