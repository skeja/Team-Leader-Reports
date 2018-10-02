import { capitalize, compact, map } from 'lodash-es';

export default ({ firstName, lastName } = {}) => {
  if (!firstName && lastName) return '';
  return compact(map([firstName, lastName], capitalize)).join(' ');
};
