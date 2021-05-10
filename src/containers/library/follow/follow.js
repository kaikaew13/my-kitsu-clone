import React, { useState } from 'react';
import { connect } from 'react-redux';

import FollowItem from '../../../components/library/follow-item/follow-item';
import '../animelist-section/animelist-section.css';
import './follow.css';
import '../../home/section/section.css';

const URL = process.env.REACT_APP_URL;

const Follow = (props) => {
  console.log(props.curUser);
  const [preventDoubleClick, setPreventDoubleClick] = useState(false);

  const followHandler = async (targetUserId, buttonText) => {
    // console.log(targetUserId);
    setPreventDoubleClick(true);
    const endpoint = buttonText === 'Follow' ? 'follow-user' : 'unfollow-user';
    const res = await fetch(URL + '/user/' + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.jwt,
      },
      body: JSON.stringify({ targetUserId: targetUserId }),
    });
    if (res.status !== 200) throw new Error('failed to follow user');
    const resData = await res.json();
    console.log(resData);
  };

  return props.user[props.page].length > 0 ? (
    <div className="animelist-section follow-section">
      {props.user[props.page].map((each) => {
        let buttonText = 'Follow';
        const found = props.user.following.find(
          (eachUser) => eachUser._id.toString() === each._id.toString()
        );
        let found2 = false;
        let self = false;
        if (props.curUser) {
          found2 = props.curUser.following.find(
            (eachUser) => eachUser._id.toString() === each._id.toString()
          );
          if (each._id.toString() === props.curUser.id.toString()) self = true;
        }

        if (props.page === 'following' || found || found2)
          buttonText = 'Unfollow';
        if (self) buttonText = "Hey, that's you!";
        return (
          <FollowItem
            key={each._id}
            username={each.username}
            buttonText={buttonText}
            clicked={() =>
              !preventDoubleClick
                ? followHandler(each._id, buttonText)
                : console.log('clicked')
            }
            self={self}
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

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
  };
};

export default connect(mapStateToProps)(Follow);
