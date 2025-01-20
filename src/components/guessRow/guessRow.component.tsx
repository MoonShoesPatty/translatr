
import './guessRow.component.css';
import { Clue } from '@models/index';

interface Props {
    item: Clue
}

function GuessRow({ item }: Props) {
  return (
    <div className='guessRowContainer'>
        {item.displayText}
        <div className="languageLabel">
            {item.lang.label.toLocaleUpperCase()}
        </div>
    </div>
  )
}

export default GuessRow;
