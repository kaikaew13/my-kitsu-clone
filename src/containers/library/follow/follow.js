import React from 'react';

import FollowItem from '../../../components/library/follow-item/follow-item';
import '../animelist-section/animelist-section.css';
import './follow.css';
import '../../home/section/section.css';

const Follow = (props) => (
  <div className="animelist-section follow-section">
    <FollowItem />
  </div>
);

export default Follow;
