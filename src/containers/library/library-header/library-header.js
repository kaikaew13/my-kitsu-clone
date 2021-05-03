import React from 'react';

import './library-header.css';

const URL = process.env.REACT_APP_URL;

const LibraryHeader = (props) => (
  <React.Fragment>
    <div
      className="library-bg"
      style={{ background: `url(${URL}/images/bg-user.png)` }}
    ></div>
    <div className="library-nav">
      <div className="library-nav-container">
        <a href="/library" className="library-nav-items">
          Activity
        </a>
        <a href="/library" className="library-nav-items">
          Library
        </a>
        <a href="/library" className="library-nav-items">
          Reactions
        </a>
        <a href="/library" className="library-nav-items">
          Followers
        </a>
        <a href="/library" className="library-nav-items">
          Following
        </a>
        <a href="/library" className="library-nav-items">
          Groups
        </a>
      </div>
    </div>
    <div className="padding"></div>
  </React.Fragment>
);

export default LibraryHeader;