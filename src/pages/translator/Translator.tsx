import './Translator.css';
import LanguageRow from '@components/languageRow/languageRow.component';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Row } from '@models/index';
import LangDropdown from '@components/langDropdown/langDropdown.component';
import { getRandomLang, getRandomSeedPhrase } from '@services/language.service'
import { Button, Textarea } from '@mantine/core';

function Translator() {
  const [rows, setRows] = useState(ROWS_DEFAULT);
  const [inputLang, setInputLang] = useState('en');
  const [inputText, setInputText] = useState('Terrible translation, at your fingertips!');

  useEffect(() => {
    doTranslation();
  }, rows);

  const addRow = (_: MouseEvent<HTMLButtonElement>) => {
    // Put the new row in the second last spot to keep whatever
    // destination language the user has picked intact
    const newRows = [
      ...rows.slice(0, rows.length - 1),
      new RowClass(getRandomLang()),
      rows[rows.length - 1]
    ];
    setRows(newRows);
  }

  const handleTranslateClick = (_: MouseEvent<HTMLButtonElement>) => {
    doTranslation();
  }

  const getSeedPhrase = (_: MouseEvent<HTMLButtonElement>) => {
    const newPhrase = getRandomSeedPhrase();
    setInputText(newPhrase);
    doTranslation(newPhrase);
  }

  const buildRows = (workingRows: any[]) => {
    return workingRows.map((row) => {
      return (
        <LanguageRow
          key={row.id}
          row={row}
          handleRemove={handleRowRemove}
          updateCallback={doTranslation} />
      );
    })
  }

  const handleSeedPhraseBlur = () => {
    doTranslation();
  }

  const clearRows = () => {
    // console.log('CLEAR');
    const workingRows: Row[] = [];
    for (let row of rows) {
      const newRow = {
        ...row,
        text: ''
      }

      workingRows.push(newRow);
    }

    setRows(workingRows)
  }

  const doTranslation = async (phrase?: string): Promise<string> => {
    // clearRows();
    let sourceLang = inputLang;
    let queryText = phrase || inputText;
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
    <div className='pageContainer'>
      <h1>Translatr</h1>
      <p>
        Translate a phrase through many languages, and see what silly thing comes out the other side!
      </p>

      <main className="contentWrapper">
        <div className='seedPhraseRow cardElement'>
          <div className='leftSection'>
            <h3>Origin Language</h3>
            <LangDropdown setLanguage={(lang: string) => { setInputLang(lang) }} />
          </div>
          <div className='rightSection'>
            <h3>Seed Phrase</h3>
            <Textarea
              className='textInput'
              name="textIn"
              rows={5}
              placeholder='Translate something!'
              onChange={handleQueryChange}
              value={inputText}
              onBlur={handleSeedPhraseBlur}
            ></Textarea>
            <div className='buttonsWrapper'>
              <Button onClick={getSeedPhrase} variant="light">
                Random Seed Phrase
              </Button>
              <Button onClick={handleTranslateClick} variant="light">
                Translate
              </Button>
            </div>
          </div>
        </div>

        <div className="rowsContainer cardElement">
          {buildRows(rows.slice(0, -1))}
        </div>

        <div className="resultContainer cardElement">
          {buildRows([rows[rows.length - 1]])}
        </div>

        <div className="buttonsContainer">
          <Button onClick={addRow} value='addRow' variant="light">
            Add row
          </Button>
        </div>
      </main>
    </div>
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