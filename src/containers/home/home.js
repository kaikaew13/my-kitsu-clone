import React from 'react';

import NavContainer from '../navigation/nav-container';
import SectionContainer from '../section/section-container';
import GenreContainer from '../genre/genre-container';

const Home = (props) => (
  <React.Fragment>
    <NavContainer />
    <div className="section-and-genre-wrapper">
      <SectionContainer />
      <div className="genre-wrapper">
        <GenreContainer />
      </div>
    </div>
  </React.Fragment>
);

export default Home;
