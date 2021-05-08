import React from 'react';

import '../../../containers/library/user-reaction/user-reaction.css';

const UserEachReaction = (props) => (
  <div className="user-reaction-items" style={props.wider && { width: '56%' }}>
    <div className="user-reaction-reaction">
      <div className="user-reaction-header">
        <div className="user-reaction-upvote">
          <span>▲</span> <span>{props.upvote}</span>
        </div>
        {props.self && <div className="user-reaction-dropdown">● ● ●</div>}
      </div>
      <div>
        <p className="user-reaction-title">
          {props.title} <span>TV</span>
        </p>
        <p className="user-reaction-desc">{props.reactionMessage}</p>
      </div>
    </div>
    <img src={props.url} alt="" />
  </div>
);

export default UserEachReaction;
