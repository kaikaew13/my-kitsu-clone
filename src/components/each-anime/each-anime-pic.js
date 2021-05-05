import React from 'react';

import '../../containers/each-anime/each-anime-body/each-anime-body.css';
import '../../containers/library/follow/follow.css';

const URL = process.env.REACT_APP_URL;

const EachAnimePic = (props) => (
  <div className="each-anime-pic">
    <img src={URL + '/images/aot.jpeg'} alt="" />
    <div className="each-anime-info">
      <p>Update Library</p>
      <div className="follow-btn smaller">Completed</div>
      <div className="follow-btn smaller blue">Want to Watch</div>
      <div className="follow-btn smaller purple">Started Watching</div>
    </div>
  </div>
);

export default EachAnimePic;
