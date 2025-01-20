
import './gameRow.component.css';
import { Clue } from '@models/index';

interface Props {
    item: Clue
}

function GameRow({ item }: Props) {
  return (
    <div className='gameRowContainer'>
        {item.displayText}
        <div className="languageLabel">
            {item.lang.label.toLocaleUpperCase()}
        </div>
    </div>
  )
}

export default GameRow;
