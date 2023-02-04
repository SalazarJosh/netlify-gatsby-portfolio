import React from "react";
import { Link } from "gatsby";
import { Location } from '@reach/router'
import github from "../img/github-icon.svg";
import logo from "../img/logo.svg";

import SocialIcons from './SocialIcons'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  toggleHamburger() {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      }
    );
  }

  render() {
    const partlyActive = className => ({ isPartiallyCurrent }) => ({
      className: className + (isPartiallyCurrent ? ` active` : ``),
    })
    return (
      <>
        <Location>
          {({location}) => {
            const locationPath = location.pathname
            return <nav className={`navbar is-transparent ${locationPath === '/' ? null : `is-fixed-top`}`} role="navigation" aria-label="main-navigation">
                <div className={`container ${locationPath === '/' ? null : `navbar-bottom-border`}`}>
                  <div className="navbar-brand">
                    {/* Hamburger menu */}
                    <div className={`navbar-burger burger ${this.state.navBarActiveClass}`} data-target="navMenu" role="menuitem" tabIndex={0} onKeyPress={() => this.toggleHamburger()} onClick={() => this.toggleHamburger()}>
                      <span/>
                      <span/>
                      <span/>
                    </div>
                  </div>

                  <div id="navMenu" className={`navbar-menu ${this.state.navBarActiveClass}`}>
                    <div className="navbar-start has-text-centered">
                      <Link className="navbar-item" to="/" activeClassName="active">
                        Home
                      </Link>
                      <Link to="/blog" getProps={partlyActive("navbar-item")} activeClassName="active">
                        Blog
                      </Link>
                      <Link className="navbar-item" to="/talks" activeClassName="active">
                        Talks
                      </Link>
                    </div>
                    {location.pathname !== '/' && <div className="nameSVGContainer is-hidden-touch">
                      <Link className="navbar-item" to="/">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-1 0 40.44 9.91" xmlSpace="preserve" className="nameSVG">
                          <g className="nameSLZR">
                            <path className="logost0" d="M2.58,9.91a2.53,2.53,0,0,1-1.4-.36,2.26,2.26,0,0,1-.84-1A4,4,0,0,1,0,7.08l1.2-.32a5.38,5.38,0,0,0,.16,1,1.82,1.82,0,0,0,.42.79,1.06,1.06,0,0,0,.8.3,1,1,0,0,0,.8-.29,1.22,1.22,0,0,0,.27-.85,1.73,1.73,0,0,0-.3-1.06,5.13,5.13,0,0,0-.76-.81L1,4.39a2.66,2.66,0,0,1-.71-.92A3,3,0,0,1,0,2.24,2.17,2.17,0,0,1,.64.59,2.29,2.29,0,0,1,2.3,0a3.13,3.13,0,0,1,1,.15,1.79,1.79,0,0,1,.73.46,2.27,2.27,0,0,1,.47.79,4.61,4.61,0,0,1,.23,1.11L3.6,2.82a4.63,4.63,0,0,0-.14-.88,1.36,1.36,0,0,0-.38-.65A1.14,1.14,0,0,0,2.3,1a1.09,1.09,0,0,0-.78.27,1.05,1.05,0,0,0-.28.8,1.55,1.55,0,0,0,.15.73,2.08,2.08,0,0,0,.48.59L3.52,4.87A5.23,5.23,0,0,1,4.49,6,2.89,2.89,0,0,1,4.91,7.6a2.45,2.45,0,0,1-.3,1.24,2.1,2.1,0,0,1-.82.8A2.6,2.6,0,0,1,2.58,9.91Z"/>
                          </g>
                          <g className="nameSLZR">
                            <path className="logost0" d="M11.87,9.8V.08h1.35V8.83h2.49v1Z"/>
                          </g>
                          <g className="nameSLZR">
                            <path className="logost0" d="M22.24,9.8v-1l2.85-7.77H22.42v-1h4.11V.67l-3,8.16h3v1Z"/>
                          </g>
                          <g className="nameSLZR">
                            <path className="logost0" d="M33.44,9.8V.08h2A4.37,4.37,0,0,1,37,.34a1.79,1.79,0,0,1,.94.83,3.21,3.21,0,0,1,.3,1.49,4.65,4.65,0,0,1-.11,1,1.91,1.91,0,0,1-.39.78,1.5,1.5,0,0,1-.69.46L38.44,9.8H37.13L35.85,5.24H34.8V9.8ZM34.8,4.27h.51a2.7,2.7,0,0,0,.94-.14,1,1,0,0,0,.53-.49,2.36,2.36,0,0,0,.17-1,2,2,0,0,0-.31-1.23,1.58,1.58,0,0,0-1.24-.37h-.6Z"/>
                          </g>
                          <g className="nameSLZR">
                            <path className="logost4" d="M5.44,9.8,7.5.08H8.81L10.88,9.8M7.36,6.38H9L8.16,2Z"/>
                            <path className="logost4" d="M16.1,9.8,18.17.08h1.31L21.55,9.8M18,6.38h1.62L18.83,2Z"/>
                            <path className="logost4" d="M27,9.8,29.08.08h1.3L32.46,9.8M28.93,6.38h1.62L29.74,2Z"/>
                          </g>
                          <g className="logoRedA">
                            <polygon className="logost1" points="7.36 6.38 8.98 6.38 8.16 2 7.36 6.38"/>
                            <polygon className="logost5" points="7.01 8.23 7.01 9.8 9.35 9.8 9.31 8.23 9.16 7.36 7.18 7.36 7.01 8.23"/>
                          </g>
                          <g className="logoGreenA">
                            <polygon className="logost2" points="18.02 6.38 19.64 6.38 18.83 2 18.02 6.38"/>
                            <polygon className="logost5" points="17.68 8.22 17.68 9.8 20.01 9.8 19.98 8.22 19.82 7.35 17.84 7.35 17.68 8.22"/>
                          </g>
                          <g className="logoBlueA">
                            <polygon className="logost3" points="28.93 6.38 30.55 6.38 29.73 2 28.93 6.38"/>
                            <polygon className="logost5" points="28.59 8.22 28.59 9.8 30.92 9.8 30.89 8.22 30.73 7.35 28.75 7.35 28.59 8.22"/>
                          </g>
                        </svg>
                      </Link>
                    </div>
                    }

                    <div className="navbar-end has-text-centered nav-social-icons">
                      <SocialIcons></SocialIcons>
                    </div>
                  </div>


                </div>
            </nav>
          }}
        </Location>
      </>
    );
  }
};

export default Navbar;
