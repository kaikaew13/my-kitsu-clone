import React from 'react';

import '../../containers/each-anime/each-anime-summary/each-anime-summary.css';
import '../../containers/library/animelist-section/animelist-section.css';

const EachAnimeDescription = (props) => (
  <div
    className="animelist-section-animelist"
    style={{ width: '60%', marginTop: '20px' }}
  >
    <h3>{props.title}</h3>
    <p className="description">{props.description}</p>
  </div>
);

export default EachAnimeDescription;
