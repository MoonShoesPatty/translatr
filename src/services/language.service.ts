import languages from '../assets/languages.json';

export const getRandomLang = () => {
    const index = Math.floor(Math.random() * languages.length);
    return languages[index].code;

}