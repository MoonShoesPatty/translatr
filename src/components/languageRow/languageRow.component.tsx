import './languageRow.component.css'
import LangDropdown from "../langDropdown/langDropdown.component";
import { Row } from '../../models';
import { MouseEvent } from 'react';
import { Button, Loader } from '@mantine/core';

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
      return (<Button
        key={actionButton.action}
        value={actionButton.action}
        title={actionButton.tooltip}
        onClick={handleActionButtonClick}
        variant="subtle">
        {actionButton.label}
      </Button>);
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

  const buildText = () => {
    if (row.text != '') {
      return (
        <p>
          {row.text}
        </p>
      )
    } else {
      return (
        <Loader type="dots" />
      )
    }
  }

  return (
    <div className='rowContainer'>
      <LangDropdown setLanguage={handleLanguageUpdate} defaultLanguage={row.language} />
      <div className="textContainer">
        {buildText()}
      </div>
      <div className="actions">
        {buildButtons()}
      </div>
    </div>
  )
}

export default LanguageRow;