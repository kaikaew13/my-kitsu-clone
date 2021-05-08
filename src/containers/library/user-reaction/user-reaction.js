import React from 'react';

import './user-reaction.css';
import UserEachReaction from '../../../components/library/user-each-reaction/user-each-reaction';

const URL = process.env.REACT_APP_URL;

const UserReaction = (props) => {
  const reactionlist = props.user.reactionlist;

  return (
    <div className="reaction-section">
      <div className="user-reaction-container">
        {reactionlist.map((each) => (
          <UserEachReaction
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

export default UserReaction;
