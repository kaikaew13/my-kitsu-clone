import React from 'react';

import './animelist-status.css';
import '../animelist-section/animelist-section.css';

const AnimelistStatus = (props) => (
  <div className="status">
    <div className="status-dropdown">
      <p>User's Anime</p>
      <p className="dropdown-arrow">▾</p>
    </div>
    <div className="status-option">
      <div style={{ background: '#402f3f' }}>
        <p>All Anime</p>
      </div>
      <div style={{ background: '#2c3e50' }}>
        <p>Currently Watching</p>
      </div>
      <div style={{ background: '#2980b9' }}>
        <p>Want to Watch</p>
      </div>
      <div style={{ background: '#27ae60' }}>
        <p>Completed</p>
      </div>
      <div style={{ background: '#f39c12' }}>
        <p>On Hold</p>
      </div>
      <div style={{ background: '#a12f31' }}>
        <p>Dropped</p>
      </div>
    </div>
    <div className="manage-library">
      <p>Manage Library</p>
    </div>
  </div>
);

export default AnimelistStatus;
