import React from 'react'
import { Link } from 'gatsby'

import Nav508 from './Nav508/Nav508'
import nav508Styles from './Nav508/Nav508.module.scss'

const Nav = () => (
  <Nav508 logo="" logoAlt="COVAT">
    <Link to="/resources/" activeClassName={nav508Styles.active}>
      Resources
    </Link>
  </Nav508>
)

export default Nav
