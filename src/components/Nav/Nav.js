import React from 'react'
import { Link } from 'gatsby'

import Nav508 from './Nav508/Nav508'
import nav508Styles from './Nav508/Nav508.module.scss'

import clearCOVIDLogo from '../../assets/logos/clearCOVIDLogo.svg'

const Nav = () => (
  <Nav508 logo={clearCOVIDLogo} logoAlt="COVAT">
    <Link to="/about/" activeClassName={nav508Styles.active}>
      About
    </Link>
    <Link to="/experts/" activeClassName={nav508Styles.active}>
      Experts
    </Link>
    <Link to="/blog/" activeClassName={nav508Styles.active}>
      Reports
    </Link>
    <Link to="/resources/" activeClassName={nav508Styles.active}>
      Resources
    </Link>
    <Link to="/contact/" activeClassName={nav508Styles.active}>
      Contact
    </Link>
  </Nav508>
)

export default Nav
