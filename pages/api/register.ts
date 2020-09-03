import {NextApiHandler} from 'next';

const registerHandler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') {
    return fetch('http://localhost:3030/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
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
  }
};

export default registerHandler;
