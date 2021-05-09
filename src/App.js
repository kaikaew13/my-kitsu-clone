import React, { useEffect, useCallback, useState } from 'react';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavContainer from './containers/navigation/nav-container';
import Home from './containers/home/home';
import Library from './containers/library/library';
import Modal from './containers/modal/modal';
import Backdrop from './components/UI/backdrop';
import EachAnime from './containers/each-anime/each-anime';
import Admin from './containers/admin/admin';
import MediaReaction from './containers/media-reaction/media-reaction';

const URL = process.env.REACT_APP_URL;

function App(props) {
  const [socketStatus, setSocketStatus] = useState(false);
  const {
    logout,
    setJWT,
    setLoading,
    unsetLoading,
    setUser,
    setAnimelist,
    unsetUser,
    setSocket,
  } = props;
  const logoutHandler = useCallback(() => {
    logout();
    unsetUser();
    unsetLoading();
  }, [logout, unsetLoading, unsetUser]);

  const getUser = useCallback(
    async (time, socket) => {
      const jwt = localStorage.getItem('jwt');
      const expireTime = localStorage.getItem('jwt-expire-time');
      const res = await fetch(URL + '/user/get-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      });
      if (res.status !== 200) {
        alert('failed to login');
        return logoutHandler();
      }
      const resData = await res.json();
      const user = resData.user;

      setUser({
        id: user._id,
        username: user.username,
        followers: user.followers,
        following: user.following,
        role: user.role,
        reactionlist: user.reactionlist,
      });
      socket.emit('setUserId', user._id);
      const animelist = {};
      user.animelist.forEach((each) => {
        if (each.animeId) animelist[each.animeId._id.toString()] = each;
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
    (time, socket) => {
      if (time > new Date().getTime()) {
        getUser(time, socket);
      } else logoutHandler();
    },
    [logoutHandler, getUser]
  );
  useEffect(() => {
    const socket = io(URL);
    setSocket(socket);
    socket.on('post-reaction', (data) => {
      // console.log(data);
      setSocketStatus(!socketStatus);
    });
    socket.on('follow-user-sender', (message) => {
      setSocketStatus(!socketStatus);
    });
    socket.on('follow-user-receiver', (message) => {
      setSocketStatus(!socketStatus);
    });
    setLoading();
    const time = localStorage.getItem('jwt-expire-time');
    // console.log(new Date(time).getTime());
    if (time) {
      setAutoLogout(new Date(time).getTime(), socket);
    } else unsetLoading();
    return () => {
      socket.disconnect();
    };
  }, [setAutoLogout, setLoading, unsetLoading, setSocket, socketStatus]);
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
        <Route path="/explore" component={Home} />
        <Route path="/library" component={Library} />
        <Route path="/each-anime/:animeId" component={EachAnime} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/media-reaction/:reactionId" component={MediaReaction} />
        <Redirect to="/explore/home" />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showModal: state.webGeneral.showModal,
    expireTime: state.auth.jwtExpire,
    user: state.user.user,
    socket: state.socket.socket,
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
    setSocket: (socket) => dispatch({ type: 'SET_SOCKET', socket: socket }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
