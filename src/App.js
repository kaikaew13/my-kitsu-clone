import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavContainer from './containers/navigation/nav-container';
import Home from './containers/home/home';
import Library from './containers/library/library';
import Modal from './containers/modal/modal';
import Backdrop from './components/UI/backdrop';

const URL = process.env.REACT_APP_URL;

function App(props) {
  const {
    logout,
    setJWT,
    setLoading,
    unsetLoading,
    setUser,
    setAnimelist,
    unsetUser,
  } = props;
  const logoutHandler = useCallback(() => {
    logout();
    unsetUser();
    unsetLoading();
  }, [logout, unsetLoading, unsetUser]);

  const getUser = useCallback(
    async (time) => {
      const jwt = localStorage.getItem('jwt');
      const expireTime = localStorage.getItem('jwt-expire-time');
      const res = await fetch(URL + '/user/get-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      });
      if (res.status !== 200) throw new Error('failed to fetch the user');
      const resData = await res.json();
      const user = resData.user;
      setUser({
        id: user._id,
        username: user.username,
        followers: user.followers,
        following: user.following,
        role: user.role,
      });
      const animelist = {};
      user.animelist.forEach((each) => {
        animelist[each.animeId._id.toString()] = each;
      });
      setAnimelist(animelist);
      setJWT(jwt, expireTime);
      unsetLoading();
      setTimeout(() => {
        logoutHandler();
      }, time - new Date().getTime());
    },
    [setJWT, unsetLoading, logoutHandler, setUser, setAnimelist]
  );

  const setAutoLogout = useCallback(
    (time) => {
      if (time > new Date().getTime()) {
        getUser(time);
      } else logoutHandler();
    },
    [logoutHandler, getUser]
  );
  useEffect(() => {
    setLoading();
    const time = localStorage.getItem('jwt-expire-time');
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
        <Redirect to="/" />
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
    setUser: (user) => dispatch({ type: 'SET_USER', user: user }),
    setAnimelist: (animelist) =>
      dispatch({ type: 'SET_ANIMELIST', animelist: animelist }),
    unsetUser: () => dispatch({ type: 'UNSET_USER' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
