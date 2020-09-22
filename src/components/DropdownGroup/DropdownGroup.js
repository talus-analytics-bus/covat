import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './DropdownGroup.module.scss'

const DropdownGroup = props => {
  // Shared state so that each dropdown
  // component can know when another is
  // open or closed.
  const [open, setOpen] = useState(0)

  // Add open and setOpen Props to Children
  let id = 0
  const children = React.Children.map(props.children, child => {
    id++
    return React.cloneElement(child, {
      id: id,
      open: open,
      setOpen: setOpen,
    })
  })

  return (
    <>
      <div
        role="button"
        className={styles.closer}
        onClick={() => {
          setOpen(0)
        }}
        style={open === 0 ? { display: 'none' } : { display: 'block' }}
      ></div>
      {children}
    </>
  )
}

DropdownGroup.propTypes = { children: PropTypes.node.isRequired }

export default DropdownGroup
