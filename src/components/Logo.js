import React from 'react';
import mf1 from '../assets/mf1.jpg';
import mush from '../assets/mush.svg';
import {Box, Center, Heading, Img, chakra} from '@chakra-ui/react';
import {keyframes} from '@emotion/react';

const hue = keyframes({
  from: {
    WebkitFilter: 'hue-rotate(0)'
  },
  to: {
    WebkitFilter: 'hue-rotate(-360deg)'
  }
});

export default function Logo(props) {
  return (
    <Center
      role="group"
      bgImage={`url(${mf1})`}
      bgSize="cover"
      bgPos="center"
      {...props}
    >
      <Heading
        display="flex"
        fontSize="5xl"
        fontWeight="medium"
        position="relative"
        lineHeight="none"
      >
        <Img
          transform="translateY(-10%)"
          h="1em"
          src={mush}
          position="absolute"
          top="0"
          left="0"
        />
        <Box
          backgroundClip="text"
          animation={`${hue} 5s infinite linear`}
          css={({theme}) => ({
            WebkitTextFillColor: 'transparent',
            backgroundImage: `linear-gradient(${[
              'to bottom right',
              theme.colors.red[400],
              theme.colors.cyan[400],
              theme.colors.yellow[400]
            ]})`
          })}
          _groupHover={{
            animationDuration: '500ms'
          }}
        >
          <chakra.table cellPadding="0">
            <tbody>
              <tr>
                <td>
                  <chakra.span
                    w="1.1ch"
                    display="inline-block"
                    visibility="hidden"
                  >
                    T
                  </chakra.span>
                  revor
                </td>
                <td />
              </tr>
              <tr>
                <chakra.td textAlign="right">Bla</chakra.td>
                <td>des</td>
              </tr>
            </tbody>
          </chakra.table>
        </Box>
      </Heading>
    </Center>
  );
}
