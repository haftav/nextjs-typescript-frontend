import {NextApiHandler, NextApiRequest} from 'next';
import jwt from 'next-auth/jwt';
import {makeRequest} from 'utils/http';

const secret = process.env.JWT_SECRET;

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
  const token = await jwt.getToken({req, secret, raw: true});
  if (!token) {
    return res.status(401).send({});
  }
  if (req.method === 'GET') {
    // forward request to api, receive data, and perform error handling
    const slug = buildSlug(req.query.slug);
    const query = buildQuery(req.query);
    const endpoint = slug + query;
    console.log('ENDPOINT', endpoint);
    const token = await jwt.getToken({req, secret, raw: true});
    // // TODO -> convert to API_ENDPOINT variable
    return makeRequest<void>(
      'GET',
      `http://localhost:3030/api/${endpoint}`,
      (result) => {
        return res.status(200).send(result.data);
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      {isExternal: true}
    ).catch((err) => {
      return res.status(500).json({err});
    });
  }
  if (req.method === 'POST') {
    // postHandler
    // get endpoint
    // get body
    // get query string
    // forward request to api, receive data, and perform error handling
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
