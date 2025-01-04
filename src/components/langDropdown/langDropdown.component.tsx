
import './langDropdown.component.css';
import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import languages from './languages.json';

interface Props {
  setLanguage: (lang:string) => void
}

function LangDropdown({setLanguage}: Props) {
  const buildRows = () => {
    return languages.map((lang) => {
      return (<option key={lang.code} value={lang.code}>{lang.label}</option>)
    });
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    console.log('change places!');
    setLanguage(e.target.value);
  }

  return (
    <>
      <select name="languageInput" onChange={handleChange} defaultValue='en'>
        {buildRows()}
      </select>
    </>
  )
}

export default LangDropdown;
