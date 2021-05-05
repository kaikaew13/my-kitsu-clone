import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import EachAnimeBody from './each-anime-body/each-anime-body';
import EachAnimeHeader from './each-anime-header/each-anime-header';

const URL = process.env.REACT_APP_URL;

const EachAnime = (props) => {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    console.log('hello');
    (async () => {
      const res = await fetch(
        URL + '/get-each-anime/' + props.location.state.animeId,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status !== 200) throw new Error('not a valid url');
      const resData = await res.json();
      console.log(resData);
      setAnime(resData.anime);
    })();
  }, [props.location.state.animeId]);

  console.log(props.location.state);
  let loading = anime ? false : true;
  return !loading ? (
    <React.Fragment>
      <EachAnimeHeader />
      <EachAnimeBody
        title={anime.title}
        url={URL + anime.imageUrl}
        score={anime.score}
        description={anime.description}
        genre={anime.genre}
      />
    </React.Fragment>
  ) : (
    <h1>Loading...</h1>
  );
};

export default EachAnime;
