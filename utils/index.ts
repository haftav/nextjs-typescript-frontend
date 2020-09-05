import {NextApiRequest} from 'next';

type SlugQuery = string | string[] | undefined;

export const buildSlug = (slug: SlugQuery): string => {
  if (!slug) {
    return '';
  }
  if (typeof slug === 'string') {
    return '';
  }
  return slug.join('/');
};

export const buildQuery = (queryObject: NextApiRequest['query']): string => {
  let output = '?';
  const pairs = [];
  for (const key in queryObject) {
    if (key === 'slug') {
      continue;
    }
    const value = queryObject[key];
    const keyValuePair = `${key}=${value}`;
    pairs.push(keyValuePair);
  }
  if (pairs.length === 0) {
    return '';
  }
  return (output += pairs.join('&'));
};
