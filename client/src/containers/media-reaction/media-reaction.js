import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../library/user-reaction/user-reaction.css';
import './media-reaction.css';
import '../library/follow/follow.css';
import UserEachReaction from '../../components/library/user-each-reaction/user-each-reaction';

const URL = process.env.REACT_APP_URL;
const PATH = 'media-reaction';

const MediaReaction = (props) => {
  const { match, setNav } = props;
  const history = useHistory();
  const [reaction, setReaction] = useState(null);
  const [preventDoubleClick, setPreventDoubleClick] = useState(false);
  const [upvote, setUpvote] = useState(null);

  useEffect(() => {
    setNav(PATH);
    (async () => {
      const res = await fetch(
        URL + '/get-each-reaction/' + match.params.reactionId
      );
      if (res.status !== 200) window.location.replace('/');
      const resData = await res.json();
      // console.log(resData);
      setReaction(resData.reaction);
    })();
  }, [match.params.reactionId, setNav, props.socket, upvote]);

  const upvoteHandler = async (id) => {
    setPreventDoubleClick(true);
    if (props.upvotedlist[id]) {
      const res = await fetch(URL + '/user/un-upvote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.jwt,
        },
        body: JSON.stringify({
          reactionId: id,
        }),
      });
      if (res.status !== 200) {
        // throw new Error('failed to un-upvote');
        alert('action failed');
        return;
      }
      const resData = await res.json();
      // console.log(resData);
      setUpvote(resData.upvote);
    } else {
      const res = await fetch(URL + '/user/upvote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.jwt,
        },
        body: JSON.stringify({
          reactionId: id,
        }),
      });
      if (res.status !== 200) {
        // throw new Error('failed to un-upvote');
        alert('action failed');
        return;
      }
      const resData = await res.json();
      // console.log(resData);
      setUpvote(resData.upvote);
    }
    setTimeout(() => {
      // console.log('prevent off..');
      setPreventDoubleClick(false);
    }, 1000);
  };

  const followHandler = async (targetUserId, buttonText) => {
    setPreventDoubleClick(true);
    const endpoint = buttonText === 'Follow' ? 'follow-user' : 'unfollow-user';
    const res = await fetch(URL + '/user/' + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.jwt,
      },
      body: JSON.stringify({
        targetUserId: targetUserId,
      }),
    });
    if (res.status !== 200) {
      // throw new Error('failed to follow user');
      alert('action failed');
      return;
    }
    await res.json();

    alert(buttonText + ' the targeted user');
    setTimeout(() => setPreventDoubleClick(false), 1000);
  };

  const deleteReactionHandler = async (reactionId) => {
    const res = await fetch(URL + '/user/delete-reaction', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.jwt,
      },
      body: JSON.stringify({ reactionId: reactionId }),
    });
    if (res.status !== 200) {
      // throw new Error('failed to delete a post');
      alert('action failed');
      return;
    }
    await res.json();
    // console.log(resData);
  };

  let loading = reaction ? false : true;
  let self;
  if (!loading) self = props.user && props.user.id === reaction.userId._id;
  // console.log(props);
  let buttonText = 'Follow';
  if (!loading && props.user && reaction) {
    const found = props.user.following.find(
      (eachUser) => eachUser._id.toString() === reaction.userId._id.toString()
    );
    if (props.page === 'following' || found) buttonText = 'Unfollow';
  }
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="reaction-section" style={{ width: '65%', display: 'flex' }}>
      <UserEachReaction
        editted={() =>
          props.openModal({
            title: reaction.animeId.title,
            id: reaction._id,
            reactionMessage: reaction.reactionMessage,
          })
        }
        upvoted={() =>
          !props.jwt
            ? props.openModal()
            : !preventDoubleClick
            ? upvoteHandler(reaction._id)
            : null
        }
        upvote={upvote !== null ? upvote : reaction.upvote}
        disabledUpvote={
          props.jwt && props.upvotedlist && props.upvotedlist[reaction._id]
            ? true
            : false
        }
        deleted={() => deleteReactionHandler(reaction._id)}
        self={self}
        wider={true}
        reactionMessage={reaction.reactionMessage}
        title={reaction.animeId.title}
        url={URL + reaction.animeId.imageUrl}
      />
      <div className="m-r-user-container">
        <div style={{ position: 'relative' }}>
          <img src={URL + '/images/bg-user.png'} alt="" />
          <h4
            className="user-username"
            onClick={() =>
              history.push(
                '/others-library/' + reaction.userId._id + '/library'
              )
            }
          >
            {reaction.userId.username}
          </h4>
        </div>
        <div>
          <div className="profile-pic-wrapper">
            <img
              onClick={() =>
                history.push(
                  '/others-library/' + reaction.userId._id + '/library'
                )
              }
              alt=""
              className="profile-pic"
              src={URL + '/images/profile-pic.png'}
            />
          </div>
          <button
            className="follow-btn small-center"
            disabled={self}
            onClick={() =>
              !preventDoubleClick
                ? followHandler(reaction.userId._id, buttonText)
                : null
            }
          >
            {self ? "Hey, that's you!" : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    jwt: state.auth.jwt,
    socket: state.socket.socket,
    upvotedlist: state.user.upvotedlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNav: (path) => dispatch({ type: 'SET_NAV', path: path }),
    openModal: (payload) => {
      if (payload)
        dispatch({
          type: 'OPEN_MODAL',
          which: 'reaction-modal',
          payload: payload,
        });
      else dispatch({ type: 'OPEN_MODAL', which: 'login-modal' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaReaction);
