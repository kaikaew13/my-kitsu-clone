import React from 'react';

import './animelist-section.css';
import AnimelistStatus from '../animelist-status/animelist-status';
import AnimelistItem from '../../../components/library/animelist-item';

const URL = process.env.REACT_APP_URL;

const AnimelistSection = (props) => {
  const animelist = [];
  for (let i = 0; i < 6; i++)
    animelist.push({ url: URL + '/images/aot.jpeg', status: 'Completed' });
  return (
    <div className="animelist-section">
      <div className="animelist-section-animelist">
        <section>
          <div className="search-bar-wrapper">
            <img
              src={URL + '/images/icons8-search-50.png'}
              alt="/images/icons8-search-50.png"
            />
            <div className="section-main-search-bar">
              <input type="text" placeholder="Search Library..." />
            </div>
          </div>
        </section>
        <div className="animelist">
          {animelist.map((each, index) => (
            <AnimelistItem key={index} url={each.url} status={each.status} />
          ))}
        </div>
      </div>
      <AnimelistStatus />
    </div>
  );
};

export default AnimelistSection;
