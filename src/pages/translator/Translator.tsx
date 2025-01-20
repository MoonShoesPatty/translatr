import './Translator.css';
import LanguageRow from '@components/languageRow/languageRow.component';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Row } from '@models/index';
import LangDropdown from '@components/langDropdown/langDropdown.component';
import { getRandomLang } from '@services/language.service'

function Translator() {
  const [rows, setRows] = useState(ROWS_DEFAULT);
  const [inputLang, setInputLang] = useState('en');
  const [inputText, setInputText] = useState('Terrible translation, at your fingertips!');

  useEffect(() => {
    doTranslation();
  }, rows);

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
    // Put the new row in the second last spot to keep whatever
    // destination language the user has picked intact
    const newRows = [
      ...rows.slice(0, rows.length - 1),
      new RowClass(getRandomLang()),
      rows[rows.length - 1]
    ];
    setRows(newRows);
  }

  const buildRows = () => {
    return rows.map((row) => {
      return (
        <LanguageRow
          key={row.id}
          row={row}
          handleRemove={handleRowRemove}
          updateCallback={doTranslation} />
      );
    })
  }

  const doTranslation = async (): Promise<string> => {
    let sourceLang = inputLang;
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

  const handleRowRemove = (id: string) => {
    const newRows = rows.filter(row => {
      return row.id != id;
    });

    setRows(newRows);
  }

  return (
    <>
      <h1>Translatr</h1>

      <div className='translateRow'>
        <LangDropdown setLanguage={(lang: string) => { setInputLang(lang) }} />
        <textarea
          className='textInput'
          name="textIn"
          rows={5}
          placeholder='Translate something!'
          onChange={handleQueryChange}
          value={inputText}
          onBlur={doTranslation}
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

export default Translator;

class RowClass implements Row {
  public id = uuidv4();
  public language: string = 'en';
  public text: string = '';

  constructor(defaultLang?: string) {
    this.language = defaultLang || 'en';
  }
}

const ROWS_DEFAULT: Row[] = [
  new RowClass(getRandomLang()),
  new RowClass(getRandomLang()),
  new RowClass(getRandomLang()),
  new RowClass(getRandomLang()),
  new RowClass()
];