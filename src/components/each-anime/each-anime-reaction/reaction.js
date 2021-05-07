import React from 'react';

import './each-anime-reaction.css';

const Reaction = (props) => (
  <div className="reaction-items">
    <div className="upvote">
      <div className="gray">▲</div>
      <div className="gray">13</div>
    </div>
    <div>
      <p
        className="gray"
        style={{
          fontFamily: "'Asap', sans-serif",
          marginBottom: '5px',
          fontSize: '13px',
        }}
      >
        username
      </p>
      <div className="reaction-message">
        messages fasfas fjsjf dsjljjljsjfl sdjlfjdaslfjs lfjsdfjslfjsljf
        fjsljsl;f jsjlj
      </div>
    </div>
  </div>
);

export default Reaction;
