import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import EachNav from '../../components/each-nav/each-nav';
import './navigation.css';

const NavSection = (props) => {
  const history = useHistory();

  return props.navClass === 'nav-right' ? (
    <nav className={props.navClass}>
      {props.loggedIn ? (
        <EachNav
          dropdown={true}
          dropdownList={[
            { name: 'View Profile', clicked: () => {} },
            { name: 'Settings', clicked: () => {} },
            {
              name: 'Logout',
              clicked: props.logout,
            },
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
            clicked={() => props.toggleShowModal('reaction-modal')}
          >
            Sign In
          </EachNav>
        </React.Fragment>
      )}
    </nav>
  ) : (
    <nav className={props.navClass}>
      <EachNav dropdown={false} clicked={() => history.push('/')}>
        logo
      </EachNav>
      {props.loggedIn ? (
        <EachNav
          dropdown={false}
          clicked={() => history.push('/library/library')}
        >
          Library
        </EachNav>
      ) : null}
      <EachNav
        dropdown={true}
        dropdownList={[
          { name: 'anime', clicked: () => history.push('/') },
          { name: 'manga', clicked: () => {} },
        ]}
      >
        Browse ▾
      </EachNav>
      <EachNav dropdown={false}>Groups</EachNav>
      <EachNav
        dropdown={true}
        dropdownList={[
          { name: '/', clicked: () => {} },
          { name: '/', clicked: () => {} },
          { name: '/', clicked: () => {} },
        ]}
      >
        Feedback ▾
      </EachNav>
      {props.role === 'admin' ? (
        <EachNav dropdown={false} clicked={() => history.push('/admin')}>
          Add Anime
        </EachNav>
      ) : null}
    </nav>
  );
};
const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.jwt ? true : false,
    role: state.user.user ? state.user.user.role : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowModal: (which) => dispatch({ type: 'OPEN_MODAL', which: which }),
    logout: () => dispatch({ type: 'LOGOUT' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavSection);
