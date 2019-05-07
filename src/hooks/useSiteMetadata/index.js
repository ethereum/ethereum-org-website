import { useStaticQuery, graphql } from "gatsby";

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
            news {
              articles {
                date
                title
                link
              }
            }
            learn {
              Censorship {
                title
                subtitle
                image
                link
              }
              Current_Applications {
                title
                subtitle
                image
                link
              }
              Value_Exchange {
                title
                subtitle
                image
                link
              }
            }
          }
        }
      }
    `
  );
  return site.siteMetadata;
};

export default useSiteMetadata;
