
import './langDropdown.component.css';
import languages from '../../assets/languages.json';
import { Select } from '@mantine/core';

interface Props {
  setLanguage: (lang: string) => void;
  defaultLanguage?: string;
  disabled?: boolean;
}

function LangDropdown({ setLanguage, defaultLanguage = 'en', disabled = false }: Props) {
  const handleChange = (value: string | null) => {
    setLanguage(String(value));
  }

  return (
    <Select disabled={disabled} onChange={handleChange} value={defaultLanguage} data={languages} />
  )
}

export default LangDropdown;
