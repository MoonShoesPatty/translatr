import './App.css';
import LanguageRow from './components/languageRow/languageRow.component';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Row } from './models';
import LangDropdown from './components/langDropdown/langDropdown.component';

function App() {
  const [rows, setRows] = useState([] as Row[]);
  const [initialLang, setInitialLang] = useState('en');
  const [inputText, setInputText] = useState('');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch ((e.target as HTMLButtonElement).value) {
      case 'translate':
        doTranslation();
        break;
      case 'addRow':
        addRow();
        break;
      default:
        console.error('Oops! No action there, chief');
        break;
    }
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

  const doTranslation = async (): Promise<string> => {
    let sourceLang = initialLang;
    let queryText = inputText;
    for (let i = 0; i < rows.length; i++) {
      const destLang = rows[i].language;
      const reqUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${destLang}&dt=t&q=${queryText}`;
      const response = await fetch(reqUrl);
      const result = await response.json();
      rows[i].text = result[0][0][0] as string;

      // FOR NEXT ITERATION
      sourceLang = rows[i].language;
      queryText = rows[i].text;

      setRows([...rows]);
    }

    return new Promise((resolve) => resolve(''));
  }

  const handleQueryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setInputText((e.target as HTMLTextAreaElement).value)
  }


  return (
    <>
      <h1>Translatr</h1>

      <div className='translateRow'>
        <LangDropdown setLanguage={(lang: string) => { setInitialLang(lang) }} />
        <textarea
          className='textInput'
          name="textIn"
          rows={5}
          placeholder='Translate something!'
          onChange={handleQueryChange}
        ></textarea>
      </div>

      <div className="rowsContainer">
        {buildRows()}
      </div>

      <div className="buttonsContainer">
        <button onClick={handleClick} value='translate'>
          Translate
        </button>
        <button onClick={handleClick} value='addRow'>
          Add row
        </button>
      </div>
    </>
  )
}

export default App;


class RowClass implements Row {
  public id = uuidv4();
  public language: string = 'en';
  public text: string = '';
}