import React from 'react';

import '../../../containers/library/user-reaction/user-reaction.css';
import '../../../containers/navigation/navigation.css';
import EachNav from '../../each-nav/each-nav';

const UserEachReaction = (props) => (
  <div className="user-reaction-items" style={props.wider && { width: '56%' }}>
    <div className="user-reaction-reaction">
      <div className="user-reaction-header">
        <div className="user-reaction-upvote">
          <span>▲</span> <span>{props.upvote}</span>
        </div>
        {props.self && (
          // <div className="user-reaction-dropdown dropdown">

          //   <button
          //     onClick={() => {}}
          //     className="drop-btn dropdown-content-show"
          //     id="drop-btn-browse"
          //   >
          //     ● ● ●
          //   </button>

          //   <div className="dropdown-content">
          //     <p className="dropdown-content-items" onClick={props.clicked}>
          //       yey
          //     </p>
          //   </div>
          // </div>
          <EachNav
            dropdown={true}
            dropdownList={[
              { name: 'Copy Link to Reaction', clicked: () => {} },
              { name: 'Edit Reaction', clicked: props.clicked },
              { name: 'Delete Reaction', clicked: () => {} },
            ]}
            mediaReaction={true}
          >
            ● ● ●
          </EachNav>
        )}
      </div>
      <div>
        <p className="user-reaction-title">
          {props.title} <span>TV</span>
        </p>
        <p className="user-reaction-desc" onClick={props.clicked}>
          {props.reactionMessage}
        </p>
      </div>
    </div>
    <img src={props.url} alt="" />
  </div>
);

export default UserEachReaction;
