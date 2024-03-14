import React from "react"
import PropTypes from "prop-types"

const Square = (props) => {
  return (
    <div>
      {props.token}
    </div>
  )
}

Square.propTypes = {
  token: PropTypes.string
};

export default Square
