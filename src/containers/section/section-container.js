import React, { useEffect, useState } from 'react';

import Section from './section';
import SearchBar from '../../components/each-section/search-bar';
import './section.css';

const URL = process.env.REACT_APP_URL;

const SectionContainer = (props) => {
  const [animeArr, setAnimeArr] = useState([]);
  useEffect(() => {
    fetch(URL + '/get-home', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 500) throw new Error('failed to fetch');
        return res.json();
      })
      .then((resData) => {
        setAnimeArr(
          resData.animeList.map((each) => ({
            url: URL + each.imageUrl,
            id: each._id,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="section-container-wrapper">
      <SearchBar url={URL}>Explore Anime</SearchBar>
      <Section animeData={animeArr}>Trending This Week</Section>
      <Section animeData={animeArr}>Top Airing Anime</Section>
      <Section animeData={animeArr}>Top Upcoming Anime</Section>
      <Section animeData={animeArr}>Highest Rated Anime</Section>
      <Section animeData={animeArr}>Most Popular Anime</Section>
    </div>
  );
};

export default SectionContainer;
