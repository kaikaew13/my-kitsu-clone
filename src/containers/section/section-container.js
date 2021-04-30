import React from 'react';

import Section from './section';

const SectionContainer = (props) => {
  return (
    <div class="section-container-wrapper">
      <Section imageUrl="">Trending This Week</Section>
      <Section imageUrl="">Top Airing Anime</Section>
      <Section imageUrl="">Top Upcoming Anime</Section>
      <Section imageUrl="">Highest Rated Anime</Section>
      <Section imageUrl="">Most Popular Anime</Section>
    </div>
  );
};

export default SectionContainer;
