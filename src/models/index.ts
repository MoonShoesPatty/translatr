export interface Row {
    id: string;
    language: string;
    setLanguage?: (lang: string) => void;
    text: string;
}

export interface Language {
    code: string;
    label: string;
}

export interface Clue {
    lang: Language;
    displayText: string;

    [s: string]: any;
}

export interface Game {
    rows: Clue[];

    [s: string]: any;
}