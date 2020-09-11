import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import jwt from 'jsonwebtoken';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options = {
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {label: 'Username', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      authorize: async (credentials) => {
        const response = await fetch('http://localhost:3030/api/auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          return Promise.resolve(null);
        }

        const {
          data: {user},
        } = await response.json();

        if (user) {
          return Promise.resolve({
            name: user.username,
            id: user.id,
          });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    error: '/login',
  },
  secret: process.env.SECRET,
  session: {
    jwt: true,
    // TODO -> update with realistic values
    maxAge: 14 * 60 * 60,
    updateAge: 2 * 60,
  },
  jwt: {
    secret: process.env.SECRET,
    encode: async ({secret, token}) => {
      const signedToken = jwt.sign(token, secret);
      return signedToken;
    },
    decode: async ({secret, token}) => {
      const decoded = jwt.verify(token, secret);
      return decoded;
    },
  },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
      }
      return Promise.resolve(token);
    },
  },
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
