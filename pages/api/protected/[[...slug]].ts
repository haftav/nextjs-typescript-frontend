import {NextApiHandler} from 'next';
import jwt from 'next-auth/jwt';
import {makeExternalRequest} from 'utils/http';

const secret = process.env.SECRET;

const apiHandler: NextApiHandler = async (req, res) => {
  const token = await jwt.getToken({req, secret, raw: true});
  if (!token) {
    return res.status(401).send(401);
  }

  const endpoint = req.url.split('/api/protected/')[1];

  if (req.method === 'GET') {
    // forward request to api, receive data, and perform error handling

    return makeExternalRequest('GET', `${process.env.API_ENDPOINT}/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        return res.status(200).send(result.data);
      })
      .catch((err) => {
        const status = parseInt(err.message, 10);
        if (typeof status === 'number' && !isNaN(status)) {
          return res.status(status).send(status);
        }
        return res.status(500).json({err});
      });
  }
  if (req.method === 'POST') {
    return makeExternalRequest('POST', `${process.env.API_ENDPOINT}/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req.body),
    })
      .then((result) => {
        return res.status(200).send(result.data);
      })
      .catch((err) => {
        const status = parseInt(err.message, 10);
        if (typeof status === 'number' && !isNaN(status)) {
          return res.status(status).send(status);
        }
        return res.status(500).json({err});
      });
  }
  if (req.method === 'PUT') {
    return makeExternalRequest('PUT', `${process.env.API_ENDPOINT}/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req.body),
    })
      .then((result) => {
        return res.status(200).send(result.data);
      })
      .catch((err) => {
        const status = parseInt(err.message, 10);
        if (typeof status === 'number' && !isNaN(status)) {
          return res.status(status).send(status);
        }
        return res.status(500).json({err});
      });
  }
  if (req.method === 'DELETE') {
    // deleteHandler
    return makeExternalRequest('DELETE', `${process.env.API_ENDPOINT}/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        return res.status(200).send(result.data);
      })
      .catch((err) => {
        const status = parseInt(err.message, 10);
        if (typeof status === 'number' && !isNaN(status)) {
          return res.status(status).send(status);
        }
        return res.status(500).json({err});
      });
  }
  return res.send(200);
};

export default apiHandler;
