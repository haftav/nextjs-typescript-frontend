import {NextApiHandler} from 'next';
import jwt from 'next-auth/jwt';
import {makeExternalRequest} from 'utils/http';
import {buildSlug, buildQuery} from 'utils';

const secret = process.env.JWT_SECRET;

const apiHandler: NextApiHandler = async (req, res) => {
  const token = await jwt.getToken({req, secret, raw: true});
  if (!token) {
    return res.status(401).send({});
  }

  const slug = buildSlug(req.query.slug);
  const query = buildQuery(req.query);
  const endpoint = slug + query;

  if (req.method === 'GET') {
    // forward request to api, receive data, and perform error handling
    const token = await jwt.getToken({req, secret, raw: true});
    // // TODO -> convert to API_ENDPOINT variable
    return makeExternalRequest('GET', `http://localhost:3030/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
