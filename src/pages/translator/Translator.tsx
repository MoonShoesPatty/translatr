import './Translator.css';
import LanguageRow from '@components/languageRow/languageRow.component';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Row } from '@models/index';
import LangDropdown from '@components/langDropdown/langDropdown.component';
import { getRandomLang, getRandomSeedPhrase } from '@services/language.service';
import { translate } from '@services/translate.service';
import { Button, Textarea } from '@mantine/core';

import { FaDice } from 'react-icons/fa';
import { IoMdSend, IoMdAddCircle } from "react-icons/io";

function Translator() {
  const [rows, setRows] = useState(ROWS_DEFAULT);
  const [inputLang, setInputLang] = useState('en');
  const [inputText, setInputText] = useState('Terrible translation, at your fingertips!');
  const translationIdRef = useRef(0);

  useEffect(() => {
    startTranslation();
  }, []);

  const startTranslation = async (phrase?: string, workingRows?: Row[]): Promise<void> => {
    const currentTranslationId = ++translationIdRef.current;

    if (workingRows == null) {
      workingRows = [...rows];
    }

    const clearedRows = workingRows.map(row => ({ ...row, text: '' }));
    setRows(clearedRows);

    const sourceLang = inputLang;
    const initialText = phrase || inputText;

    translateStep(currentTranslationId, 0, sourceLang, initialText, clearedRows);
  };

  const translateStep = async (
    translationId: number,
    index: number,
    sourceLang: string,
    queryText: string,
    workingRows: Row[]
  ): Promise<void> => {
    if (translationIdRef.current !== translationId) {
      console.log(`Translation interrupted at index ${index}`);
      return;
    }

    const currentRows = [...workingRows];
    if (index >= currentRows.length) {
      return;
    }

    const destLang = currentRows[index].language;
    const translatedText = await translate(sourceLang, destLang, queryText);

    if (translationIdRef.current !== translationId) {
      console.log(`Translation interrupted after async at index ${index}`);
      return;
    }

    currentRows[index] = {
      ...currentRows[index],
      text: translatedText,
    };

    setRows(currentRows);
    translateStep(translationId, index + 1, destLang, translatedText, currentRows);
  };

  const addRow = (_: MouseEvent<HTMLButtonElement>) => {
    if (rows.length > 25) {
      console.error('Chill, 25 is plenty.');
      return;
    }

    const newRows = [
      ...rows.slice(0, rows.length - 1),
      new RowClass(getRandomLang()),
      rows[rows.length - 1]
    ];

    setRows(newRows);
    startTranslation(undefined, newRows);
  }

  const handleRowRemove = (id: string) => {
    const newRows = rows.filter(row => row.id !== id);
    setRows(newRows);
    startTranslation(undefined, newRows);
  }

  const buildRows = (workingRows: any[], removable: boolean = true) => {
    return workingRows.map((row) => (
      <LanguageRow
        key={row.id}
        row={row}
        handleRemove={handleRowRemove}
        updateCallback={startTranslation}
        removable={removable}
      />
    ));
  }

  const handleQueryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
  }

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      startTranslation();
    }
  };

  const handleTranslateClick = (_: MouseEvent<HTMLButtonElement>) => {
    startTranslation();
  }

  const getSeedPhrase = (_: MouseEvent<HTMLButtonElement>) => {
    let newPhrase = null;
    do {
      newPhrase = getRandomSeedPhrase();
    } while (newPhrase == inputText);
    setInputText(newPhrase);
    startTranslation(newPhrase);
  }

  return (
    <div className='pageContainer'>
      <div className="titleSection">
        <h1>Translatr</h1>
        <p>
          Translate a phrase through many languages, see what comes out the other side!
        </p>
      </div>

      <main className="contentWrapper">
        <div className='seedPhraseRow cardElement'>
          <div className='leftSection'>
            <h3>Language</h3>
            <LangDropdown setLanguage={(lang: string) => { setInputLang(lang) }} defaultLanguage={inputLang} />
          </div>
          <div className='rightSection'>
            <h3>Seed Phrase</h3>
            <Textarea
              className='textInput'
              name="textIn"
              rows={5}
              placeholder='Translate something!'
              onChange={handleQueryChange}
              onKeyDown={handleTextareaKeyDown}
              value={inputText}
            />
            <div className='buttonsWrapper'>
              <Button onClick={getSeedPhrase} variant="light" rightSection={<FaDice size='1.5em' />}>
                Random Phrase
              </Button>
              <Button onClick={handleTranslateClick} variant="light" rightSection={<IoMdSend size='1.5em' />}>
                Translate
              </Button>
            </div>
          </div>
        </div>

        <div className="rowsContainer cardElement">
          {buildRows(rows.slice(0, -1))}
        </div>

        <div className="addRowContainer">
          <Button onClick={addRow} value='addRow' variant="light" rightSection={<IoMdAddCircle size='1.5em' />}>
            Add row
          </Button>
        </div>

        <div className="resultContainer cardElement">
          {buildRows([rows[rows.length - 1]], false)}
        </div>

      </main>
      <footer className="creditContainer">
        <p>
          Pat Johnston, 2025
        </p>
      </footer>
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