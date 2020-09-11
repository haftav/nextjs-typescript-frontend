import React from 'react';
import {render} from '@testing-library/react';
import {ThemeProvider, ColorModeProvider, CSSReset} from '@chakra-ui/core';

const Providers = ({children}) => {
  return (
    <ThemeProvider>
      <ColorModeProvider value="dark">
        <CSSReset />
        {children}
      </ColorModeProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options = {}) => render(ui, {wrapper: Providers, ...options});

// re-export everything
export * from '@testing-library/react';

// override render method
export {customRender as render};
