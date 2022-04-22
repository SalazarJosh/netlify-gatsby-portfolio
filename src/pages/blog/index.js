import * as React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <div className="spacer-md"></div>
          <h1 className="page-header">
            Blog
          </h1>
          <div className="spacer-sm"></div>
          <section className="">
            <div className="content">
              <BlogRoll />
            </div>
          </section>
          <div className="spacer-md"></div>
          <p className="more-posts-text">
            More blog posts coming soon. I just started this website so stay tunded!
          </p>
          <div className="spacer-md"></div>
        </div>

      </Layout>
    );
  }
}
