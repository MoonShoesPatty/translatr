import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { TranslationRow } from '../../components/features/translator/TranslationRow/TranslationRow';
import { LanguageSelector } from '../../components/forms/LanguageSelector/LanguageSelector';
import { Button } from '../../components/ui/Button/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { Row } from '../../utils/Row';
import { getRandomLanguage } from '../../constants/languages';
import { DEFAULT_LANGUAGE } from '../../constants/api';
import './Translator.css';

function Translator() {
  const [inputLang, setInputLang] = useState(DEFAULT_LANGUAGE);
  const [inputText, setInputText] = useState('Terrible translation, at your fingertips!');
  
  const {
    rows,
    isTranslating,
    error,
    translate,
    addRow,
    removeRow,
    updateRow
  } = useTranslation(ROWS_DEFAULT);

  // Remove automatic translation on mount to prevent infinite loop
  // Translation will happen on button click or when user types

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch ((e.target as HTMLButtonElement).value) {
      case 'translate':
        translate({ sourceLang: inputLang, queryText: inputText });
        break;
      case 'addRow':
        addRow(new Row(getRandomLanguage()), rows.length - 1);
        break;
      default:
        console.error('Oops! No action there, chief');
        break;
    }
  }

  const handleQueryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setInputText((e.target as HTMLTextAreaElement).value);
  }

  const handleLanguageChange = (id: string, language: string) => {
    updateRow(id, { language });
    // Trigger translation when language changes
    translate({ sourceLang: inputLang, queryText: inputText });
  }

  return (
    <div className="translator">
      <h1>Translatr</h1>

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      <div className='translateRow'>
        <LanguageSelector
          value={inputLang}
          onChange={setInputLang}
          label="Source Language"
        />
        <textarea
          className='textInput'
          name="textIn"
          rows={5}
          placeholder='Translate something!'
          onChange={handleQueryChange}
          value={inputText}
        />
      </div>

      <div className="rowsContainer">
        {rows.map((row) => (
          <TranslationRow
            key={row.id}
            row={row}
            onRemove={removeRow}
            onLanguageChange={handleLanguageChange}
            onTranslate={() => {}} // Remove automatic translation trigger
          />
        ))}
      </div>

      <div className="buttonsContainer">
        <Button
          onClick={handleClick}
          value='translate'
          disabled={isTranslating}
        >
          {isTranslating ? 'Translating...' : 'Translate'}
        </Button>
        <Button
          onClick={handleClick}
          value='addRow'
          variant="secondary"
        >
          Add Row
        </Button>
      </div>
    </div>
  )
}

const ROWS_DEFAULT: Row[] = [
  new Row(getRandomLanguage()),
  new Row(getRandomLanguage()),
  new Row(getRandomLanguage()),
  new Row(getRandomLanguage()),
  new Row()
];

export default Translator;