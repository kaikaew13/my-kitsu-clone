import React from 'react';

const Backdrop = (props) => (
  <div className={props.class} onClick={props.clicked}></div>
);

export default Backdrop;
