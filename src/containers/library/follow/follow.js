import React from 'react';

import FollowItem from '../../../components/library/follow-item/follow-item';
import '../animelist-section/animelist-section.css';
import './follow.css';
import '../../home/section/section.css';

const Follow = (props) => {
  return props.user[props.page].length > 0 ? (
    <div className="animelist-section follow-section">
      {props.user[props.page].map((each) => {
        let buttonText = 'Follow';
        const found = props.user.following.find(
          (eachUser) => eachUser._id.toString() === each._id.toString()
        );
        if (props.page === 'following' || found) buttonText = 'Unfollow';
        return (
          <FollowItem
            key={each._id}
            username={each.username}
            buttonText={buttonText}
          />
        );
      })}
    </div>
  ) : (
    <div style={{ fontSize: '16px', fontFamily: 'sans-serif' }}>
      No Users Found.
    </div>
  );
};

export default Follow;
