import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import EachAnimeSummary from './each-anime-summary/each-anime-summary';
import EachAnimeHeader from './each-anime-header/each-anime-header';
import Error404 from '../../components/UI/404';
import EachAnimeBody from './each-anime-body/each-anime-body';

const URL = process.env.REACT_APP_URL;

const EachAnime = (props) => {
  const [anime, setAnime] = useState(null);
  const { match } = props;

  const navList = [
    'summary',
    'episodes',
    'characters',
    'reactions',
    'franchise',
  ];

  useEffect(() => {
    (async () => {
      const res = await fetch(URL + '/get-each-anime/' + match.params.animeId, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status !== 200) throw new Error('not a valid url');
      const resData = await res.json();
      setAnime(resData.anime);
    })();
  }, [match.params.animeId]);

  let loading = anime ? false : true;
  return !loading ? (
    <React.Fragment>
      <Switch>
        {navList.map((each, index) => {
          return (
            <Route
              key={index}
              path={
                each === 'summary' ? match.url + '/' : match.url + '/' + each
              }
              exact
              render={() => {
                return (
                  <React.Fragment>
                    <EachAnimeHeader
                      linkName={each.charAt(0).toUpperCase() + each.slice(1)}
                      id={anime._id}
                    />
                    {each === 'summary' ? (
                      <EachAnimeSummary
                        title={anime.title}
                        url={URL + anime.imageUrl}
                        score={anime.score}
                        description={anime.description}
                        genre={anime.genre}
                      />
                    ) : (
                      <EachAnimeBody url={URL + anime.imageUrl} />
                    )}
                  </React.Fragment>
                );
              }}
            />
          );
        })}
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  ) : (
    <h1>Loading...</h1>
  );
};

export default EachAnime;
