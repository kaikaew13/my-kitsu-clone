import React from 'react';

import '../../../containers/navigation/navigation.css';

const DropdownContent = (props) => (
  <p className="dropdown-content-items" onClick={props.clicked}>
    {props.children}
  </p>
);

export default DropdownContent;
