import React from 'react';

import GenreList from './genre-list';

const GenreContainer = (props) => (
  <div class="genre-container">
    <GenreList class="genre-fav-categories">my favourite categories</GenreList>
    <GenreList class="genre-categories">categories</GenreList>
  </div>
);

export default GenreContainer;
