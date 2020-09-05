import {NextApiHandler, NextApiRequest} from 'next';
import {makeExternalRequest} from 'utils/http';
import {buildSlug, buildQuery} from 'utils';

const apiHandler: NextApiHandler = async (req, res) => {
  const slug = buildSlug(req.query.slug);
  const query = buildQuery(req.query);
  const endpoint = slug + query;

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
        // may need to check for status code here
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
