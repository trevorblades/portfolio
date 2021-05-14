require('dotenv').config();
module.exports = {
  siteMetadata: {
    title: 'Trevor Blades'
  },
  plugins: [
    'gatsby-plugin-mdx',
    'gatsby-plugin-svgr',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-34658521-1'
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    },
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google: [
            {
              family: 'Poppins',
              variants: ['500', '600']
            },
            {
              family: 'Roboto',
              variants: ['400', '700']
            },
            {
              family: 'Roboto Mono',
              variants: ['400']
            }
          ]
        }
      }
    }
  ]
};
