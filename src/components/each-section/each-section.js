import React from 'react';

import '../../containers/section/section.css';

const EachSection = (props) => (
  <div className="section-items">
    <img
      className="section-items-img"
      src={props.imageUrl}
      alt={props.imageUrl}
    />
  </div>
);

export default EachSection;
