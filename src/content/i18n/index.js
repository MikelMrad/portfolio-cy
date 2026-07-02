import en from './en';

const LOCALE = 'en'; // adding fr later: import map + this constant. No UI for it now.
const dicts = { en };

export const t = (path) =>
  path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : path), dicts[LOCALE]);
