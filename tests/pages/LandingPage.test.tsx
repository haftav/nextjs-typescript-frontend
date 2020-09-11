import React from 'react';
import {render} from '../testUtils';
import LandingPage from 'pages/index';

test('Loads page correctly', () => {
  render(<LandingPage />);
});
