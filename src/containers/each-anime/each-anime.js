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
  console.log(match);

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
        <Route
          path={match.url}
          exact
          render={() => {
            return (
              <React.Fragment>
                <EachAnimeHeader linkName="Summary" id={anime._id} />
                <EachAnimeSummary
                  title={anime.title}
                  url={URL + anime.imageUrl}
                  score={anime.score}
                  description={anime.description}
                  genre={anime.genre}
                />
              </React.Fragment>
            );
          }}
        />
        <Route
          path={match.url + '/episodes'}
          exact
          render={() => {
            return (
              <React.Fragment>
                <EachAnimeHeader linkName="Episodes" id={anime._id} />
                <EachAnimeBody url={URL + anime.imageUrl} />
              </React.Fragment>
            );
          }}
        />
        <Route
          path={match.url + '/characters'}
          exact
          render={() => {
            return (
              <React.Fragment>
                <EachAnimeHeader linkName="Characters" id={anime._id} />
                <EachAnimeBody url={URL + anime.imageUrl} />
              </React.Fragment>
            );
          }}
        />
        <Route
          path={match.url + '/reactions'}
          exact
          render={() => {
            return (
              <React.Fragment>
                <EachAnimeHeader linkName="Reactions" id={anime._id} />
                <EachAnimeBody url={URL + anime.imageUrl} />
              </React.Fragment>
            );
          }}
        />
        <Route
          path={match.url + '/franchise'}
          exact
          render={() => {
            return (
              <React.Fragment>
                <EachAnimeHeader linkName="Franchise" id={anime._id} />
                <EachAnimeBody url={URL + anime.imageUrl} />
              </React.Fragment>
            );
          }}
        />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  ) : (
    <h1>Loading...</h1>
  );
};

export default EachAnime;
