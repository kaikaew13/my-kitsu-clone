import React from 'react';

import NavSection from './nav-section';
import './navigation.css';

const NavContainer = (props) => (
  <div
    className={
      props.transparent ? 'nav-container transparent' : 'nav-container'
    }
  >
    <NavSection navClass="nav-left" />
    <NavSection navClass="nav-right" />
  </div>
);

export default NavContainer;
