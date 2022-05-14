import * as React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'



class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const postLinks = posts.map((post) => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
        </Link>
      </li>
    ));
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
      } tagged with “${tag}”`;

    return (
      <Layout>
        <section className="tag-page">
          <div className="spacer-md"></div>
          <div className="container">
            <h1 className="page-header">{tag}</h1>
            <div className="spacer-sm"></div>

            <p>{tagHeader}</p>
            <Link to="/tags/">Browse all tags</Link>

            <div className="spacer-sm"></div>

            <div className="columns is-multiline is-mobile">
              {posts.map(({ node: post }) => {
                console.log(post);

                if (post.frontmatter.listed) {
                  return (
                    <div className="column is-one-third gs_reveal" key={post.id}>
                      <div className="port-item">
                        <div className="blogThumnailWrapper">
                          <Link
                            className="title has-text-primary is-size-4"
                            to={post.fields.slug}
                          >
                            <PreviewCompatibleImage
                              imageInfo={{
                                image: post.frontmatter.featuredimage,
                                alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                width: post.frontmatter.featuredimage.childImageSharp.gatsbyImageData.width,
                              }}
                            />
                          </Link>
                        </div>

                        <div className="spacer-sm"></div>

                        <div className="tagText">
                          {post.frontmatter.tags.map((tag, index, array) => {
                            if (array.length - 1 === index) {
                              return (
                                <span key={tag + `tag`}>
                                  {tag}
                                </span>
                              )
                            } else {
                              return (
                                <span key={tag + `tag`}>
                                  {tag}, &nbsp;
                                </span>
                              )
                            }
                          })}
                        </div>
                        <Link
                          className="blogTitle"
                          to={post.fields.slug}
                        >
                          {post.frontmatter.title}
                        </Link>
                      </div>
                      <div className="spacer-sm"></div>

                    </div>
                  )
                }
              })
              }
            </div>

          </div>
          <div className="spacer-md"></div>
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, listed: {eq: true} } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
            listed
            featuredimage {
              childImageSharp {
                gatsbyImageData(
                  quality: 100
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
  }
`;
