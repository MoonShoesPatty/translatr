import './languageRow.component.css'
import LangDropdown from "../langDropdown/langDropdown.component";
import { Row } from '../../models';

interface Props {
  row: Row
}

function LanguageRow({row}: Props) {
  let _language = '';
  const setLanguage = (lang: string) => {
    _language = lang;
  }

  return (
      <div className='rowContainer'>
        {row.language}
        <LangDropdown setLanguage={setLanguage}/>
      </div>
  )
}

export default LanguageRow;