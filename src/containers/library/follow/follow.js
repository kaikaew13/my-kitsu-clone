import React from 'react';

import FollowItem from '../../../components/library/follow-item/follow-item';
import '../animelist-section/animelist-section.css';
import './follow.css';
import '../../home/section/section.css';

const Follow = (props) =>
  props.userlist.length > 0 ? (
    <div className="animelist-section follow-section">
      {props.userlist.map((each) => {
        return (
          <FollowItem
            key={each}
            username={each.username}
            buttonText={props.page === 'following' ? 'Unfollow' : 'Follow'}
          />
        );
      })}
    </div>
  ) : (
    <div style={{ fontSize: '16px', fontFamily: 'sans-serif' }}>
      No Users Found.
    </div>
  );

export default Follow;
