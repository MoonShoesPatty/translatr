import languages from '../assets/languages.json';
import seedPhrases from '../assets/seedPhrases.json';

export const getRandomLang = () => {
    const index = Math.floor(Math.random() * languages.length);
    return languages[index].value;
}

export const getRandomSeedPhrase = () => {
    const index = Math.floor(Math.random() * seedPhrases.length);
    console.log(seedPhrases[index])
    return seedPhrases[index];
}