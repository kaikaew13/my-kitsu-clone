import React from 'react';

const GenreList = (props) => (
  <div className={props.class}>
    <h5 className="categories-head">{props.children.toUpperCase()}</h5>
    <ul className="genre-list"></ul>
  </div>
);

export default GenreList;
