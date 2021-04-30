import React from 'react';

const Section = (props) => (
  <section>
    <h6>{props.children}</h6>
    <div class="section-container"></div>
  </section>
);

export default Section;
