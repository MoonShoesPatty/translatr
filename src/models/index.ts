export interface Row {
    id: string;
    language: string;
    setLanguage?: (lang: string) => void;
    text: string;
}