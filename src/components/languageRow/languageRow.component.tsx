import './languageRow.component.css'
import LangDropdown from "../langDropdown/langDropdown.component";
import { Row } from '../../models';
import { Button, Loader } from '@mantine/core';
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
  row: Row;
  handleRemove: (id: string) => void;
  updateCallback: () => void;
}

interface ActionButton {
  action: string;
  tooltip?: string;
}

function LanguageRow({ row, handleRemove, updateCallback }: Props) {
  const handleLanguageUpdate = (lang: string) => {
    row.language = lang;
    updateCallback();
  }

  const buildButtons = () => {
    const buttons: ActionButton[] = [
      { action: 'remove', tooltip: 'Remove row' }
    ];
    return buttons.map((actionButton) => {
      return (<Button
        className='removeRowButton'
        key={actionButton.action}
        title={actionButton.tooltip}
        onClick={() => { handleRemove(row.id) }}
        variant="transparent">
        <IoMdCloseCircle size='1.5em' />
      </Button>);
    });
  }

  const buildText = () => {
    if (row.text != '') {
      return (
        <div className="contentContainer">
          <p>
            {row.text}
          </p>
        </div>
      )
    } else {
      return (
        <div className="contentContainer">
          <Loader type="dots" />
        </div>
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