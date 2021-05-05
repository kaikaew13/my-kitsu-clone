import React from 'react';

import EachLibraryNav from '../../../components/library/each-library-nav';
import '../../library/library-header/library-header.css';

const URL = process.env.REACT_APP_URL;

const EachAnimeHeader = (props) => {
  const navList = [
    { name: 'Summary', to: '/each-anime/summary' },
    { name: 'Episodes', to: '/each-anime/episodes' },
    { name: 'Characters', to: '/each-anime/characters' },
    { name: 'Reactions', to: '/each-anime/reactions' },
    { name: 'Franchise', to: '/each-anime/franchise' },
  ];

  return (
    <React.Fragment>
      <div
        className="library-bg"
        style={{ background: `url(${URL}/images/bg-user.png)` }}
      ></div>

      <div className="library-nav" style={{ paddingLeft: '220px' }}>
        <div className="library-nav-container">
          {navList.map((each, index) => (
            <EachLibraryNav
              key={index}
              href={each.to}
              active={props.linkName === each.name}
            >
              {each.name}
            </EachLibraryNav>
          ))}
        </div>
      </div>
      <div className="padding"></div>
    </React.Fragment>
  );
};
export default EachAnimeHeader;
