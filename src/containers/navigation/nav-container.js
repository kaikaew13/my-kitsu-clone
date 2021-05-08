import React from 'react';
import { connect } from 'react-redux';

import NavSection from './nav-section';
import './navigation.css';

const NavContainer = (props) => (
  <div
    className={
      props.transparentNav ? 'nav-container transparent' : 'nav-container'
    }
  >
    <NavSection navClass="nav-left" />
    <NavSection navClass="nav-right" />
  </div>
);

const mapStateToProps = (state) => {
  return {
    transparentNav: state.webGeneral.transparentNav,
  };
};

export default connect(mapStateToProps)(NavContainer);
