import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExternalLinkSquareAlt} from '@fortawesome/free-solid-svg-icons'

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <>
      <section className="talks-page">
        <div className="container">
          <div className="spacer-md"></div>
          <h1 className="page-header">
            Talks
          </h1>
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <div className="section">
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
          <div className="columns talks-logo-container">
            <div className="column is-2 talks-logo-container">
              <PreviewCompatibleImage
                imageInfo={{
                  image: '/img/UCDA-Logo-PNG3.png',
                  alt: `UCDA Logo`,
                  className: 'talks-logo'
                }}
              />

            </div>
            <div className="column is-2 talks-logo-container">
              <PreviewCompatibleImage
                imageInfo={{
                  image: '/img/logo-dark.png',
                  alt: `UCDA Logo`,
                  className: 'talks-logo'
                }}
              />
            </div>
            <div className="column is-2 talks-logo-container">
              <PreviewCompatibleImage
                imageInfo={{
                  image: '/img/an-event-apart-logo.png',
                  alt: `UCDA Logo`,
                  className: 'talks-logo'
                }}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <div className="section">
                <p>My most avid trait is navigating the nuances of midwestern goodbyes. I also love chatting about all things web. Please say hi and let's have a chat about typography, a big project you’re working on, or a cool new JavaScript library you’re playing with.</p>

                <p className="text-highlight">I’m always interested in sharing what I'm learning on stage. Please feel free to reach out.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="say-hello-background">
        <div class="container">
          <div class="columns">
            <div class="column is-8">
              <a href="mailto:joshuaasalazar@gmail.com" className="hello-link">
                <div className="hello-content">
                  <div className="hello-container">
                    <p className="hello-text">Say </p>
                    <ul class="content_container_list">
                      <li class="content_container_list_item">Hello !</li>
                      <li class="content_container_list_item">Asalaam alaikum !</li>
                      <li class="content_container_list_item">Hola !</li>
                      <li class="content_container_list_item">Hej !</li>
                    </ul>
                    <p className="email-hello-text"><small>JoshuaASalazar@gmail.com <FontAwesomeIcon icon={faExternalLinkSquareAlt}/></small></p>

                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
