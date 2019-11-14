import Footer from './footer';
import Layout from './layout';
import Logo from './logo';
import PropTypes from 'prop-types';
import React from 'react';
import rehypeReact from 'rehype-react';
import {
  Box,
  Divider,
  Grid,
  GridList,
  GridListTile,
  Typography
} from '@material-ui/core';
import {Button, Link as MuiLink} from 'gatsby-theme-material-ui';
import {Helmet} from 'react-helmet';
import {Link, graphql} from 'gatsby';
import {LogoTitleProps} from '@trevorblades/mui-theme';
import {MdExitToApp} from 'react-icons/md';
import {parse} from 'url';

function Paragraph(props) {
  return <Typography paragraph {...props} />;
}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    p: Paragraph,
    a: MuiLink
  }
}).Compiler;

export default function Template(props) {
  const {frontmatter, htmlAst} = props.data.markdownRemark;
  const {url, title, awards, images} = frontmatter;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box
        px={3}
        height={64}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.paper"
        position="sticky"
        top={0}
        zIndex="appBar"
      >
        <Box {...LogoTitleProps.root} component={Link} to="/">
          <Box {...LogoTitleProps.logo} component={Logo} />
        </Box>
      </Box>
      <Box p={8}>
        <Typography display="block" variant="overline" color="inherit">
          <MuiLink to="/" color="inherit">
            &lt; Back to home
          </MuiLink>
        </Typography>
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        {images && (
          <Box mb={4}>
            <GridList cellHeight={400} cols={3}>
              {images.map((image, index) => (
                <GridListTile cols={image.cols} key={index}>
                  <img src={image.src.publicURL} alt={image.alt} />
                </GridListTile>
              ))}
            </GridList>
          </Box>
        )}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {renderAst(htmlAst)}
            {url && (
              <Button
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
              >
                {parse(url).host}
                <MdExitToApp size={24} style={{marginLeft: 12}} />
              </Button>
            )}
          </Grid>
          {awards && (
            <Grid item xs={12} md={4}>
              <Typography gutterBottom variant="h6">
                Accolades
              </Typography>
              {awards.map((award, index, array) => {
                const title = typeof award === 'string' ? award : award.title;
                return (
                  <Typography key={title} paragraph={index < array.length - 1}>
                    {award.win ? '🏆' : '🏅'} {title}
                  </Typography>
                );
              })}
            </Grid>
          )}
        </Grid>
      </Box>
      <Divider />
      <Footer />
    </Layout>
  );
}

Template.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query ProjectQuery($id: String) {
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        title
        url
        awards {
          title
          win
        }
        images {
          src {
            publicURL
          }
          alt
          cols
        }
      }
      htmlAst
    }
  }
`;
