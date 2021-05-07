import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

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
  let inLib = null;
  if (!loading) {
    if (props.animelist && props.animelist[match.params.animeId])
      inLib = props.animelist[match.params.animeId];
  }
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
                        id={anime._id}
                        inLib={inLib}
                      />
                    ) : (
                      <EachAnimeBody url={URL + anime.imageUrl} inLib={inLib} />
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

const mapStateToProps = (state) => {
  return {
    animelist: state.user.animelist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openReactionModal: (payload) =>
      dispatch({
        type: 'OPEN_MODAL',
        which: 'reaction-modal',
        payload: payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EachAnime);
