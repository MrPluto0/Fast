import _ from 'lodash';
import { Dict, IDate } from '../types/general';

const transform = (data: any, action: Function) => {
  let copy = data;
  if (data instanceof Array) {
    copy = [];
    data.forEach(item => {
      (copy as any[]).push(transform(item, action));
    });
  } else if (data instanceof Object) {
    copy = {};
    Object.keys(data).forEach(key => {
      copy[action(key)] = transform(data[key], action);
    });
  }
  return copy ?? {};
};

export function transformSnake(data: Dict) {
  return transform(data, _.snakeCase);
}

export function transformCamel(data: Dict) {
  return transform(data, _.camelCase);
}

export function transformDate(date: IDate) {
  return `${date.month}/${date.day} ${date.hour}:${date.min}`;
}
