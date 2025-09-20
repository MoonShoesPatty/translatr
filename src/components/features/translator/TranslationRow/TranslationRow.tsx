import React from 'react';
import { LanguageSelector } from '../../../forms/LanguageSelector/LanguageSelector';
import { Button } from '../../../ui/Button/Button';
import type { Row } from '../../../../types';
import './TranslationRow.css';

interface TranslationRowProps {
  row: Row;
  onRemove: (id: string) => void;
  onLanguageChange: (id: string, language: string) => void;
  onTranslate: () => void;
}

export const TranslationRow: React.FC<TranslationRowProps> = ({
  row,
  onRemove,
  onLanguageChange,
  onTranslate
}) => {
  const handleLanguageChange = (language: string) => {
    onLanguageChange(row.id, language);
    onTranslate();
  };

  return (
    <div className="translation-row">
      <LanguageSelector
        value={row.language}
        onChange={handleLanguageChange}
        label=""
        placeholder="Select language"
      />
      <div className="translation-row__text">
        {row.text || 'Translation will appear here...'}
      </div>
      <div className="translation-row__actions">
        <Button
          variant="danger"
          size="small"
          onClick={() => onRemove(row.id)}
          title="Remove row"
        >
          ×
        </Button>
      </div>
    </div>
  );
};

export default TranslationRow;
