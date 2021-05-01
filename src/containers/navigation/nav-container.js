import React from 'react';

import NavSection from './nav-section';
import './navigation.css';

const NavContainer = (props) => (
  <div className="nav-container">
    <NavSection navClass="nav-left" />
    <NavSection navClass="nav-right" />
  </div>
);

export default NavContainer;
