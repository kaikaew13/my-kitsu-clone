import React from 'react';
import { connect } from 'react-redux';

import EachNav from '../../components/each-nav/each-nav';
import './navigation.css';

const NavSection = (props) =>
  props.navClass === 'nav-right' ? (
    <nav className={props.navClass}>
      {props.loggedIn ? (
        <EachNav
          dropdown={true}
          dropdownList={[
            { name: 'View Profile', to: '/' },
            { name: 'Settings', to: '/' },
            { name: 'Logout', to: '/' },
          ]}
        >
          profile-pic
        </EachNav>
      ) : (
        <React.Fragment>
          <EachNav
            dropdown={false}
            clicked={() => props.toggleShowModal('auth-option-modal')}
          >
            Sign Up
          </EachNav>
          <EachNav
            dropdown={false}
            clicked={() => props.toggleShowModal('login-modal')}
          >
            Sign In
          </EachNav>
        </React.Fragment>
      )}
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

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.jwt ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowModal: (which) => dispatch({ type: 'OPEN_MODAL', which: which }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavSection);
