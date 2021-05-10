import React from 'react';

import './each-anime-reaction.css';

const Reaction = (props) => (
  <div className="reaction-items">
    <div className="upvote">
      <div className="gray">▲</div>
      <div className="gray">{props.upvote}</div>
    </div>
    <div>
      <p
        className="gray"
        style={{
          fontFamily: "'Asap', sans-serif",
          marginBottom: '5px',
          fontSize: '13px',
        }}
        onClick={props.otherUser}
      >
        {props.username}
      </p>
      <div className="reaction-message" onClick={props.clicked}>
        {props.reactionMessage}
      </div>
    </div>
  </div>
);

export default Reaction;
