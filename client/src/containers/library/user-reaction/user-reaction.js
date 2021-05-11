import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import './user-reaction.css';
import UserEachReaction from '../../../components/library/user-each-reaction/user-each-reaction';

const URL = process.env.REACT_APP_URL;

const UserReaction = (props) => {
  const reactionlist = props.user.reactionlist;
  const history = useHistory();

  const deleteReactionHandler = async (reactionId) => {
    const res = await fetch(URL + '/user/delete-reaction', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.jwt,
      },
      body: JSON.stringify({
        reactionId: reactionId,
      }),
    });
    if (res.status !== 200) {
      // throw new Error('failed to delete a reaction');
      alert('action failed');
      return;
    }
    await res.json();
    // console.log(resData);
  };

  return (
    <div className="reaction-section">
      <div className="user-reaction-container">
        {reactionlist.map((each) => (
          <UserEachReaction
            self={true}
            clicked={() => history.push('/media-reaction/' + each._id)}
            editted={() =>
              props.openModal({
                title: props.animelist[each.animeId].animeId.title,
                id: each._id,
                reactionMessage: each.reactionMessage,
              })
            }
            deleted={() => deleteReactionHandler(each._id)}
            key={each._id}
            upvote={each.upvote}
            reactionMessage={each.reactionMessage}
            title={props.animelist[each.animeId].animeId.title}
            url={URL + props.animelist[each.animeId].animeId.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (payload) =>
      dispatch({
        type: 'OPEN_MODAL',
        which: 'reaction-modal',
        payload: payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReaction);
