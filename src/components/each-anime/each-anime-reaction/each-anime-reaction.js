import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Reaction from './reaction';
import './each-anime-reaction.css';

const URL = process.env.REACT_APP_URL;

const EachAnimeReaction = (props) => {
  const history = useHistory();

  const [upvote, setUpvote] = useState(null);
  const [preventDoubleClick, setPreventDoubleClick] = useState(false);
  // console.log('prevent double click', preventDoubleClick);

  useEffect(() => {}, [upvote]);

  const upvoteHandler = async (id) => {
    console.log(id);
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
      if (res.status !== 200) throw new Error('failed to un-upvote');
      const resData = await res.json();
      console.log(resData);
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
      if (res.status !== 200) throw new Error('failed to upvote');
      const resData = await res.json();
      console.log(resData);
      setUpvote(resData.upvote);
    }
    setTimeout(() => {
      // console.log('prevent off..');
      setPreventDoubleClick(false);
    }, 2000);
  };

  return props.reactionlist.length > 0 ? (
    <div className="reaction-container">
      <div className="reaction-header">
        <h5>Reactions</h5>
        {props.inLib && (
          <h5
            onClick={() =>
              props.openModal({
                title: props.title,
                id: props.id.toString(),
              })
            }
            className="new-reaction"
          >
            New Reactions
          </h5>
        )}
      </div>
      <div className="reaction-content">
        {props.reactionlist.map(
          (each, index) =>
            (!props.viewmore || index <= 5) && (
              <Reaction
                otherUser={() =>
                  history.push(
                    '/others-library/' + each.userId._id + '/library'
                  )
                }
                clicked={() => history.push('/media-reaction/' + each._id)}
                upvoted={() =>
                  !props.jwt
                    ? props.openModal()
                    : !preventDoubleClick
                    ? upvoteHandler(each._id)
                    : console.log('prevent double click...')
                }
                key={each._id.toString()}
                id={each.userId._id}
                username={each.userId.username}
                reactionMessage={each.reactionMessage}
                // upvote={upvote !== null ? upvote : each.upvote}
                upvote={each.upvote}
                disabledUpvote={
                  props.jwt && props.upvotedlist && props.upvotedlist[each._id]
                    ? true
                    : false
                }
              />
            )
        )}
        {props.viewmore && (
          <div
            className="view-more-reaction"
            onClick={() =>
              history.push('/each-anime/' + props.id + '/reactions')
            }
          >
            View More Reactions
          </div>
        )}
      </div>
    </div>
  ) : props.reactionpage ? (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: '16px',
        marginTop: '16px',
      }}
    >
      This anime has no reactions
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
    upvotedlist: state.user.upvotedlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(EachAnimeReaction);
