import PropTypes from 'prop-types';
import React from 'react';
import {Box, Grid} from '@chakra-ui/react';

export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const gridTemplate = `1fr calc(100% / ${GOLDEN_RATIO})`;

export default function GoldenGrid({children, ...props}) {
  const [child1, child2, child3] = React.Children.toArray(children);
  return (
    <Grid height="100vh" templateColumns={gridTemplate} {...props}>
      <Grid templateRows={gridTemplate}>
        {child1}
        {child2}
      </Grid>
      {child3}
    </Grid>
  );
}

GoldenGrid.propTypes = {
  children: PropTypes.node.isRequired
};

export function GridItem(props) {
  return <Box p="12" {...props} />;
}
