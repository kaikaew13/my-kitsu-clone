import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SectionContainer from './section/section-container';
import GenreContainer from './genre/genre-container';

import './home.css';
const PATH = 'explore';

const Home = (props) => {
  const { setNav } = props;
  useEffect(() => {
    setNav(PATH);
  }, [setNav]);
  return (
    <React.Fragment>
      <div className="section-and-genre-wrapper">
        <SectionContainer match={props.match} />
        <div className="genre-wrapper">
          <GenreContainer />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNav: (path) => dispatch({ type: 'SET_NAV', path: path }),
  };
};

export default connect(null, mapDispatchToProps)(Home);
