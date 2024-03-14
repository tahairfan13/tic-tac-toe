import React from "react"
import PropTypes from "prop-types"
import Square from "./Square"

const Home = (props) => {
  return (
    <React.Fragment>
      {["X", "O", "X", "", "", "", "", "", ""].map((token, key) => <Square key={key} token={token} />)}
    </React.Fragment>
  )
}

Home.propTypes = {
  greeting: PropTypes.string
};

export default Home
