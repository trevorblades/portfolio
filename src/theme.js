import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      '::selection': {
        bgColor: 'pink.500'
      },
      mark: {
        bgColor: 'cyan.300'
      }
    }
  },
  fonts: {
    heading: 'Poppins, Helvetica, sans-serif',
    body: 'Roboto, Helvetica, sans-serif',
    mono: "'Roboto Mono', monospace"
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 'semibold'
      }
    }
  }
});

export default theme;
