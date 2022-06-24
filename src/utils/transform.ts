import _ from 'lodash';
import { Dict } from '../types/general';

export function transformSnake(data: Dict) {
  const copy: Dict = {};
  if (data) {
    Object.keys(data).forEach(key => {
      copy[_.snakeCase(key)] = data[key];
    });
  }
  return copy;
}

export function transformCamel(data: Dict) {
  const copy: Dict = {};
  if (data) {
    Object.keys(data).forEach(key => {
      copy[_.camelCase(key)] = data[key];
    });
  }
  return copy;
}
