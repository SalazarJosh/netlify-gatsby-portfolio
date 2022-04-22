import * as React from "react";
import { Link } from "gatsby";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {faReact} from '@fortawesome/free-brands-svg-icons'

import SocialIcons from './SocialIcons'


const Footer = class extends React.Component {
  componentDidMount() {
    this.handleLoad();
    window.addEventListener('resize', this.handleLoad);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleLoad);
  }

  handleLoad() {
    var footerSpacingDiv = document.getElementById("footer-spacing");

    var footer = document.getElementById("footer");

    var footerHeight;

    if (footer && footer !== undefined) {
      footerHeight = footer.offsetHeight;
    }
    if (footerSpacingDiv && footerSpacingDiv !== undefined) {
      footerSpacingDiv.style.paddingBottom = footerHeight + "px";
    }

  }

  render() {
    return (<footer className="footer" id="footer">
      <div className="content">
        <div className="container">
          <div style={{
              maxWidth: '100vw'
          }} className="columns">
            <div className="column is-4">
              <p className="has-text-centered-mobile">
                Made with <FontAwesomeIcon icon={faCoffee}/> coffee, Gatsby, and a lot of <FontAwesomeIcon icon={faGithub}/> commits
              </p>
            </div>
            <div className="column is-4 has-text-centered">
              <a href="mailto:joshuaasalazar@gmail.com">JoshuaASalazar@gmail.com</a>
            </div>
            <div className="column is-4 has-text-right has-text-centered-mobile footer-social-icons">
              <SocialIcons></SocialIcons>
            </div>
          </div>
        </div>
      </div>
    </footer>)
  }
};

export default Footer;
