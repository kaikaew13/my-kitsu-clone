import React from 'react';

import './animelist-section.css';
import AnimelistStatus from '../animelist-status/animelist-status';

const URL = process.env.REACT_APP_URL;

const AnimelistSection = (props) => (
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
        <div className="section-items">
          <img
            className="section-items-img"
            src={URL + '/images/aot.jpeg'}
            alt={URL + '/images/aot.jpeg'}
          />
          <div className="progress">
            <p>completed</p>
          </div>
        </div>
        <div className="section-items">
          <img
            className="section-items-img"
            src={URL + '/images/aot.jpeg'}
            alt={URL + '/images/aot.jpeg'}
          />
          <div className="progress"></div>
        </div>

        <div className="section-items">
          <img
            className="section-items-img"
            src={URL + '/images/aot.jpeg'}
            alt={URL + '/images/aot.jpeg'}
          />
          <div className="progress"></div>
        </div>
        <div className="section-items">
          <img
            className="section-items-img"
            src={URL + '/images/aot.jpeg'}
            alt={URL + '/images/aot.jpeg'}
          />
          <div className="progress"></div>
        </div>
        <div className="section-items">
          <img
            className="section-items-img"
            src={URL + '/images/aot.jpeg'}
            alt={URL + '/images/aot.jpeg'}
          />
          <div className="progress"></div>
        </div>
        <div className="section-items">
          <img
            className="section-items-img"
            src={URL + '/images/aot.jpeg'}
            alt={URL + '/images/aot.jpeg'}
          />
          <div className="progress"></div>
        </div>
      </div>
    </div>
    <AnimelistStatus />
  </div>
);

export default AnimelistSection;
