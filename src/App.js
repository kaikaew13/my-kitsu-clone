import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import NavContainer from './containers/navigation/nav-container';
import Home from './containers/home/home';
import Library from './containers/library/library';
import Modal from './containers/modal/modal';
import Backdrop from './components/UI/backdrop';

function App(props) {
  const { logout, setJWT, setLoading, unsetLoading } = props;
  const logoutHandler = useCallback(() => {
    logout();
    unsetLoading();
  }, [logout, unsetLoading]);

  // const getUser = async () => {
  //   localStorage.getItem
  // }

  const setAutoLogout = useCallback(
    (time) => {
      if (time > new Date().getTime()) {
        // getUser();
        setJWT(
          localStorage.getItem('jwt'),
          localStorage.getItem('jwt-expire-time')
        );
        unsetLoading();
        setTimeout(() => {
          logoutHandler();
        }, time - new Date().getTime());
      } else logoutHandler();
    },
    [logoutHandler, setJWT, unsetLoading]
  );
  useEffect(() => {
    setLoading();
    const time = localStorage.getItem('jwt-expire-time');
    console.log(typeof time === 'string');
    console.log(new Date(time).getTime());
    if (time) {
      setAutoLogout(new Date(time).getTime());
    } else unsetLoading();
  }, [setAutoLogout, setLoading, unsetLoading]);

  return (
    <div className="App">
      {props.showModal ? (
        <React.Fragment>
          <Modal />
          <Backdrop class="backdrop-dark" clicked={props.toggleShowModal} />
        </React.Fragment>
      ) : null}
      <NavContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/library" exact component={Library} />
      </Switch>
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
    setLoading: () => dispatch({ type: 'SET_LOADING' }),
    unsetLoading: () => dispatch({ type: 'UNSET_LOADING' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
