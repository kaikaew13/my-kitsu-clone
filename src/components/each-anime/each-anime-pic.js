import React from 'react';

import '../../containers/each-anime/each-anime-body/each-anime-body.css';
import '../../containers/library/follow/follow.css';

const EachAnimePic = (props) => (
  <div className="each-anime-pic">
    <img src={props.url} alt={props.url} />
    <div className="each-anime-info">
      <p>Update Library</p>
      <div className="follow-btn smaller">Completed</div>
      <div className="follow-btn smaller blue">Want to Watch</div>
      <div className="follow-btn smaller purple">Started Watching</div>
    </div>
  </div>
);

export default EachAnimePic;
