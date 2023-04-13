import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'
import {faCodepen} from '@fortawesome/free-brands-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

const SocialIcons = class extends React.Component {
  render() {
    return (
      <>
        <div className="navbar-item socialIconFooter">
          <a href="https://www.linkedin.com/in/joshuasalazar1/" target="_blank" rel="noopener noreferrer">
            <span className="icon">
              <FontAwesomeIcon icon={faLinkedin}/>
            </span>
          </a>
        </div>
        <div className="navbar-item socialIconFooter">
          <a href="https://codepen.io/joshsalazar" target="_blank" rel="noopener noreferrer">
            <span className="icon">
              <FontAwesomeIcon icon={faCodepen}/>
            </span>
          </a>
        </div>
        <div className="navbar-item socialIconFooter">
          <a href="https://github.com/SalazarJosh" target="_blank" rel="noopener noreferrer">
            <span className="icon">
              <FontAwesomeIcon icon={faGithub}/>
            </span>
          </a>
        </div>
      </>
    )
  }
}

export default SocialIcons
