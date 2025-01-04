import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import languages from './languages.json';
import { Row } from '../../models';

interface Props {
  setLanguage: any
}

function LangDropdown({setLanguage}: Props) {
  const buildRows = () => {
    console.log('============');
    console.log('buildin\' them fuckin\' rows!');
    return languages.map((lang) => {
      return (<option key={lang.code} value={lang.code}>{lang.label}</option>)
    });
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    console.log(e)
    setLanguage('beansecks');
    // setLanguage('')
  }

  return (
    <>
      <select name="languageInput" onChange={handleChange}>
        {buildRows()}
      </select>
    </>
  )
}

export default LangDropdown;
