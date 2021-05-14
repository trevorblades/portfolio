import GoldenGrid, {GOLDEN_RATIO, GridItem} from '../components/GoldenGrid';
import Logo from '../components/Logo';
import React, {useMemo} from 'react';
import SocialLinks from '../components/SocialLinks';
import brick from '../assets/brick.svg';
import cartman from '../assets/cartman.jpg';
import goingHome from '../assets/going-home.gif';
import me from '../assets/me.jpg';
import useNumber from 'react-use/lib/useNumber';
import yolo from '../assets/yolo.png';
import {ReactComponent as Apollo} from '../assets/apollo.svg';
import {
  Box,
  Center,
  Flex,
  Heading,
  Img,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import {Link as GatsbyLink} from 'gatsby';
import {Helmet} from 'react-helmet';
import {ReactComponent as Knoword} from '../assets/knoword.svg';
import {ReactComponent as Planet} from '../assets/planet.svg';
import {ReactComponent as Pollenize} from '../assets/pollenize.svg';

function BlogPost() {
  return (
    <div>
      <Heading mb="3" size="lg">
        <Link as={GatsbyLink} to="/blog/page">
          Infinite scrolling with Apollo Client 3
        </Link>
      </Heading>
      <Text fontSize="lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
    </div>
  );
}

function ProjectLogo(props) {
  return <Box h="full" fill="current" {...props} />;
}

function HomeButton(props) {
  return (
    <Center
      boxSize="full"
      pos="absolute"
      top="0"
      left="0"
      transitionProperty="opacity visibility"
      transitionDuration="1000ms"
      transitionTimingFunction="ease"
      role="group"
      {...props}
    >
      <Center
        boxSize="50%"
        bgImage={`url(${cartman})`}
        bgSize="cover"
        bgPos="center"
        _groupHover={{bgImage: `url(${goingHome})`}}
      >
        <Heading as="span" size="3xl" color="black">
          Home
        </Heading>
      </Center>
    </Center>
  );
}

const secondColumn = 1 - 1 / GOLDEN_RATIO;
const transformOrigin = (secondColumn / 2) * 100;
const scaleUp = 1 / (1 - 1 / GOLDEN_RATIO);
const translate = transformOrigin / -GOLDEN_RATIO;

export default function HomePage() {
  const [rotations, {inc: incRotations}] = useNumber();
  const isHome = useMemo(() => rotations % 2 === 0, [rotations]);
  return (
    <>
      <Helmet defaultTitle="Trevor Blades" titleTemplate="%s - Trevor Blades">
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/mushroom_1f344.png"
        />
      </Helmet>
      <Box
        pos="relative"
        overflow="hidden"
        transition="transform 1000ms ease"
        transformOrigin={`${transformOrigin}% ${transformOrigin}%`}
        style={{
          transform: `rotate(${180 - 180 * rotations}deg) scale(${
            isHome ? scaleUp : 1
          }) translate(${isHome ? `${translate}%, ${translate}%` : 0})`
        }}
      >
        <GoldenGrid>
          <div />
          <GridItem>open source examples</GridItem>
          <GridItem>
            <Heading mb="6" size="2xl">
              Blargh posts
            </Heading>
            <Stack spacing="10">
              <BlogPost />
              <BlogPost />
            </Stack>
          </GridItem>
        </GoldenGrid>
        <Box
          pos="absolute"
          top="0"
          left="0"
          transform={`scale(${secondColumn})`}
          transformOrigin="top left"
          style={!isHome ? {cursor: 'pointer'} : null}
        >
          <GoldenGrid
            transform="rotate(180deg)"
            transition="opacity 1000ms ease"
            style={{
              pointerEvents: isHome ? 'all' : 'none'
            }}
          >
            <Logo
              cursor="pointer"
              onClick={event => {
                event.stopPropagation();
                incRotations();
              }}
            />
            <Box bgImage={`url(${brick})`} bgPos="center">
              <Img
                mt="-6"
                ml="6"
                w={`calc(100% * ${secondColumn})`}
                float="right"
                src={me}
              />
              <GridItem>
                <Text mb="6" fontSize="xl">
                  I&apos;m Trevor, a <mark>web developer</mark> who loves
                  working on challenging problems and helping others learn new
                  things.
                </Text>
                <SocialLinks />
                <Img src={yolo} w="89px" />
              </GridItem>
            </Box>
            <GridItem>
              <Flex
                h="14"
                justifyContent="space-evenly"
                mb="16"
                color="gray.500"
              >
                <ProjectLogo as={Apollo} />
                <ProjectLogo p="1" as={Knoword} />
                <ProjectLogo as={Planet} />
                <ProjectLogo p="1" as={Pollenize} />
              </Flex>
              <Heading mb="2" color="cyan.300" size="md" fontWeight="medium">
                Latest post
              </Heading>
              <Heading mb="4" size="2xl">
                <Link as={GatsbyLink} to="/blog/page">
                  Infinite scrolling with Apollo Client 3
                </Link>
              </Heading>
              <Text fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </Text>
            </GridItem>
          </GoldenGrid>
          <HomeButton
            style={{
              opacity: isHome ? 0 : 1,
              visibility: isHome ? 'hidden' : 'visible'
            }}
            onClick={() => incRotations()}
          />
        </Box>
      </Box>
    </>
  );
}
