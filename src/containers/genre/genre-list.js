import React from 'react';

import EachGenre from '../../components/each-genre/each-genre';

const GenreList = (props) =>
  props.favourite ? (
    <div className="genre-fav-categories">
      <h5 className="categories-head">{props.children.toUpperCase()}</h5>
      <ul class="genre-list">
        Favoriting categories will improve your recommendations.
      </ul>
    </div>
  ) : (
    <div className="genre-categories">
      <h5 className="categories-head">{props.children.toUpperCase()}</h5>
      <ul className="genre-list">
        {props.genreList.map((each, index) => (
          <EachGenre key={index}>{each}</EachGenre>
        ))}
      </ul>
      <div className="section-view-more">
        <a href="/">more categories...</a>
      </div>
    </div>
  );

export default GenreList;
