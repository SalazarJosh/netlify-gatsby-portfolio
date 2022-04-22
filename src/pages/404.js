import React from 'react'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <section className="section">
      <div className="container content tags-page">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <div className="spacer-md"></div>
            404 Page Not Found
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
