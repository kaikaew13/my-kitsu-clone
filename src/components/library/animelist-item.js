import React from 'react';

import '../../containers/library/animelist-section/animelist-section.css';

const AnimelistItem = (props) => (
  <div className="section-items">
    <img className="section-items-img" src={props.url} alt={props.url} />
    <div className="progress">
      <p>{props.status}</p>
    </div>
  </div>
);

export default AnimelistItem;
