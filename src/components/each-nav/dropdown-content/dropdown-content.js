import React from 'react';

const DropdownContent = (props) => (
  <a href={props.href} className="dropdown-content-items">
    {props.children}
  </a>
);

export default DropdownContent;
