import React from 'react';

import EachSection from '../../../components/home/each-section/each-section';
import './section.css';

const Section = (props) => (
  <section>
    <h6>{props.children}</h6>
    <div className="section-container">
      {props.animeData.map((each) => (
        <EachSection key={each.id} id={each.id} imageUrl={each.url} />
      ))}
    </div>
    <div className="section-view-more">
      <a href="/">view more</a>
    </div>
  </section>
);

export default Section;
