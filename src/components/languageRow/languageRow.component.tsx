import './languageRow.component.css'
import LangDropdown from "../langDropdown/langDropdown.component";
import { Row } from '../../models';
import { MouseEvent } from 'react';

interface Props {
  row: Row;
  handleRemove: (id: string) => void;
  updateCallback: () => void;
}

interface ActionButton {
  action: string;
  label: string;
  tooltip?: string;
}

function LanguageRow({ row, handleRemove, updateCallback }: Props) {
  const handleLanguageUpdate = (lang: string) => {
    row.language = lang;
    updateCallback();
  }

  const buildButtons = () => {
    const buttons: ActionButton[] = [
      { label: 'X', action: 'remove', tooltip: 'Remove row' }
    ];
    return buttons.map((actionButton) => {
      return (<button value={actionButton.action} title={actionButton.tooltip} onClick={handleActionButtonClick}>
        {actionButton.label}
      </button>);
    });
  }

  const handleActionButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch ((e.target as HTMLButtonElement).value) {
      case 'remove':
        handleRemove(row.id);
        break;
      default:
        console.error('Oops! No action there, chief');
        break;
    }
  }

  return (
    <div className='rowContainer'>
      <LangDropdown setLanguage={handleLanguageUpdate} defaultLanguage={row.language} />
      <p className='textContainer'>
        {row.text}
      </p>
      <div className="actions">
        {buildButtons()}
      </div>
    </div>
  )
}

export default LanguageRow;