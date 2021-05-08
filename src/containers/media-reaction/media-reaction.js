import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import '../library/user-reaction/user-reaction.css';
import './media-reaction.css';
import '../library/follow/follow.css';
import UserEachReaction from '../../components/library/user-each-reaction/user-each-reaction';

const URL = process.env.REACT_APP_URL;

const MediaReaction = (props) => {
  const { match } = props;
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        URL + '/get-each-reaction/' + match.params.reactionId
      );
      if (res.status !== 200) window.location.replace('/');
      const resData = await res.json();
      console.log(resData);
      setReaction(resData.reaction);
    })();
  }, [match.params.reactionId]);

  const followHandler = async () => {
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
            onClick={followHandler}
          >
            {self ? "Hey, that's you!" : 'Follow'}
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

export default connect(mapStateToProps)(MediaReaction);
