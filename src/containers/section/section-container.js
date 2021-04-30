import React, { useEffect, useState } from 'react';

import Section from './section';
import SearchBar from '../../components/each-section/search-bar';

const URL = 'http://localhost:6969';

const SectionContainer = (props) => {
  const [imageUrlArr, setImageUrlArr] = useState([]);
  console.log(imageUrlArr);
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
        setImageUrlArr(resData.animeList.map((each) => URL + each.imageUrl));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="section-container-wrapper">
      <SearchBar url={URL}>Explore Anime</SearchBar>
      <Section imageUrl={imageUrlArr}>Trending This Week</Section>
      <Section imageUrl={imageUrlArr}>Top Airing Anime</Section>
      <Section imageUrl={imageUrlArr}>Top Upcoming Anime</Section>
      <Section imageUrl={imageUrlArr}>Highest Rated Anime</Section>
      <Section imageUrl={imageUrlArr}>Most Popular Anime</Section>
    </div>
  );
};

export default SectionContainer;
