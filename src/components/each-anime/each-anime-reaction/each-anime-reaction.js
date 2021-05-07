import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import Reaction from './reaction';
import './each-anime-reaction.css';

const URL = process.env.REACT_APP_URL;

const EachAnimeReaction = (props) => {
  const history = useHistory();
  const [reactionlist, setReactionlist] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(URL + '/get-reaction/' + props.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status !== 200) throw new Error('failed to fetch reactions');
      const resData = await res.json();
      // console.log(resData);
      setReactionlist(
        resData.reactions.map((each) => {
          return {
            userId: each.userId._id.toString(),
            username: each.userId.username,
            reactionMessage: each.reactionMessage,
            upvote: each.upvote,
            reactionId: each._id.toString(),
          };
        })
      );
    })();
  }, [props.id]);

  return (
    <div className="reaction-container">
      <div className="reaction-header">
        <h5>Reactions</h5>
        {props.inLib && (
          <h5
            onClick={() =>
              props.openReactionModal({
                title: props.title,
                id: props.id,
              })
            }
            className="new-reaction"
          >
            New Reactions
          </h5>
        )}
      </div>
      <div className="reaction-content">
        {reactionlist.map((each) => (
          <Reaction
            key={each.reactionId}
            id={each.userId}
            username={each.username}
            reactionMessage={each.reactionMessage}
            upvote={each.upvote}
          />
        ))}
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
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openReactionModal: (payload) =>
      dispatch({
        type: 'OPEN_MODAL',
        which: 'reaction-modal',
        payload: payload,
      }),
  };
};

export default connect(null, mapDispatchToProps)(EachAnimeReaction);
