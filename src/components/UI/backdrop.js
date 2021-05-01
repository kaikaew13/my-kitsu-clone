import React from 'react';

import './backdrop.css';

const Backdrop = (props) => (
  <div className={props.class} onClick={props.clicked}></div>
);

export default Backdrop;
