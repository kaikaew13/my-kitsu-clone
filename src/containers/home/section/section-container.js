import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Section from './section';
import AllAnime from './all-anime';
import Error404 from '../../../components/UI/404';
import SearchBar from '../../../components/home/each-section/search-bar';
import './section.css';

const URL = process.env.REACT_APP_URL;

const SectionContainer = (props) => {
  const [animeArr, setAnimeArr] = useState([]);
  const { match } = props;

  useEffect(() => {
    fetch(URL + '/get-home', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 500) throw new Error('failed to fetch');
        return res.json();
      })
      .then((resData) => {
        setAnimeArr(
          resData.animeList.map((each) => ({
            url: URL + each.imageUrl,
            id: each._id,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="section-container-wrapper">
      <Switch>
        <Route
          path={match.url + '/home'}
          exact
          render={() => {
            return (
              <React.Fragment>
                <SearchBar url={URL}>Explore Anime</SearchBar>
                <Section animeData={animeArr}>Trending This Week</Section>
                <Section animeData={animeArr}>Top Airing Anime</Section>
                <Section animeData={animeArr}>Top Upcoming Anime</Section>
                <Section animeData={animeArr}>Highest Rated Anime</Section>
                <Section animeData={animeArr}>Most Popular Anime</Section>
              </React.Fragment>
            );
          }}
        />
        <Route
          path={match.url + '/all-anime/:heading'}
          render={(matchProps) => {
            return (
              <AllAnime url={URL} animeData={animeArr}>
                {matchProps.match.params.heading}
              </AllAnime>
            );
          }}
        />
        <Route component={Error404} />
      </Switch>
    </div>
  );
};

export default SectionContainer;
