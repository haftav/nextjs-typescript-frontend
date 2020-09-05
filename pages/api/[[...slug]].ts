import {NextApiHandler, NextApiRequest} from 'next';
import {makeExternalRequest} from 'utils/http';

type SlugQuery = string | string[] | undefined;

const buildSlug = (slug: SlugQuery): string => {
  if (!slug) {
    return '';
  }
  if (typeof slug === 'string') {
    return '';
  }
  return slug.join('/');
};

const buildQuery = (queryObject: NextApiRequest['query']): string => {
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

const apiHandler: NextApiHandler = async (req, res) => {
  const slug = buildSlug(req.query.slug);
  const query = buildQuery(req.query);
  const endpoint = slug + query;
  console.log('ENDPOINT', endpoint);

  if (req.method === 'GET') {
    // // TODO -> convert to API_ENDPOINT variable
    return makeExternalRequest('GET', `http://localhost:3030/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        return res.status(200).send(result.data);
      })
      .catch((err) => {
        return res.status(500).json({err});
      });
  }
  if (req.method === 'POST') {
    return makeExternalRequest(
      'POST',
      `http://localhost:3030/api/${endpoint}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    )
      .then((result) => {
        return res.status(200).send(result.data);
      })
      .catch((err) => {
        return res.status(500).json({err});
      });
  }
  if (req.method === 'PUT') {
    // putHandler
  }
  if (req.method === 'DELETE') {
    // deleteHandler
  }
  return res.send(200);
};

export default apiHandler;
