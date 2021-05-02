import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import NavContainer from './containers/navigation/nav-container';
import SectionContainer from './containers/section/section-container';
import GenreContainer from './containers/genre/genre-container';
import Modal from './containers/modal/modal';
import Backdrop from './components/UI/backdrop';

function App(props) {
  const resetJWT = props.resetJWT;
  const logoutHandler = useCallback(() => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('jwt-expire-time');
    resetJWT();
  }, [resetJWT]);

  const setAutoLogout = useCallback(
    (time) => {
      if (time > new Date().getTime()) {
        setTimeout(() => {
          logoutHandler();
        }, time - new Date().getTime());
      } else logoutHandler();
    },
    [logoutHandler]
  );
  useEffect(() => {
    if (props.expireTime) {
      setAutoLogout(props.expireTime);
    }
  }, [props.expireTime, setAutoLogout]);

  return (
    <div className="App">
      {props.showModal ? (
        <React.Fragment>
          <Modal />
          <Backdrop class="backdrop-dark" clicked={props.toggleShowModal} />
        </React.Fragment>
      ) : null}

      <NavContainer />
      <SectionContainer />
      <GenreContainer />
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
    resetJWT: () => dispatch({ type: 'RESET_JWT' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
