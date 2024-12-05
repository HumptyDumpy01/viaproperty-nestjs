import { DEFAULT_ERROR_TEXT } from '../variables/variables';
import * as process from 'node:process';

export function showErrorMessage(text: string) {
  return process.env.NODE_ENV === `development` ? text : DEFAULT_ERROR_TEXT;
}
