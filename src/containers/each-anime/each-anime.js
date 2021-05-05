import React from 'react';
import EachAnimeBody from './each-anime-body/each-anime-body';

import EachAnimeHeader from './each-anime-header/each-anime-header';

const EachAnime = (props) => (
  <React.Fragment>
    <EachAnimeHeader />
    <EachAnimeBody />
  </React.Fragment>
);

export default EachAnime;
