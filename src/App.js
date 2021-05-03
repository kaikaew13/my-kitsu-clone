import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import NavContainer from './containers/navigation/nav-container';
import SectionContainer from './containers/section/section-container';
import GenreContainer from './containers/genre/genre-container';
import Modal from './containers/modal/modal';
import Backdrop from './components/UI/backdrop';

function App(props) {
  const { logout, setJWT } = props;
  const logoutHandler = useCallback(() => {
    logout();
  }, [logout]);

  const setAutoLogout = useCallback(
    (time) => {
      if (time > new Date().getTime()) {
        setJWT(
          localStorage.getItem('jwt'),
          localStorage.getItem('jwt-expire-time')
        );
        setTimeout(() => {
          logoutHandler();
        }, time - new Date().getTime());
      } else logoutHandler();
    },
    [logoutHandler, setJWT]
  );
  useEffect(() => {
    const time = localStorage.getItem('jwt-expire-time');
    console.log(typeof time === 'string');
    console.log(new Date(time).getTime());
    if (time) {
      setAutoLogout(new Date(time).getTime());
    }
  }, [setAutoLogout]);

  return (
    <div className="App">
      {props.showModal ? (
        <React.Fragment>
          <Modal />
          <Backdrop class="backdrop-dark" clicked={props.toggleShowModal} />
        </React.Fragment>
      ) : null}

      <NavContainer />
      <div className="section-and-genre-wrapper">
        <SectionContainer />
        <div className="genre-wrapper">
          <GenreContainer />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showModal: state.webGeneral.showModal,
    expireTime: state.auth.jwtExpire,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowModal: () => dispatch({ type: 'CLOSE_MODAL' }),
    setJWT: (jwt, expireTime) =>
      dispatch({ type: 'SET_JWT', jwt: jwt, expireTime: expireTime }),
    logout: () => dispatch({ type: 'LOGOUT' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
