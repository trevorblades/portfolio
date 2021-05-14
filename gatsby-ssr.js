import React from 'react';
import theme from './src/theme';
import {CSSReset, GlobalStyle, ThemeProvider} from '@chakra-ui/react';

export const wrapRootElement = ({element}) => (
  <>
    <CSSReset />
    <GlobalStyle />
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </>
);
