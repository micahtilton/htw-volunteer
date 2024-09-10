import React from "react";
import PropTypes from "prop-types";

export default function Bento({ text, className = "" }) {
  return <h2 className={"bento " + className}>{text}</h2>;
}

Bento.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};
