import React from 'react';
import {render, screen} from '../testUtils';

import Gradient from 'components/Gradient';

describe('Gradient component should render correctly', () => {
  test('Rating of 1 renders correctly', () => {
    render(<Gradient rating={1} />);

    expect(screen.getByTestId('gradient-start')).toHaveStyle({stopColor: '#7EABFF'});
    expect(screen.getByTestId('gradient-end')).toHaveStyle({stopColor: '#5F78FF'});
  });

  test('Rating of 2 renders correctly', () => {
    render(<Gradient rating={2} />);

    expect(screen.getByTestId('gradient-start')).toHaveStyle({stopColor: '#8B60FF'});
    expect(screen.getByTestId('gradient-end')).toHaveStyle({stopColor: '#D95CFF'});
  });

  test('Rating of 3 renders correctly', () => {
    render(<Gradient rating={3} />);

    expect(screen.getByTestId('gradient-start')).toHaveStyle({stopColor: '#DF5CFE'});
    expect(screen.getByTestId('gradient-end')).toHaveStyle({stopColor: '#FA5252'});
  });

  test('Rating of 4 renders correctly', () => {
    render(<Gradient rating={4} />);

    expect(screen.getByTestId('gradient-start')).toHaveStyle({stopColor: '#FA5253'});
    expect(screen.getByTestId('gradient-end')).toHaveStyle({stopColor: '#FFA700'});
  });
});
