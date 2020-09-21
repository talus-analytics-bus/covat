import React from 'react'

import Nav from '../Nav/Nav'

import './Layout.css'
import './Fonts.css'

const Layout = props => {
  return (
    <>
      <Nav />
      <main>{props.children}</main>
    </>
  )
}

export default Layout
