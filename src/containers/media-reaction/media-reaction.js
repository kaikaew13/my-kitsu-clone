import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import '../library/user-reaction/user-reaction.css';
import './media-reaction.css';
import '../library/follow/follow.css';
import UserEachReaction from '../../components/library/user-each-reaction/user-each-reaction';

const URL = process.env.REACT_APP_URL;
const PATH = 'media-reaction';

const MediaReaction = (props) => {
  const { match, setNav } = props;
  const [reaction, setReaction] = useState(null);
  const [preventDoubleClick, setPreventDoubleClick] = useState(false);

  useEffect(() => {
    setNav(PATH);
    (async () => {
      const res = await fetch(
        URL + '/get-each-reaction/' + match.params.reactionId
      );
      if (res.status !== 200) window.location.replace('/');
      const resData = await res.json();
      console.log(resData);
      setReaction(resData.reaction);
    })();
  }, [match.params.reactionId, setNav]);

  const followHandler = async () => {
    setPreventDoubleClick(true);
    const res = await fetch(URL + '/user/follow-user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.jwt,
      },
      body: JSON.stringify({
        targetUserId: reaction.userId._id,
      }),
    });
    if (res.status !== 200) throw new Error('failed to follow target user');
    await res.json();
    alert('followed the targeted user');
  };

  let loading = reaction ? false : true;
  let self;
  if (!loading) self = props.user && props.user.id === reaction.userId._id;
  console.log(props);
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
        self={self}
        wider={true}
        upvote={reaction.upvote}
        reactionMessage={reaction.reactionMessage}
        title={reaction.animeId.title}
        url={URL + reaction.animeId.imageUrl}
      />
      <div className="m-r-user-container">
        <div style={{ position: 'relative' }}>
          <img src={URL + '/images/bg-user.png'} alt="" />
          <h4 className="user-username">{reaction.userId.username}</h4>
        </div>
        <div>
          <div className="profile-pic-wrapper">
            <img
              alt=""
              className="profile-pic"
              src={URL + '/images/profile-pic.png'}
            />
          </div>
          <button
            className="follow-btn small-center"
            disabled={self}
            onClick={() =>
              !preventDoubleClick ? followHandler() : console.log('clicked')
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNav: (path) => dispatch({ type: 'SET_NAV', path: path }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaReaction);
