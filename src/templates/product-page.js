import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";

// eslint-disable-next-line
export const ProductPageTemplate = ({
  title,
  heading,
  description,
  intro,
  main,
  testimonials,
  pricing,
}) => {

  return (
    <div className="content">
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-7 is-offset-1">
                <h3 className="has-text-weight-semibold is-size-2">
                  {heading}
                </h3>
                <p>{description}</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <Features gridItems={intro.blurbs} /> 
                <div className="columns">
                  <div className="column is-7">
                    <h3 className="has-text-weight-semibold is-size-3">
                      {main.heading}
                    </h3>
                    <p>{main.description}</p>
                  </div>
                </div>
                <div className="tile is-ancestor">
                  <div className="tile is-vertical">
                    <div className="tile">
                      <div className="tile is-parent is-vertical">
                        <article className="tile is-child">
                        </article>
                      </div>
                      <div className="tile is-parent">
                        <article className="tile is-child">
                        </article>
                      </div>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child">
                      </article>
                    </div>
                  </div>
                </div>
                <Testimonials testimonials={testimonials} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <h2 className="has-text-weight-semibold is-size-2">
                  {pricing.heading}
                </h2>
                <p className="is-size-5">{pricing.description}</p>
                <Pricing data={pricing.plans} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ProductPageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
  }),
  testimonials: PropTypes.array,
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    plans: PropTypes.array,
  }),
};

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProductPageTemplate
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        main={frontmatter.main}
        testimonials={frontmatter.testimonials}
        pricing={frontmatter.pricing}
      />
    </Layout>
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductPage;

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        heading
        description
        intro {
          blurbs {
            text
          }
          heading
          description
        }
        main {
          heading
          description
        }
        testimonials {
          author
          quote
        }

        pricing {
          heading
          description
          plans {
            description
            items
            plan
            price
          }
        }
      }
    }
  }
`;
