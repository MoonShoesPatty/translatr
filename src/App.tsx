// import { useState } from 'react'
import './App.css'
import Translator from './components/translator/translator.component';
import LanguageRow from './components/languageRow/languageRow.component';
import { FormEvent, MouseEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Row } from './models';
import LangDropdown from './components/langDropdown/langDropdown.component';

function App() {
  const [rows, setRows] = useState([] as Row[]);
  const [initialLang, setInitialLang] = useState('en');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(e);
    addRow();
    console.log(rows);
  }

  const addRow = () => {
    const newRow = new RowClass();
    setRows([...rows, newRow]);
  }

  const buildRows = () => {
    return rows.map((row) => {
      return (
        <LanguageRow key={row.id} row={row} />
      );
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const inputText = new FormData(form).get('textIn') as string;

    doTranslation(inputText);

    // console.log(`Final out: ${t3}`);
  }

  const doTranslation = async (queryText: string): Promise<string> => {
    let sourceLang = initialLang;
    for (let i = 0; i < rows.length; i++) {
      // const row = rows[i];
      const destLang = rows[i].language;
      console.log(`======================`);
      console.log(`Translate from ${sourceLang} to ${destLang}`);
      console.log(`Translate: ${queryText}`);
      const reqUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${destLang}&dt=t&q=${queryText}`;
      const response = await fetch(reqUrl);
      const result = await response.json();
      rows[i].text = result[0][0][0] as string;

      // FOR NEXT ITERATION
      sourceLang = rows[i].language;
      queryText = rows[i].text;

      setRows([...rows]);
    }

    // console.log(`${sourceLang.toLocaleUpperCase()}: ${t01[0][0][1]}`);
    // console.log(`${destLang.toLocaleUpperCase()}: ${t01[0][0][0]}`);

    return new Promise((resolve) => resolve(''));
  }


  return (
    <>
      <h1>Translatr</h1>

      <form className='translateForm' onSubmit={handleSubmit}>
        <LangDropdown setLanguage={(lang: string) => { setInitialLang(lang) }} />
        <textarea name="textIn"></textarea>
        <button type="submit">Translate</button>
      </form>
      <div className="rowsContainer">
        {buildRows()}
      </div>
      <button onClick={handleClick} value='addRow'>
        Add row
      </button>
    </>
  )
}

export default App;


class RowClass implements Row {
  public id = uuidv4();
  public language: string = 'en';
  public text: string = '';
}