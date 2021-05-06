import React from 'react';

import SectionContainer from './section/section-container';
import GenreContainer from './genre/genre-container';

import './home.css';

const Home = (props) => (
  <React.Fragment>
    <div className="section-and-genre-wrapper">
      <SectionContainer match={props.match} />
      <div className="genre-wrapper">
        <GenreContainer />
      </div>
    </div>
  </React.Fragment>
);

export default Home;
