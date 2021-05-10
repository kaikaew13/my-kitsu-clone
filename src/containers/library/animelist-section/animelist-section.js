import React from 'react';

import './animelist-section.css';
import AnimelistStatus from '../animelist-status/animelist-status';
import AnimelistItem from '../../../components/library/animelist-item/animelist-item';

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
          {props.animelist.length > 0 ? (
            props.animelist.map((each) => (
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
      <AnimelistStatus animelist={props.animelist} />
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     animelist: Object.values(state.user.animelist),
//   };
// };

export default AnimelistSection;
