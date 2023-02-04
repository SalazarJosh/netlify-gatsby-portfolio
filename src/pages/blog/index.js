import * as React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <section className="section">
            <div className="spacer-md"></div>
            <h1 className="page-header">
              Blog
            </h1>
            <div className="spacer-sm"></div>
            <div className="content">
              <BlogRoll />
            </div>
            <div className="spacer-md"></div>
          </section>
        </div>
      </Layout>
    );
  }
}
