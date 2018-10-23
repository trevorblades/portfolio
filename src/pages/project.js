import Divider from '@material-ui/core/Divider';
import Footer from '../components/footer';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import snarkdown from 'snarkdown';
import styled from 'react-emotion';
import theme from '@trevorblades/mui-theme';
import withProps from 'recompose/withProps';
import {ConstrainedSection, Spacer} from '../components';
import {Link} from 'react-router-dom';
import {MdChevronLeft} from 'react-icons/md';

const GridItem = withProps({
  item: true
})(Grid);

const Description = styled(Typography)({
  whiteSpace: 'pre-wrap',
  br: {
    display: 'block',
    content: "''",
    marginBottom: '1em'
  }
});

const Project = props => (
  <Fragment>
    <Helmet>
      <title>{props.project.attributes.title}</title>
    </Helmet>
    <ConstrainedSection>
      <Typography variant="caption">
        <Link to="/projects">&lt; All projects</Link>
      </Typography>
      <Typography gutterBottom variant="h2">
        {props.project.attributes.title}
      </Typography>
      {props.project.attributes.images && (
        <Fragment>
          <GridList cellHeight={350} cols={3}>
            {props.project.attributes.images
              .filter(image => !image.hidden)
              .map(image => (
                <GridListTile key={image.src} cols={image.cols || 1}>
                  <img src={image.src} alt={image.title} />
                </GridListTile>
              ))}
          </GridList>
          <Spacer />
        </Fragment>
      )}
      <Grid container spacing={40}>
        <GridItem xs={12} sm={8}>
          <Description
            dangerouslySetInnerHTML={{
              __html:
                snarkdown(props.project.body) ||
                props.project.attributes.summary
            }}
          />
        </GridItem>
        {props.project.attributes.awards && (
          <GridItem xs={12} sm={4}>
            {props.project.attributes.awards.map((award, index, array) => {
              const title = typeof award === 'string' ? award : award.title;
              return (
                <Typography
                  key={title}
                  paragraph={index < array.length - 1}
                  variant="body1"
                >
                  {award.win ? '🏆' : '🏅'} {title}
                </Typography>
              );
            })}
          </GridItem>
        )}
      </Grid>
    </ConstrainedSection>
    <Divider />
    <Footer />
  </Fragment>
);

Project.propTypes = {
  project: PropTypes.object.isRequired
};

export default Project;
