import React from 'react';

import '../../../containers/library/follow/follow.css';

const FollowItem = (props) => (
  <div className="follow-items">
    <div className="follow-items-bg">
      <img src={process.env.REACT_APP_URL + '/images/bg-user.png'} alt="" />
    </div>
    <img src={process.env.REACT_APP_URL + '/images/profile-pic.png'} />
    <div className="follow-items-user">
      <h4>Username</h4>
      <div className="follow-btn">follow</div>
    </div>
  </div>
);

export default FollowItem;
