import {NextApiHandler} from 'next';
import jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

const songHandler: NextApiHandler = async (req, res) => {
  const token = await jwt.getToken({req, secret, raw: true});
  return fetch('http://localhost:3030/api/songs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      if (!result.ok) {
        throw new Error();
      }
      return result.json();
    })
    .then((result) => {
      return res.status(200).send(result.data);
    })
    .catch((error) => {
      return res.status(500).json({error});
    });
};

export default songHandler;
