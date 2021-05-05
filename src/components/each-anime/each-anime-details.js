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
        <p>Attack on Titan</p>
      </li>
      <li className="anime-details-list-items">
        <strong>Score</strong>
        <p>10</p>
      </li>
    </ul>
  </div>
);

export default EachAnimeDetails;
