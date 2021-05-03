import React from 'react';
import { connect } from 'react-redux';

import './library-header.css';
import EachLibraryNav from '../../../components/library/each-library-nav';

const URL = process.env.REACT_APP_URL;

const LibraryHeader = (props) => {
  const navList = [
    { name: 'Activity', to: '/library' },
    { name: 'Library', to: '/library' },
    { name: 'Reactions', to: '/library' },
    { name: 'Followers', to: '/library' },
    { name: 'Following', to: '/library' },
    { name: 'Groups', to: '/library' },
  ];
  return (
    <React.Fragment>
      <div
        className="library-bg"
        style={{ background: `url(${URL}/images/bg-user.png)` }}
      ></div>
      <div className="userprof">
        <div className="prof-pic">
          <img
            src={URL + '/images/profile-pic.png'}
            alt={URL + '/images/profile-pic.png'}
          />
        </div>
        <div className="username-and-edit">
          <h3>{props.user.username}</h3>
          <button>Edit</button>
        </div>
      </div>
      <div className="library-nav">
        <div className="library-nav-container">
          {navList.map((each, index) => (
            <EachLibraryNav key={index} href={each.to}>
              {each.name}
            </EachLibraryNav>
          ))}
        </div>
      </div>
      <div className="padding"></div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(LibraryHeader);
