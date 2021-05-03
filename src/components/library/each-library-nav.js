import React from 'react';
import { Link } from 'react-router-dom';

import '../../containers/library/library-header/library-header.css';

const EachLibraryNav = (props) => (
  <Link to={props.href} className="library-nav-items">
    {props.children}
  </Link>
);

export default EachLibraryNav;
