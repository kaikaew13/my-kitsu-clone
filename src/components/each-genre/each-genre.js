import React from 'react';

import '../../containers/genre/genre.css';

const EachGenre = (props) => (
  <li className="genre-items">
    <p>{props.children}</p>
  </li>
);

export default EachGenre;
