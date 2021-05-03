import React from 'react';
import { connect } from 'react-redux';

import './animelist-status.css';
import '../animelist-section/animelist-section.css';

const AnimelistStatus = (props) => {
  let completeCnt = 0;
  let cwCnt = 0;
  let wtwCnt = 0;
  let droppedCnt = 0;
  let holdCnt = 0;
  props.animelist.forEach((each) => {
    switch (each.status) {
      case 'completed':
        completeCnt++;
        break;
      case 'currently watching':
        cwCnt++;
        break;
      case 'on hold':
        holdCnt++;
        break;
      case 'dropped':
        droppedCnt++;
        break;
      case 'want to watch':
        wtwCnt++;
        break;
      default:
        break;
    }
  });
  console.log(completeCnt);
  return (
    <div className="status">
      <div className="status-dropdown">
        <p>User's Anime</p>
        <p className="dropdown-arrow">▾</p>
      </div>
      <div className="status-option">
        <div style={{ background: '#402f3f' }}>
          <p>All Anime</p>
          <p>{props.animelist.length > 0 && props.animelist.length}</p>
        </div>
        <div style={{ background: '#2c3e50' }}>
          <p>Currently Watching</p>
          <p>{cwCnt > 0 && cwCnt}</p>
        </div>
        <div style={{ background: '#2980b9' }}>
          <p>Want to Watch</p>
          <p>{wtwCnt > 0 && wtwCnt}</p>
        </div>
        <div style={{ background: '#27ae60' }}>
          <p>Completed</p>
          <p>{completeCnt > 0 && completeCnt}</p>
        </div>
        <div style={{ background: '#f39c12' }}>
          <p>On Hold</p>
          <p>{holdCnt > 0 && holdCnt}</p>
        </div>
        <div style={{ background: '#a12f31' }}>
          <p>Dropped</p>
          <p>{droppedCnt > 0 && droppedCnt}</p>
        </div>
      </div>
      <div className="manage-library">
        <p>Manage Library</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    animelist: Object.values(state.user.animelist),
  };
};

export default connect(mapStateToProps)(AnimelistStatus);
