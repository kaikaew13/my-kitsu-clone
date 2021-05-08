import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './user-reaction.css';
import UserEachReaction from '../../../components/library/user-each-reaction/user-each-reaction';

const URL = process.env.REACT_APP_URL;

const UserReaction = (props) => {
  // console.log(props.socket);
  const [reactionlist, setReactionlist] = useState(props.user.reactionlist);

  // useEffect(() => {
  //   props.socket.on('post-reaction', ({ reaction }) => {
  //     const newReaction = {
  //       userId: reaction.userId,
  //       username: 'socket',
  //       reactionMessage: reaction.reactionMessage,
  //       upvote: reaction.upvote,
  //       reactionId: reaction._id.toString(),
  //     };
  //     setReactionlist([...reactionlist, newReaction]);
  //   });
  // }, [props.socket, reactionlist]);

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

const mapStateToProps = (state) => {
  return {
    socket: state.socket.socket,
  };
};

export default connect(mapStateToProps)(UserReaction);
