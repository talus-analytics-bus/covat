import React from 'react'
import { Link } from 'gatsby'

// import NavDropdown from './NavDropdown508/NavDropdown508'

import styles from './Nav508.module.scss'

const Nav508 = props => {
  const navbarRightContent = React.useRef()
  const dropHiderRef = React.useRef()

  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  const [dropHiderStyle, setDropHiderStyle] = React.useState({
    height: 0,
    padding: '0 15px',
    visibility: 'visible',
  })

  React.useEffect(() => {
    const handleResize = () => {
      if (
        (window.innerWidth > 1170) &
        (dropHiderRef.current.style.height !== 'block')
      ) {
        setDropHiderStyle({
          height: 0,
          padding: '0 15px',
          visibility: 'visible',
        })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleNav = () => {
    if (mobileNavOpen) {
      setMobileNavOpen(false)
      setDropHiderStyle({ height: 0, padding: '0 15px', visibility: 'hidden' })
    } else {
      setMobileNavOpen(true)
      setDropHiderStyle({
        height: navbarRightContent.current.offsetHeight + 30,
        padding: 15,
        visibility: 'visible',
      })
    }
  }

  const openNav = () => {
    if (window.innerWidth < 1170) {
      setMobileNavOpen(true)
      setDropHiderStyle({
        height: navbarRightContent.current.offsetHeight + 30,
        padding: 15,
        visibility: 'visible',
      })
    }
  }

  const closeNav = () => {
    if (window.innerWidth < 1170) {
      setMobileNavOpen(false)
      setDropHiderStyle({ height: 0, padding: '0 15px', visibility: 'hidden' })
    }
  }

  return (
    <nav className={styles.nav} aria-label="Main Navigation">
      <div className={styles.main}>
        <Link
          to={`/`}
          activeClassName={styles.active}
          className={styles.navbarLeft}
        >
          <img src={props.logo} alt={props.logoAlt} />
        </Link>

        <button
          className={styles.menuButton}
          onClick={toggleNav}
          aria-label="Menu"
        ></button>

        <div
          ref={dropHiderRef}
          className={styles.navbarRightHider}
          style={dropHiderStyle}
          onFocus={openNav}
          onBlur={closeNav}
          role={'presentation'}
        >
          <div className={styles.navbarRight} ref={navbarRightContent}>
            {props.children}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav508
