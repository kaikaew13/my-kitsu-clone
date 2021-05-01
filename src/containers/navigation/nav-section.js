import React from 'react';
import { connect } from 'react-redux';

import EachNav from '../../components/each-nav/each-nav';
import './navigation.css';

const NavSection = (props) =>
  props.navClass === 'nav-right' ? (
    <nav className={props.navClass}>
      <EachNav
        dropdown={false}
        clicked={() => props.toggleShowModal('auth-option-modal')}
      >
        Sign Up
      </EachNav>
      <EachNav dropdown={false}>Sign In</EachNav>
    </nav>
  ) : (
    <nav className={props.navClass}>
      <EachNav dropdown={false}>logo</EachNav>
      <EachNav
        dropdown={true}
        dropdownList={[
          { name: 'anime', to: '/' },
          { name: 'manga', to: '/' },
        ]}
      >
        Browse
      </EachNav>
      <EachNav dropdown={false}>Groups</EachNav>
      <EachNav
        dropdown={true}
        dropdownList={[
          { name: '/', to: '/' },
          { name: '/', to: '/' },
          { name: '/', to: '/' },
        ]}
      >
        Feedback
      </EachNav>
    </nav>
  );

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowModal: (which) => dispatch({ type: 'OPEN_MODAL', which: which }),
  };
};

export default connect(null, mapDispatchToProps)(NavSection);
