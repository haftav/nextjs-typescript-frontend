import React from 'react';
import {render, screen} from '@testing-library/react';

import SkillLevel from 'components/SkillLevel';

describe('SkillLevel component should render correctly', () => {
  test('Renders a Gradient', () => {
    render(<SkillLevel rating={1} />);

    expect(screen.getByTestId('gradient-svg')).toBeVisible();
  });
  test('Renders correctly for rating of 1', () => {
    render(<SkillLevel rating={1} />);

    expect(screen.getByTestId('skill-level')).toHaveStyle({width: '25%'});
  });

  test('Renders correctly for rating of 2', () => {
    render(<SkillLevel rating={2} />);

    expect(screen.getByTestId('skill-level')).toHaveStyle({width: '50%'});
  });

  test('Renders correctly for rating of 3', () => {
    render(<SkillLevel rating={3} />);

    expect(screen.getByTestId('skill-level')).toHaveStyle({width: '75%'});
  });

  test('Renders correctly for rating of 4', () => {
    render(<SkillLevel rating={4} />);

    expect(screen.getByTestId('skill-level')).toHaveStyle({width: '100%'});
  });
});
