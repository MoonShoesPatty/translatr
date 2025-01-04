// import { useState } from 'react'
import './App.css'
import Translator from './components/translator/translator.component';
import LanguageRow from './components/languageRow/languageRow.component';
import { MouseEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Row } from './models';

function App() {
  const [rows, setRows] = useState([] as Row[]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(e);
    addRow();
    console.log(rows);
  }

  const addRow = () => {
    // const [language, setLanguage] = useState('');
    const newRow = {
      id: uuidv4(),
      language: ''
    } as Row
    setRows([...rows, newRow]);
  }

  const buildRows = () => {
    return rows.map((row) => {
      return (
        <LanguageRow key={row.id} row={row} />
      );
    })
  }

  return (
    <>
      <h1>Translatr</h1>
      <Translator />
      <div className="rowsContainer">
        {buildRows()}
      </div>
      <button onClick={handleClick} value='addRow'>
        Add row
      </button>
    </>
  )
}

export default App
