import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Section from './section';
import AllAnime from './all-anime';
import Error404 from '../../../components/UI/404';
import SearchBar from '../../../components/home/each-section/search-bar';
import './section.css';

const URL = process.env.REACT_APP_URL;
const STATUS = [
  'trending this week',
  'top airing anime',
  'top upcoming anime',
  'highest rated anime',
  'most popular anime',
];

const SectionContainer = (props) => {
  const [animeArr, setAnimeArr] = useState(null);
  const { match } = props;

  useEffect(() => {
    let urls = [];
    let tmpAnimeArr = {};
    STATUS.forEach((each) => urls.push(URL + '/get-home/5/' + each));
    Promise.all(urls.map((u) => fetch(u)))
      .then((data) => {
        return Promise.all(data.map((d) => d.json()));
      })
      .then((data) => {
        data.map((each) => {
          return (tmpAnimeArr[each.status] = each.animeList.map(
            (eachAnime) => ({
              url: URL + eachAnime.imageUrl,
              id: eachAnime._id,
            })
          ));
        });
        setAnimeArr(tmpAnimeArr);
      });
  }, []);

  const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };
  // console.log(animeArr);
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
                {animeArr ? (
                  Object.keys(animeArr).map((each, index) => (
                    <Section key={index} animeData={animeArr[each]}>
                      {titleCase(each)}
                    </Section>
                  ))
                ) : (
                  <h1>Loading...</h1>
                )}
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
