import { compact } from 'lodash';

export default (user) => {
  if (!user) return '';
  const fullName = compact([user.firstName, user.lastName]).join(' ');
  return fullName;
};
