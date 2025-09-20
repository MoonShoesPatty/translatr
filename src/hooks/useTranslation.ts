import { useState, useCallback } from 'react';
import { TranslationService } from '../services/translate.service';
import type { Row, TranslationParams } from '../types';

export const useTranslation = (initialRows: Row[]) => {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translate = useCallback(async (params: Omit<TranslationParams, 'rows'>) => {
    setIsTranslating(true);
    setError(null);
    
    try {
      const result = await TranslationService.doTranslation({
        ...params,
        rows
      });
      
      setRows(result.translatedRows);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsTranslating(false);
    }
  }, [rows]);

  const updateRow = useCallback((id: string, updates: Partial<Row>) => {
    setRows(prevRows => 
      prevRows.map(row => 
        row.id === id ? { ...row, ...updates } : row
      )
    );
  }, []);

  const addRow = useCallback((newRow: Row, insertIndex?: number) => {
    setRows(prevRows => {
      if (insertIndex !== undefined) {
        const newRows = [...prevRows];
        newRows.splice(insertIndex, 0, newRow);
        return newRows;
      }
      return [...prevRows, newRow];
    });
  }, []);

  const removeRow = useCallback((id: string) => {
    setRows(prevRows => prevRows.filter(row => row.id !== id));
  }, []);

  return {
    rows,
    isTranslating,
    error,
    translate,
    updateRow,
    addRow,
    removeRow,
    setRows
  };
};
