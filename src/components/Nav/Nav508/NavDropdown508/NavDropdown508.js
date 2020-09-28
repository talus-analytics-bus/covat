import React, { useState, useRef } from 'react'

import styles from './NavDropdown508.module.scss'

const NavDropdown = props => {
  const subMenuContent = useRef()
  const subMenuHiderRef = useRef()

  const [subMenuOpen, setSubMenuOpen] = useState(false)

  const [subMenuHiderStyle, setSubMenuHiderStyle] = useState({
    height: 0,
    padding: '0 15px',
    // padding: 0,
    visibility: 'hidden',
  })

  const [subMenuButtonStyle, setSubMenuButtonStyle] = useState({
    display: 'block',
    visibility: 'visible',
  })

  React.useEffect(() => {
    if (window.innerWidth < 1170) {
      setSubMenuHiderStyle({ height: 'auto', padding: 0, marginBottom: 0 })
      setSubMenuButtonStyle({ display: 'none', visibility: 'hidden' })
    }

    // Switch between mobile and desktop menus
    const handleResize = () => {
      alert('adding event listener in dropdown')
      if (
        (window.innerWidth < 1170) &
        (subMenuHiderRef.current.style.height !== 'auto')
      ) {
        setSubMenuHiderStyle({
          height: 'auto',
          // padding: 0,
          padding: '0 15px',
          marginBottom: 0,
          visibility: 'visible',
        })
        setSubMenuButtonStyle({ display: 'none', visibility: 'hidden' })
      } else if (subMenuHiderRef.current.style.display !== 'block') {
        setSubMenuButtonStyle({ display: 'block', visibility: 'visible' })
        //         if (subMenuOpen) {
        //           setSubMenuHiderStyle({
        //             height: subMenuContent.current.offsetHeight + 30,
        //             // padding: 15,
        //
        //             padding: '0 15px',
        //             // padding: 0,
        //             visibility: 'visible',
        //           })
        //         } else {
        setSubMenuHiderStyle({
          height: 0,
          padding: '0 15px',
          // padding: 0,
          visibility: 'hidden',
        })
        // }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSubmenu = () => {
    // if (window.innerWidth > 1170) {
    if (subMenuOpen) {
      setSubMenuOpen(false)
      setSubMenuHiderStyle({
        height: 0,
        padding: '0 15px',
        // padding: 0,
        visibility: 'hidden',
      })
    } else {
      setSubMenuOpen(true)
      setSubMenuHiderStyle({
        height: subMenuContent.current.offsetHeight + 30,
        // padding: 15,
        // padding: 0,
        padding: '0 15px',
        visibility: 'visible',
      })
    }
    // }
  }

  const closeSubmenu = () => {
    if (window.innerWidth > 1170) {
      setSubMenuOpen(false)
      setSubMenuHiderStyle({
        height: 0,
        padding: '0 15px',
        // padding: 0,
        visibility: 'hidden',
      })
    }
  }

  const openSubmenu = () => {
    if (window.innerWidth > 1170) {
      setSubMenuOpen(true)
      setSubMenuHiderStyle({
        height: subMenuContent.current.offsetHeight + 30,
        // padding: 15,
        // padding: 0,
        padding: '0 15px',
        visibility: 'visible',
      })
    }
  }

  return (
    <div
      className={styles.subMenu}
      onMouseEnter={openSubmenu}
      onMouseLeave={closeSubmenu}
      onBlur={closeSubmenu}
      aria-expanded="false"
    >
      <button
        onClick={toggleSubmenu}
        className={styles.subMenuButton}
        aria-label={`Expand ${props.name} Submenu`}
        style={subMenuButtonStyle}
      >
        {props.name}{' '}
        <span style={{ fontFamily: 'Open Sans', fontSize: '.7em' }}>
          &#9660;
        </span>
      </button>
      <div
        ref={subMenuHiderRef}
        className={styles.subMenuHider}
        style={subMenuHiderStyle}
        onFocus={openSubmenu}
      >
        <div className={styles.subMenuContent} ref={subMenuContent}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default NavDropdown
