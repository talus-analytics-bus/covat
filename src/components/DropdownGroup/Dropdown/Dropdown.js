import React from 'react'

import styles from './Dropdown.module.scss'

const CustomDropdown = props => {
  const children = React.Children.toArray(props.children)

  const content = React.useRef()
  // const [hiderStyle, setHiderStyle] = React.useState({
  //   height: 0,
  //   padding: '0 15px 0 15px'
  // });

  let hiderStyle = {
    height: 0,
    padding: '0 15px 0 15px',
  }

  if (props.open === props.id) {
    hiderStyle = {
      height: content.current.offsetHeight + 15,
      padding: '0 15px 15px 15px',
    }
  } else {
    hiderStyle = {
      height: 0,
      padding: '0 15px 0 15px',
    }
  }

  return (
    <div
      className={styles.dropDown}
      style={props.open === props.id ? {} : { backgroundColor: '#F5F5F5' }}
    >
      <button
        tabIndex="0"
        className={styles.label}
        onClick={() => {
          props.open === props.id ? props.setOpen(0) : props.setOpen(props.id)
        }}
      >
        {children[0]}
      </button>
      <div
        className={styles.hider}
        style={hiderStyle}
        aria-hidden={!(props.open === props.id)}
      >
        <div className={styles.content} ref={content}>
          {children.slice(1)}
        </div>
      </div>
    </div>
  )
}

export default CustomDropdown
