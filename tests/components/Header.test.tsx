import React from 'react';
import {render, screen} from 'tests/testUtils';

import Header from 'components/Header';

const createSession = () => {
  const date = new Date();
  date.setDate(date.getDate() + 10);

  const expirationDate = date.toISOString();
  return {
    user: {name: 'thafner', email: null, image: null},
    expires: expirationDate,
  };
};

describe('Header component should render correctly', () => {
  it('Should display profile & logout button for user with session', async () => {
    render(<Header session={createSession()} loading={false} />);
    expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  it('Renders login and register buttons for user without session', async () => {
    render(<Header session={undefined} loading={false} />);
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });
});
