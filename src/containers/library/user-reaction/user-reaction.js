import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import './user-reaction.css';
import UserEachReaction from '../../../components/library/user-each-reaction/user-each-reaction';

const URL = process.env.REACT_APP_URL;

const UserReaction = (props) => {
  const reactionlist = props.user.reactionlist;
  const history = useHistory();

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

export default connect(null, mapDispatchToProps)(UserReaction);
