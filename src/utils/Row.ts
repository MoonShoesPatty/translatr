import { v4 as uuidv4 } from 'uuid';
import type { Row as RowType } from '../types';

export class Row implements RowType {
  public id: string;
  public language: string;
  public text: string;

  constructor(defaultLang?: string) {
    this.id = uuidv4();
    this.language = defaultLang || 'en';
    this.text = '';
  }
}
