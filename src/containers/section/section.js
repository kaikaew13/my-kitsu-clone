import React from 'react';

import EachSection from '../../components/each-section/each-section';
import './section.css';

const Section = (props) => (
  <section>
    <h6>{props.children}</h6>
    <div className="section-container">
      {props.imageUrl.map((each, index) => (
        <EachSection key={index} imageUrl={each} />
      ))}
    </div>
    <div className="section-view-more">
      <a href="/">view more</a>
    </div>
  </section>
);

export default Section;
