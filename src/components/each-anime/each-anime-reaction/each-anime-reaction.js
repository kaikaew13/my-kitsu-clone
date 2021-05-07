import React from 'react';

import Reaction from './reaction';
import './each-anime-reaction.css';

const EachAnimeReaction = (props) => (
  <div className="reaction-container">
    <div className="reaction-header">
      <h5>Reactions</h5>
      <h5 className="new-reaction">New Reactions</h5>
    </div>
    <div className="reaction-content">
      <Reaction />
      <Reaction />
      <div className="view-more-reaction">View More Reactions</div>
    </div>
  </div>
);

export default EachAnimeReaction;
