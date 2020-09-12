import {rest} from 'msw';

export const handlers = [
  rest.get('/api/auth/session', (req, res, ctx) => {
    const date = new Date();
    // add 10 days until expiration
    date.setDate(date.getDate() + 10);

    const expirationDate = date.toISOString();
    return res(
      ctx.status(200),
      ctx.json({
        user: {name: 'thafner', email: null, image: null},
        expires: expirationDate,
      })
    );
  }),
];
