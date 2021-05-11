import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../containers/library/library-header/library-header.css';

const EachLibraryNav = (props) => {
  let linkClass = 'library-nav-items';
  if (props.active) linkClass += ' library-nav-items-active';
  return (
    <NavLink to={props.href} className={linkClass}>
      {props.children}
    </NavLink>
  );
};

export default EachLibraryNav;
