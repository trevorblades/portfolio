import React, {useMemo, useState} from 'react';
import Spiral from 'react-spiral';
import {Box, Center, Circle, Heading, Text, useTheme} from '@chakra-ui/react';
import {useMount, useWindowScroll, useWindowSize} from 'react-use';

export default function Test() {
  const {colors} = useTheme();
  const [now, setNow] = useState(Date.now());

  useMount(() => setNow(Date.now()));

  const {y} = useWindowScroll();
  const {width, height} = useWindowSize();

  const sides = useMemo(() => 3 + Math.floor(y / (height / 2)), [y, height]);
  const circleSize = useMemo(() => {
    // http://mathcentral.uregina.ca/QQ/database/QQ.09.06/s/benneth1.html
    // https://courses.lumenlearning.com/boundless-algebra/chapter/trigonometry-and-right-triangles/
    const diameter = Math.sqrt(width ** 2 + height ** 2);
    const vmax = Math.max(width, height);
    return 100 * (diameter / vmax) + 'vmax';
  }, [width, height]);

  return (
    <>
      <Box
        height="300vh"
        color="white"
        bgImage={`linear-gradient(${[
          colors.red[500],
          colors.yellow[500],
          colors.blue[500]
        ]})`}
      >
        <Center
          height="100vh"
          fontWeight="bold"
          textTransform="uppercase"
          position="sticky"
          top="0"
          overflow="hidden"
        >
          <div key={now}>
            <div style={{transform: `scale(${1 + y / height / 4})`}}>
              <Spiral
                fontSize={30}
                boxSize={600}
                sides={sides}
                spacing={100}
                segments={[
                  "I'm a web",
                  'developer',
                  'who enjoys',
                  'solving',
                  'puzzles',
                  'with',
                  'JS and',
                  'CSS.',
                  'Check',
                  'out',
                  'some of',
                  'my work',
                  'below'
                ]}
              />
            </div>
            <Circle
              bgColor="black"
              pos="absolute"
              top="50%"
              left="50%"
              style={{
                width: circleSize,
                height: circleSize,
                transform: `translate(-50%, -50%) scale(${Math.min(
                  1,
                  Math.max(0, y - height) / height
                )})`
              }}
            />
          </div>
        </Center>
      </Box>
      <Box h="100vh" px="10" bgColor="black" color="white" id="about">
        <Heading mb="4">stuff about me</Heading>
        <Text fontSize="lg">Yo i did these things and build this and that</Text>
      </Box>
    </>
  );
}
