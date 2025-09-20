import React from 'react';
import { Select } from '../../ui/Select/Select';
import { LANGUAGES } from '../../../constants/languages';
import type { Language } from '../../../types';

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  label = 'Language',
  placeholder = 'Select a language',
  error,
  helperText,
  disabled = false
}) => {
  const options = LANGUAGES.map((lang: Language) => ({
    value: lang.code,
    label: lang.label
  }));

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      label={label}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      disabled={disabled}
    />
  );
};

export default LanguageSelector;
