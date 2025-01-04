import './languageRow.component.css'
import LangDropdown from "../langDropdown/langDropdown.component";
import { Row } from '../../models';

interface Props {
  row: Row
}

function LanguageRow({ row }: Props) {
  const handleLanguageUpdate = (lang: string) => {
    row.language = lang;
  }

  return (
    <div className='rowContainer'>
      <LangDropdown setLanguage={handleLanguageUpdate} />
      <p className='textContainer'>
        {row.text}
      </p>
    </div>
  )
}

export default LanguageRow;