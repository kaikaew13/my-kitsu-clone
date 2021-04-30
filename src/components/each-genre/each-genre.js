import React from 'react';

const EachGenre = (props) => (
  <li className="genre-items">
    <p>{props.children}</p>
  </li>
);

export default EachGenre;
