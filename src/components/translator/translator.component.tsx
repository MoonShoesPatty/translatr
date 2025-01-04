import { FormEvent } from "react";

function Translator() {
  const translate = async (sourceLang: string, destLang: string, queryText: string): Promise<string> => {
    console.log(`======================`);
    console.log(`Translate: ${queryText}`);
    const reqUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${destLang}&dt=t&q=${queryText}`;
    const res01 = await fetch(reqUrl);
    const t01 = await res01.json();

    console.log(`${sourceLang.toLocaleUpperCase()}: ${t01[0][0][1]}`);
    console.log(`${destLang.toLocaleUpperCase()}: ${t01[0][0][0]}`);

    return new Promise((resolve) => resolve(t01[0][0][0]));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const inputText = new FormData(form).get('textIn') as string;
    // return '';

    const lang01 = 'en';
    const lang02 = 'mad';
    const lang03 = 'de';
    // const destLang = 'en';

    const t1 = await translate(lang01, lang02, inputText);
    const t2 = await translate(lang02, lang03, t1);
    const t3 = await translate(lang03, lang01, t2);

    console.log(`Final out: ${t3}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="textIn" />
      <button type="submit">Translate</button>
    </form>
  )
}

export default Translator;
