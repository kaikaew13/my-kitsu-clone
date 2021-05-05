import React from 'react';

import '../../containers/each-anime/each-anime-body/each-anime-body.css';
import '../../containers/library/animelist-section/animelist-section.css';

const EachAnimeDetails = (props) => (
  <div
    className="status"
    style={{ height: '510px', justifyContent: 'flex-start' }}
  >
    <h5>Anime Details</h5>
    <ul className="anime-details-list">
      <li className="anime-details-list-items">
        <strong>English</strong>
        <p>{props.title}</p>
      </li>
      <li className="anime-details-list-items">
        <strong>Score</strong>
        <p>{props.score}</p>
      </li>
      <li className="anime-details-list-items">
        <strong>Genre</strong>
        <p>{props.genre.join(', ')}</p>
      </li>
    </ul>
  </div>
);

export default EachAnimeDetails;
