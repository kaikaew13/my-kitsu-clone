import React, { useState } from 'react';

import './animelist-section.css';
import AnimelistStatus from '../animelist-status/animelist-status';
import AnimelistItem from '../../../components/library/animelist-item/animelist-item';

const URL = process.env.REACT_APP_URL;

const AnimelistSection = (props) => {
  const [animelist, setAnimelist] = useState(props.animelist);

  const viewByStatus = {
    all: () => {
      setAnimelist(props.animelist);
    },
    currentlyWatching: () => {
      const tmpAnimelist = props.animelist.filter(
        (each) => each.status === 'Currently Watching'
      );
      setAnimelist(tmpAnimelist);
    },
    wantToWatch: () => {
      const tmpAnimelist = props.animelist.filter(
        (each) => each.status === 'Want to Watch'
      );
      setAnimelist(tmpAnimelist);
    },
    completed: () => {
      const tmpAnimelist = props.animelist.filter(
        (each) => each.status === 'Completed'
      );
      setAnimelist(tmpAnimelist);
    },
    onHold: () => {
      const tmpAnimelist = props.animelist.filter(
        (each) => each.status === 'On Hold'
      );
      setAnimelist(tmpAnimelist);
    },
    dropped: () => {
      const tmpAnimelist = props.animelist.filter(
        (each) => each.status === 'Dropped'
      );
      setAnimelist(tmpAnimelist);
    },
  };

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
          {animelist.length > 0 ? (
            animelist.map((each) => (
              <AnimelistItem
                key={each.animeId._id}
                id={each.animeId._id}
                url={URL + each.animeId.imageUrl}
                status={each.status}
              />
            ))
          ) : (
            <div
              style={{
                fontSize: '16px',
                fontFamily: 'sans-serif',
                margin: '0 auto',
              }}
            >
              Your Library is Empty...
            </div>
          )}
        </div>
      </div>
      <AnimelistStatus
        username={props.username}
        animelist={props.animelist}
        {...viewByStatus}
      />
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     animelist: Object.values(state.user.animelist),
//   };
// };

export default AnimelistSection;
