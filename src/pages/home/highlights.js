import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import styled, {css} from 'react-emotion';
import theme from '@trevorblades/mui-theme';
import withProps from 'recompose/withProps';
import withWidth from '@material-ui/core/withWidth';
import {ConstrainedSection, Spacer, sectionPadding} from '../../components';
import {Link} from 'react-router-dom';
import {projects} from '../projects';

const GridItem = withProps({
  item: true
})(Grid);

const gridSpacing = 40;
const Screenshot = styled.img(props => ({
  display: 'block',
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[10],
  [theme.breakpoints.down('xs')]: {
    width: '100vw',
    [`margin${props.right ? 'Right' : 'Left'}`]: -sectionPadding,
    marginBottom: gridSpacing,
    borderRadius: 0,
    boxShadow: 'none'
  }
}));

const offset = css({
  marginTop: sectionPadding * -2,
  [theme.breakpoints.down('xs')]: {
    marginTop: -sectionPadding
  }
});

const LinkButton = withProps({
  component: Link
})(Button);

const ProjectsFooter = styled.div({
  textAlign: 'center'
});

const Highlights = props => (
  <ConstrainedSection>
    {Object.keys(projects)
      .slice(0, 3)
      .map((key, index) => {
        const project = projects[key];
        const right = index % 2;
        return (
          <Fragment key={key}>
            <Grid
              container
              spacing={props.width === 'xs' ? 0 : gridSpacing}
              direction={right ? 'row-reverse' : null}
            >
              <GridItem sm={12} md={8}>
                <Screenshot
                  src={project.gif}
                  className={!index && offset}
                  right={right}
                />
              </GridItem>
              <GridItem sm={12} md={4}>
                <Typography gutterBottom variant="h4">
                  {project.title}
                </Typography>
                <Typography paragraph>{project.summary}</Typography>
                <LinkButton to={`/projects/${key}`} variant="outlined">
                  View project
                </LinkButton>
              </GridItem>
            </Grid>
            <Spacer />
          </Fragment>
        );
      })}
    <ProjectsFooter>
      <Typography gutterBottom variant="subtitle1" color="textSecondary">
        Not satisfied? Want to see more?
      </Typography>
      <LinkButton
        color="primary"
        to="/projects"
        size="large"
        variant="contained"
      >
        All projects
      </LinkButton>
    </ProjectsFooter>
  </ConstrainedSection>
);

Highlights.propTypes = {
  width: PropTypes.string.isRequired
};

export default withWidth()(Highlights);
