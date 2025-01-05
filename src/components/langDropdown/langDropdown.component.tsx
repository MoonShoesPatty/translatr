
import './langDropdown.component.css';
import { ChangeEvent } from 'react';
import languages from '../../assets/languages.json';

interface Props {
  setLanguage: (lang: string) => void;
  defaultLanguage?: string;
}

function LangDropdown({ setLanguage, defaultLanguage = 'en' }: Props) {
  const buildRows = () => {
    return languages.map((lang) => {
      return (<option key={lang.code} value={lang.code}>{lang.label}</option>)
    });
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setLanguage(e.target.value);
  }

  return (
    <>
      <select name="languageInput" onChange={handleChange} defaultValue={defaultLanguage}>
        {buildRows()}
      </select>
    </>
  )
}

export default LangDropdown;
