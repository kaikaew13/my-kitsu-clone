import React from 'react';

import GenreList from './genre-list';
import './genre.css';

const GenreContainer = (props) => (
  <div className="genre-container">
    <GenreList favourite={true}>my favourite categories</GenreList>
    <GenreList
      favourite={false}
      genreList={[
        'Action',
        'Adventure',
        'Comedy',
        'Drama',
        'Slice of Life',
        'Fantasy',
        'Magic',
        'Supernatural',
        'Horror',
        'Mystery',
        'Psychological',
        'Romance',
        'Sci-Fi',
      ]}
    >
      categories
    </GenreList>
  </div>
);

export default GenreContainer;
