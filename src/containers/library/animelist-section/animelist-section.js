import React from 'react';
import { connect } from 'react-redux';

import './animelist-section.css';
import AnimelistStatus from '../animelist-status/animelist-status';
import AnimelistItem from '../../../components/library/animelist-item';

const URL = process.env.REACT_APP_URL;

const AnimelistSection = (props) => {
  //   const animelist = [];
  //   for (let i = 0; i < 6; i++)
  //     animelist.push({ url: URL + '/images/aot.jpeg', status: 'Completed' });
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
          {Object.values(props.animelist).map((each) => (
            <AnimelistItem
              key={each.animeId._id}
              id={each.animeId._id}
              url={URL + each.animeId.imageUrl}
              status={each.status}
            />
          ))}
        </div>
      </div>
      <AnimelistStatus />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    animelist: state.user.animelist,
  };
};

export default connect(mapStateToProps)(AnimelistSection);
