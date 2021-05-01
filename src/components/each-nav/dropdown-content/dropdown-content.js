import React from 'react';

import '../../../containers/navigation/navigation.css';

const DropdownContent = (props) => (
  <a href={props.href} className="dropdown-content-items">
    {props.children}
  </a>
);

export default DropdownContent;
